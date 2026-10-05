import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/images/hero-students.png"
        alt="Students aspiring through education — Nagaral Education Society, Dharwad"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/78 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(228,182,58,0.35), transparent 70%)",
          animation: "ray-pulse 5s ease-in-out infinite",
        }}
      />

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-16 pt-28 sm:pb-20">
        <div className="max-w-2xl">
          <Image
            src="/images/nes-logo.png"
            alt={`${site.name} logo`}
            width={120}
            height={120}
            className="logo-glow animate-rise h-24 w-24 object-contain opacity-70 sm:h-28 sm:w-28"
            priority
          />
          <div className="animate-rise-delay-1 mt-5 flex flex-wrap items-center gap-3">
            <span className="admissions-blink rounded-sm bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink">
              Admissions open
            </span>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Dharwad · 100% II PU results (2025–2026)
            </p>
          </div>
          <h1 className="animate-rise-delay-1 mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.1] tracking-tight text-cream sm:text-6xl md:text-7xl">
            Nagaral Education
            <br />
            Society
            <sup className="ml-1 align-super text-[0.45em] text-gold">®</sup>
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-lg font-medium leading-snug text-cream sm:text-xl">
            {site.tagline}
          </p>
          <p className="animate-rise-delay-2 mt-3 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
            {site.heroLead}
          </p>
          <div className="animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-ink transition hover:brightness-110"
              aria-label="WhatsApp admissions"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
            <Link
              href="/#courses"
              className="bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-bright"
            >
              PUC Science courses
            </Link>
            <Link
              href="/#coaching"
              className="border border-cream/35 px-5 py-3 text-sm font-medium text-cream transition hover:border-gold hover:text-gold"
            >
              View coaching
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
