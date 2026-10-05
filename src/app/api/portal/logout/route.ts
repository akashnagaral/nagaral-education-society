import { NextResponse } from "next/server";
import { clearSessionOnResponse } from "@/lib/portal-session";

export async function POST(request: Request) {
  return clearSessionOnResponse(NextResponse.json({ ok: true }), request);
}
