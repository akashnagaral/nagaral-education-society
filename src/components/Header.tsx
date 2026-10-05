"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SocialLinks } from "@/components/SocialIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/site-data";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#courses", label: "Courses" },
  { href: "/#colleges", label: "Colleges" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#leadership", label: "Leadership" },
  { href: "/careers", label: "Careers" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
  { href: "/login", label: "Portal" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="section-pad mx-auto flex max-w-6xl items-center gap-3 py-3 lg:gap-4">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
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
            const active =
              link.href === "/careers"
                ? pathname.startsWith("/careers")
                : link.href === "/login"
                  ? pathname.startsWith("/login") || pathname.startsWith("/portal")
                  : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 text-sm tracking-wide transition-colors ${
                  active ? "text-gold" : "text-cream/75 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <SocialLinks
            className="flex items-center gap-2.5"
            iconClassName="h-4 w-4"
          />
          <ThemeToggle />
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-on-gold transition hover:brightness-110"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
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
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <SocialLinks className="flex items-center gap-4 pt-2" iconClassName="h-5 w-5" />
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pt-1 text-[#25D366]"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="text-cream/80">{site.phone}</span>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
