import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type {
  Audience,
  CollegeId,
  DocType,
  PortalDocument,
  SessionUser,
} from "@/lib/portal-users";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { assertUploadSize } from "@/lib/portal-limits";

const LOCAL_DIR = path.join(process.cwd(), ".data");
const LOCAL_META = path.join(LOCAL_DIR, "documents.json");
const LOCAL_FILES = path.join(LOCAL_DIR, "uploads");
const BUCKET = "portal-docs";

/** Keep portal uploads for 7 days only (free-tier friendly) */
export const DOC_RETENTION_DAYS = 7;

export { MAX_UPLOAD_BYTES, formatMaxUpload, assertUploadSize } from "@/lib/portal-limits";

function expiresAtFrom(createdAt: string | Date) {
  const d = new Date(createdAt);
  d.setDate(d.getDate() + DOC_RETENTION_DAYS);
  return d.toISOString();
}

function isExpired(doc: PortalDocument) {
  const end = doc.expiresAt || expiresAtFrom(doc.createdAt);
  return Date.now() > new Date(end).getTime();
}

async function ensureLocal() {
  await fs.mkdir(LOCAL_FILES, { recursive: true });
  try {
    await fs.access(LOCAL_META);
  } catch {
    await fs.writeFile(LOCAL_META, "[]", "utf8");
  }
}

async function readLocalMeta(): Promise<PortalDocument[]> {
  await ensureLocal();
  const raw = await fs.readFile(LOCAL_META, "utf8");
  return JSON.parse(raw) as PortalDocument[];
}

async function writeLocalMeta(docs: PortalDocument[]) {
  await ensureLocal();
  await fs.writeFile(LOCAL_META, JSON.stringify(docs, null, 2), "utf8");
}

export type CreateDocInput = {
  title: string;
  description: string;
  docType: DocType;
  college: CollegeId;
  audience: Audience[];
  file: File;
  uploadedBy: string;
};

/** Delete files older than 7 days from DB + storage */
export async function purgeExpiredDocuments() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (!supabase) return 0;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - DOC_RETENTION_DAYS);
    const cutoffIso = cutoff.toISOString();

    const { data: expired, error } = await supabase
      .from("portal_documents")
      .select("id, file_path")
      .lt("created_at", cutoffIso);

    if (error) throw new Error(error.message);
    if (!expired?.length) return 0;

    const paths = expired.map((row) => String(row.file_path));
    if (paths.length) {
      await supabase.storage.from(BUCKET).remove(paths);
    }
    const ids = expired.map((row) => String(row.id));
    const { error: delError } = await supabase
      .from("portal_documents")
      .delete()
      .in("id", ids);
    if (delError) throw new Error(delError.message);
    return ids.length;
  }

  const docs = await readLocalMeta();
  const keep: PortalDocument[] = [];
  let removed = 0;
  for (const doc of docs) {
    const withExpiry: PortalDocument = {
      ...doc,
      expiresAt: doc.expiresAt || expiresAtFrom(doc.createdAt),
    };
    if (isExpired(withExpiry)) {
      try {
        await fs.unlink(path.join(LOCAL_FILES, doc.filePath));
      } catch {
        /* ignore */
      }
      removed += 1;
    } else {
      keep.push(withExpiry);
    }
  }
  await writeLocalMeta(keep);
  return removed;
}

export async function listDocuments(): Promise<PortalDocument[]> {
  await purgeExpiredDocuments().catch(() => 0);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("portal_documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }
  return readLocalMeta();
}

export async function listDocumentsForUser(user: SessionUser) {
  const { canViewDocument } = await import("@/lib/portal-users");
  const all = await listDocuments();
  return all.filter((doc) => canViewDocument(user, doc));
}

export async function createDocument(input: CreateDocInput): Promise<PortalDocument> {
  assertUploadSize(input.file);
  await purgeExpiredDocuments().catch(() => 0);

  const id = randomUUID();
  const safeName = input.file.name.replace(/[^\w.\-]+/g, "_");
  const filePath = `${input.college}/${id}-${safeName}`;
  const buffer = Buffer.from(await input.file.arrayBuffer());
  const createdAt = new Date().toISOString();
  const expiresAt = expiresAtFrom(createdAt);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase is not configured");

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, buffer, {
        contentType: input.file.type || "application/octet-stream",
        upsert: false,
      });
    if (uploadError) throw new Error(uploadError.message);

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    const row = {
      id,
      title: input.title,
      description: input.description,
      doc_type: input.docType,
      college: input.college,
      audience: input.audience,
      file_name: input.file.name,
      file_path: filePath,
      file_url: publicData.publicUrl,
      uploaded_by: input.uploadedBy,
      created_at: createdAt,
      expires_at: expiresAt,
    };
    const { data, error } = await supabase
      .from("portal_documents")
      .insert(row)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return mapRow(data);
  }

  await ensureLocal();
  const diskPath = path.join(LOCAL_FILES, `${id}-${safeName}`);
  await fs.writeFile(diskPath, buffer);
  const doc: PortalDocument = {
    id,
    title: input.title,
    description: input.description,
    docType: input.docType,
    college: input.college,
    audience: input.audience,
    fileName: input.file.name,
    filePath: `${id}-${safeName}`,
    fileUrl: `/api/portal/files/${id}-${safeName}`,
    uploadedBy: input.uploadedBy,
    createdAt,
    expiresAt,
  };
  const docs = await readLocalMeta();
  docs.unshift(doc);
  await writeLocalMeta(docs);
  return doc;
}

export async function deleteDocument(id: string, user: SessionUser) {
  if (user.role !== "admin" && user.role !== "teacher") {
    throw new Error("Not allowed");
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase is not configured");
    const { data: existing, error: findError } = await supabase
      .from("portal_documents")
      .select("*")
      .eq("id", id)
      .single();
    if (findError) throw new Error(findError.message);
    if (user.college && existing.college !== user.college) {
      throw new Error("Not allowed for this college");
    }
    await supabase.storage.from(BUCKET).remove([existing.file_path]);
    const { error } = await supabase.from("portal_documents").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }

  const docs = await readLocalMeta();
  const doc = docs.find((d) => d.id === id);
  if (!doc) throw new Error("Not found");
  if (user.college && doc.college !== user.college) {
    throw new Error("Not allowed for this college");
  }
  try {
    await fs.unlink(path.join(LOCAL_FILES, doc.filePath));
  } catch {
    /* ignore missing file */
  }
  await writeLocalMeta(docs.filter((d) => d.id !== id));
}

export async function readLocalFile(fileName: string) {
  await ensureLocal();
  const full = path.join(LOCAL_FILES, path.basename(fileName));
  return fs.readFile(full);
}

function mapRow(row: Record<string, unknown>): PortalDocument {
  const createdAt = String(row.created_at ?? new Date().toISOString());
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description ?? ""),
    docType: row.doc_type as DocType,
    college: row.college as CollegeId,
    audience: (row.audience as Audience[]) ?? [],
    fileName: String(row.file_name),
    filePath: String(row.file_path),
    fileUrl: String(row.file_url),
    uploadedBy: String(row.uploaded_by),
    createdAt,
    expiresAt: String(row.expires_at ?? expiresAtFrom(createdAt)),
  };
}
