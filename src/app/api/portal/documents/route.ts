import { NextResponse } from "next/server";
import { createDocument, deleteDocument, listDocumentsForUser } from "@/lib/documents";
import { formatMaxUpload, MAX_UPLOAD_BYTES } from "@/lib/portal-limits";
import { getSessionUser } from "@/lib/portal-session";
import {
  canUpload,
  type Audience,
  type DocType,
} from "@/lib/portal-users";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role === "ceo") {
    return NextResponse.json({ documents: [] });
  }
  try {
    const documents = await listDocumentsForUser(user);
    return NextResponse.json({ documents });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user || !canUpload(user) || !user.college) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const docType = String(form.get("docType") ?? "other") as DocType;
  const audienceRaw = String(form.get("audience") ?? "[]");
  const file = form.get("file");

  if (!title || !(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: "Title and file are required" },
      { status: 400 },
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        error: `File is too large. Maximum size is ${formatMaxUpload()} (free storage limit).`,
      },
      { status: 400 },
    );
  }

  let audience: Audience[] = [];
  try {
    audience = JSON.parse(audienceRaw) as Audience[];
  } catch {
    return NextResponse.json({ error: "Invalid audience" }, { status: 400 });
  }
  if (!audience.length) {
    return NextResponse.json(
      { error: "Select at least one audience" },
      { status: 400 },
    );
  }

  try {
    const document = await createDocument({
      title,
      description,
      docType,
      college: user.college,
      audience,
      file,
      uploadedBy: user.username,
    });
    return NextResponse.json({ document });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getSessionUser();
  if (!user || !canUpload(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  try {
    await deleteDocument(id, user);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
