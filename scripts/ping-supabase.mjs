/**
 * Wake / keep Supabase free project active.
 * Run: node scripts/ping-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (!m) continue;
      const key = m[1].trim();
      const val = m[2].trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // ignore
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or API key in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error, count } = await supabase
  .from("portal_documents")
  .select("id, title, created_at", { count: "exact" })
  .order("created_at", { ascending: false })
  .limit(5);

if (error) {
  console.error("Supabase ping failed:", error.message);
  console.error(
    "If the project is paused, open https://supabase.com/dashboard → Restore project, then run again.",
  );
  process.exit(1);
}

console.log("Supabase is active.");
console.log(`portal_documents count: ${count ?? data?.length ?? 0}`);
if (data?.length) {
  for (const row of data) {
    console.log(`- ${row.title} (${row.created_at})`);
  }
} else {
  console.log("Table is empty — connection works.");
}
