import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export type AdmissionLead = {
  id: string;
  phone: string;
  note: string;
  source: string;
  status: "new" | "contacted";
  createdAt: string;
};

const LOCAL_DIR = path.join(process.cwd(), ".data");
const LOCAL_FILE = path.join(LOCAL_DIR, "admission-leads.json");

async function ensureLocal() {
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  try {
    await fs.access(LOCAL_FILE);
  } catch {
    await fs.writeFile(LOCAL_FILE, "[]", "utf8");
  }
}

async function readLocal(): Promise<AdmissionLead[]> {
  await ensureLocal();
  const raw = await fs.readFile(LOCAL_FILE, "utf8");
  return JSON.parse(raw) as AdmissionLead[];
}

async function writeLocal(leads: AdmissionLead[]) {
  await ensureLocal();
  await fs.writeFile(LOCAL_FILE, JSON.stringify(leads, null, 2), "utf8");
}

function mapRow(row: Record<string, unknown>): AdmissionLead {
  return {
    id: String(row.id),
    phone: String(row.phone),
    note: String(row.note ?? ""),
    source: String(row.source ?? "chatbot"),
    status: row.status === "contacted" ? "contacted" : "new",
    createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
  };
}

export async function createAdmissionLead(input: {
  phone: string;
  note?: string;
  source?: string;
}): Promise<AdmissionLead> {
  const phone = input.phone.replace(/\D/g, "").slice(-10);
  if (phone.length !== 10) {
    throw new Error("Invalid phone number");
  }

  const lead: AdmissionLead = {
    id: randomUUID(),
    phone,
    note: (input.note ?? "").trim().slice(0, 500),
    source: input.source ?? "chatbot",
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("admission_leads")
        .insert({
          id: lead.id,
          phone: lead.phone,
          note: lead.note,
          source: lead.source,
          status: lead.status,
          created_at: lead.createdAt,
        })
        .select("*")
        .single();
      if (error) {
        // Fall through to local if table missing / paused
        console.error("admission_leads insert:", error.message);
      } else if (data) {
        return mapRow(data as Record<string, unknown>);
      }
    }
  }

  const all = await readLocal();
  // Dedupe same phone within 24h
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const existing = all.find(
    (l) => l.phone === lead.phone && new Date(l.createdAt).getTime() > dayAgo,
  );
  if (existing) {
    existing.note = lead.note || existing.note;
    await writeLocal(all);
    return existing;
  }
  all.unshift(lead);
  await writeLocal(all.slice(0, 200));
  return lead;
}

export async function listAdmissionLeads(): Promise<AdmissionLead[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("admission_leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (!error && data) {
        return (data as Record<string, unknown>[]).map(mapRow);
      }
    }
  }
  const local = await readLocal();
  return local.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function markLeadContacted(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase
        .from("admission_leads")
        .update({ status: "contacted" })
        .eq("id", id);
      if (!error) return;
    }
  }
  const all = await readLocal();
  const lead = all.find((l) => l.id === id);
  if (lead) {
    lead.status = "contacted";
    await writeLocal(all);
  }
}
