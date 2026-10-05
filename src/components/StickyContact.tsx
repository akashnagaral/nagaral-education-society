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
      className="fixed bottom-5 right-5 z-[60] w-[min(20rem,calc(100vw-2rem))] border border-line bg-ink/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
      aria-label="Quick contact"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <Image
            src="/images/nes-logo.png"
            alt=""
            width={36}
            height={36}
            className="nes-logo mt-0.5 h-9 w-9 shrink-0 object-contain"
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

      <div className="mt-3 space-y-2.5">
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-cream hover:text-gold"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-on-gold">
            <WhatsAppIcon className="h-4 w-4" />
          </span>
          <span>{site.phone}</span>
        </a>
        <a
          href={site.emailHref}
          className="flex items-start gap-2.5 text-xs text-muted hover:text-gold"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-cream">
            <EmailIcon className="h-4 w-4" />
          </span>
          <span className="min-w-0 break-all leading-snug pt-1.5">{site.email}</span>
        </a>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        {site.timings.weekdays}
        <br />
        {site.timings.sunday}
      </p>
    </aside>
  );
}

function EmailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  );
}
