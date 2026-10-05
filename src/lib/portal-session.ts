import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { SessionUser } from "@/lib/portal-users";

export const SESSION_COOKIE = "nes_portal_session";

function secretKey() {
  const secret = process.env.PORTAL_SESSION_SECRET || "nes-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export function sessionCookieOptions(request?: Request) {
  const forwarded = request?.headers.get("x-forwarded-proto");
  const host = request?.headers.get("host") ?? "";
  const isHttps =
    forwarded === "https" ||
    host.includes("ngrok") ||
    process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    // Required when using HTTPS tunnels (ngrok); otherwise browser may drop cookie
    secure: isHttps,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

/** Attach session cookie directly on the API response (required for Route Handlers). */
export async function applySessionCookie(
  response: NextResponse,
  user: SessionUser,
  request?: Request,
) {
  const token = await createSessionToken(user);
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(request));
  return response;
}

export function clearSessionOnResponse(response: NextResponse, request?: Request) {
  response.cookies.set(SESSION_COOKIE, "", {
    ...sessionCookieOptions(request),
    maxAge: 0,
  });
  return response;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    const user = payload.user as SessionUser | undefined;
    return user ?? null;
  } catch {
    return null;
  }
}
