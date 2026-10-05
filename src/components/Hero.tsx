import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { colleges, site } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-scrim">
      <div className="relative mx-auto w-full max-w-[1400px]">
        <Image
          src="/images/hero-students.png"
          alt="Best PU Science college in Dharwad — Nagaral Education Society students"
          width={1024}
          height={576}
          priority
          className="h-auto w-full"
          sizes="(max-width: 1400px) 100vw, 1400px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hero-scrim/88 via-hero-scrim/55 to-hero-scrim/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-hero-scrim via-hero-scrim/35 to-transparent" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(228,182,58,0.35), transparent 70%)",
            animation: "ray-pulse 5s ease-in-out infinite",
          }}
        />

        <div className="section-pad absolute inset-0 flex flex-col justify-end pb-8 pt-16 sm:pb-10 md:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-xl">
              <Image
                src="/images/nes-logo.png"
                alt={`${site.name} logo — PU Science colleges in Dharwad`}
                width={96}
                height={96}
                className="logo-glow animate-rise h-16 w-16 object-contain opacity-70 sm:h-20 sm:w-20"
                priority
              />
              <div className="animate-rise-delay-1 mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                <span className="admissions-blink rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-on-gold sm:px-3 sm:py-1.5 sm:text-xs">
                  Admissions open
                </span>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold sm:text-xs">
                  Dharwad · 100% II PU results (2025–2026)
                </p>
              </div>
              <h1 className="animate-rise-delay-1 mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.08] tracking-tight text-hero-fg">
                Nagaral Education
                <br />
                Society
                <sup className="ml-1 align-super text-[0.45em] text-gold">®</sup>
              </h1>
              <p className="animate-rise-delay-2 mt-2 max-w-xl text-[clamp(0.95rem,1.6vw,1.25rem)] font-medium leading-snug text-hero-fg sm:mt-3">
                {site.tagline}
              </p>
              <p className="animate-rise-delay-2 mt-2 hidden max-w-xl text-sm leading-relaxed text-hero-fg-muted sm:block md:text-base">
                {site.heroLead}
              </p>

              <div className="animate-rise-delay-3 mt-3 sm:mt-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold/90">
                  Collaborated colleges
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-hero-fg/85 sm:text-sm">
                  {colleges.map((college, index) => (
                    <span key={college.id} className="inline-flex items-center gap-3">
                      {index > 0 ? (
                        <span className="text-hero-fg/35" aria-hidden>
                          ·
                        </span>
                      ) : null}
                      <Link
                        href={college.slug}
                        className="underline-offset-4 transition hover:text-gold hover:underline"
                      >
                        {college.name}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>

              <div className="animate-rise-delay-3 mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-on-gold transition hover:brightness-110 sm:h-12 sm:w-12"
                  aria-label="WhatsApp admissions"
                >
                  <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <Link
                  href="/#courses"
                  className="bg-gold px-4 py-2.5 text-xs font-semibold text-on-gold transition hover:bg-gold-bright sm:px-5 sm:py-3 sm:text-sm"
                >
                  PUC Science courses
                </Link>
                <Link
                  href="/#coaching"
                  className="border border-hero-fg/35 px-4 py-2.5 text-xs font-medium text-hero-fg transition hover:border-gold hover:text-gold sm:px-5 sm:py-3 sm:text-sm"
                >
                  View coaching
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
