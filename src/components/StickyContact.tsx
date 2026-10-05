"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/site-data";

export function StickyContact() {
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);

  if (pathname.startsWith("/portal") || pathname.startsWith("/login")) {
    return null;
  }

  if (minimized) {
    return (
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2">
        <span className="admissions-blink rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-on-gold">
          Admissions open
        </span>
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-on-gold shadow-lg hover:brightness-110"
          aria-label="Expand quick contact"
          title="Quick contact"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </button>
      </div>
    );
  }

  return (
    <aside
      className="fixed bottom-5 right-5 z-[60] w-[min(18.5rem,calc(100vw-2rem))] border border-line bg-ink/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
      aria-label="Quick contact"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <Image
            src="/images/nes-logo.png"
            alt=""
            width={36}
            height={36}
            className="mt-0.5 h-9 w-9 shrink-0 object-contain opacity-70"
          />
          <div>
            <p className="admissions-blink inline-block rounded-sm bg-gold px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-on-gold">
              Admissions open
            </p>
            <p className="mt-2 text-sm font-medium text-cream">Quick contact</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="px-1.5 text-xs text-muted hover:text-cream"
          aria-label="Minimize contact panel"
          title="Minimize"
        >
          –
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-on-gold hover:brightness-110"
          aria-label="Open WhatsApp"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <div className="min-w-0 text-sm">
          <a href={site.phoneHref} className="block text-cream hover:text-gold">
            {site.phone}
          </a>
          <a
            href={site.emailHref}
            className="mt-0.5 block truncate text-xs text-muted hover:text-gold"
          >
            {site.email}
          </a>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        {site.timings.weekdays}
        <br />
        {site.timings.sunday}
      </p>
    </aside>
  );
}
