import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { RealStoriesSection } from "@/components/RealStoriesSection";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { colleges, site } from "@/lib/site-data";

const highlights = [
  "100% II PU board results (2025–2026)",
  "PUC Science · PCMB / PCMCS",
  "NEET · CET · JEE · NDA coaching",
  "Hostels · labs · evening mentoring",
];

export function HomeLanding() {
  return (
    <>
      <Hero />

      <section className="section-pad border-y border-line bg-ink-soft/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="border border-gold/50 bg-hero-scrim px-4 py-3 text-center">
              <p className="font-[family-name:var(--font-display)] text-3xl text-gold sm:text-4xl">
                100%
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/70">
                II PU · {site.milestone.batch}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                First pass-out
              </p>
              <p className="mt-1 max-w-md text-sm text-cream sm:text-base">
                {site.milestone.title} — focused PU Science in Dharwad & Alnavar.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="admissions-blink rounded-sm bg-gold px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-on-gold"
          >
            Admissions open
          </a>
        </div>
      </section>

      <section className="section-pad section-y">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Nagaral Education Society®
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
              Focused PU Science in Dharwad
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/85 sm:text-base">
              {site.about[0]}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {site.about[1]}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-cream/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#about"
                className="bg-gold px-4 py-2.5 text-sm font-semibold text-on-gold hover:bg-gold-bright"
              >
                More about us
              </a>
              <a
                href="#courses"
                className="border border-line px-4 py-2.5 text-sm text-cream hover:border-gold hover:text-gold"
              >
                Courses & coaching
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#25D366]/45 px-4 py-2.5 text-sm text-[#25D366] hover:border-[#25D366]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Our campuses
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-cream">
              Two colleges. One society.
            </h3>
            <div className="mt-6 space-y-4">
              {colleges.map((college) => (
                <Link
                  key={college.id}
                  href={college.slug}
                  className="group block overflow-hidden border border-line transition hover:border-gold/50"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={college.image}
                      alt={college.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hero-scrim/90 via-hero-scrim/25 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-gold">
                        Since {college.collaboratedSince}
                        {college.collegeCode ? ` · ${college.collegeCode}` : ""}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">{college.name}</p>
                      <p className="text-[11px] text-white/75">{college.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <a
              href="#colleges"
              className="mt-4 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              Campus overview →
            </a>
          </div>
        </div>
      </section>

      <RealStoriesSection />
    </>
  );
}
