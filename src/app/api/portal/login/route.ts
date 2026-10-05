import { NextResponse } from "next/server";
import { applySessionCookie } from "@/lib/portal-session";
import { CEO_REDIRECT_URL, findUser, toSessionUser } from "@/lib/portal-users";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = (body.username ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  const user = findUser(username, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const session = toSessionUser(user);

  if (session.role === "ceo") {
    const response = NextResponse.json({
      openExternal: CEO_REDIRECT_URL,
      redirect: "/",
      user: session,
    });
    return applySessionCookie(response, session, request);
  }

  const response = NextResponse.json({ redirect: "/portal", user: session });
  return applySessionCookie(response, session, request);
}
