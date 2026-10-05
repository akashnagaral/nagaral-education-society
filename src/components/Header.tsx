"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/site-data";

const links = [
  { href: "/#home", label: "Home", hash: "home" },
  { href: "/#about", label: "About", hash: "about" },
  { href: "/#courses", label: "Courses", hash: "courses" },
  { href: "/#colleges", label: "Colleges", hash: "colleges" },
  { href: "/#achievements", label: "Achievements", hash: "achievements" },
  { href: "/#leadership", label: "Leadership", hash: "leadership" },
  { href: "/careers", label: "Careers", hash: null },
  { href: "/#faq", label: "FAQ", hash: "faq" },
  { href: "/#contact", label: "Contact", hash: "contact" },
  { href: "/login", label: "Portal", hash: null },
];

function activeHash() {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || hash === "home") return "home";
  if (hash === "coaching") return "courses";
  if (hash === "toppers" || hash === "stories") return "achievements";
  if (hash === "guide" || hash === "founder") return "leadership";
  if (hash === "why-us") return "about";
  return hash;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("home");

  useEffect(() => {
    const sync = () => setHash(activeHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="section-pad mx-auto flex max-w-6xl items-center gap-3 py-3 lg:gap-4">
        <Link
          href="/#home"
          className="shrink-0"
          onClick={(e) => {
            setOpen(false);
            setHash("home");
            if (onHome) {
              e.preventDefault();
              if (window.location.hash.replace(/^#/, "") === "home" || !window.location.hash) {
                window.history.replaceState(null, "", "#home");
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              } else {
                window.location.hash = "home";
              }
            }
          }}
        >
          <Image
            src="/images/nes-logo.png"
            alt={`${site.name} logo`}
            width={40}
            height={40}
            className="nes-logo h-9 w-9 object-contain sm:h-10 sm:w-10"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:gap-5 2xl:gap-6 lg:flex">
          {links.map((link) => {
            const active = link.hash
              ? onHome && hash === link.hash
              : link.href === "/careers"
                ? pathname.startsWith("/careers")
                : pathname.startsWith("/login") || pathname.startsWith("/portal");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 text-sm tracking-wide transition-colors ${
                  active ? "text-gold" : "text-cream/75 hover:text-gold"
                }`}
                onClick={(e) => {
                  if (!link.hash || !onHome) return;
                  // Force hash update — Next.js Link often skips hashchange on /
                  e.preventDefault();
                  setHash(link.hash);
                  if (window.location.hash.replace(/^#/, "") === link.hash) {
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                  } else {
                    window.location.hash = link.hash;
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center lg:flex">
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-cream"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span className={`h-px bg-cream transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-px bg-cream transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px bg-cream transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-ink-soft px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1 text-cream/90"
                onClick={(e) => {
                  setOpen(false);
                  if (!link.hash || !onHome) return;
                  e.preventDefault();
                  setHash(link.hash);
                  if (window.location.hash.replace(/^#/, "") === link.hash) {
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                  } else {
                    window.location.hash = link.hash;
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
