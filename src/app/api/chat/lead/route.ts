import { NextResponse } from "next/server";
import { parseOptionalPhone } from "@/lib/chatbot";
import { createAdmissionLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: { phone?: string; note?: string } = {};
  try {
    body = (await request.json()) as { phone?: string; note?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = parseOptionalPhone(String(body.phone ?? ""));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (!parsed.phone) {
    return NextResponse.json({ error: "Phone is required to save a lead" }, { status: 400 });
  }

  try {
    const lead = await createAdmissionLead({
      phone: parsed.phone,
      note: body.note,
      source: "chatbot",
    });
    return NextResponse.json({ ok: true, lead: { id: lead.id, phone: lead.phone } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
