import { NextResponse } from "next/server";
import { listAdmissionLeads, markLeadContacted } from "@/lib/leads";
import { getSessionUser } from "@/lib/portal-session";

function canViewLeads(role: string) {
  return role === "admin" || role === "teacher" || role === "ceo";
}

export async function GET() {
  const user = await getSessionUser();
  if (!user || !canViewLeads(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const leads = await listAdmissionLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user || !canViewLeads(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { id?: string } = {};
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await markLeadContacted(body.id);
  return NextResponse.json({ ok: true });
}
