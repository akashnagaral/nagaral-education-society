"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CEO_REDIRECT_URL } from "@/lib/portal-users";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setFallbackUrl("");
    setLoading(true);
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        redirect?: string;
        openExternal?: string;
      };
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      if (data.openExternal) {
        const opened = window.open(data.openExternal, "_blank", "noopener,noreferrer");
        if (!opened) {
          setFallbackUrl(data.openExternal || CEO_REDIRECT_URL);
          setInfo("Popup blocked — allow popups, or use the link below.");
          setLoading(false);
          return;
        }
        window.location.assign("/");
        return;
      }

      window.location.assign(data.redirect || "/portal");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="section-pad flex min-h-[80svh] items-center justify-center py-16">
      <div className="w-full max-w-md border border-line bg-ink-soft/60 p-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/nes-logo.png"
            alt=""
            width={44}
            height={44}
            className="nes-logo h-11 w-11 object-contain"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Portal login</p>
            <h1 className="font-[family-name:var(--font-display)] text-2xl text-cream">
              Nagaral Education Society
            </h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" method="post" action="#">
          <div>
            <label className="text-xs uppercase tracking-[0.14em] text-muted" htmlFor="username">
              Email
            </label>
            <input
              id="username"
              name="username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-line bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-gold"
              placeholder="you@nes.com"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.14em] text-muted" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-line bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-gold"
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {info ? <p className="text-sm text-gold">{info}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold px-4 py-3 text-sm font-semibold text-on-gold hover:bg-gold-bright disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {fallbackUrl ? (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center border border-gold px-4 py-3 text-sm text-gold hover:bg-ink"
          >
            Continue
          </a>
        ) : null}

        <Link href="/" className="mt-6 inline-block text-sm text-gold hover:underline">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
