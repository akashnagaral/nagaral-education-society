import Image from "next/image";
import Link from "next/link";
import { colleges, facilities, site } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section id="about" className="section-pad section-y scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            About us · Dharwad
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
            Where learning meets ambition
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-cream/80 sm:text-base">
            {site.about.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-line px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Founded</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-gold">
                {site.founded}
              </p>
            </div>
            <div className="border border-gold/40 bg-ink-soft/40 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">PU-II results</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-gold">
                100%
              </p>
              <p className="mt-1 text-[11px] text-cream/60">II PU · 2025–2026</p>
            </div>
            <div className="border border-line px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Campuses</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-gold">
                2
              </p>
            </div>
            <div className="border border-line px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Base</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-gold">
                {site.city}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-line bg-ink-soft/30 px-5 py-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                {site.faculty.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {site.faculty.text}
              </p>
              <ul className="mt-4 space-y-2">
                {site.faculty.points.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-cream/80">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-line bg-ink-soft/30 px-5 py-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                {site.guidanceTeam.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {site.guidanceTeam.text}
              </p>
              <ul className="mt-4 space-y-2">
                {site.guidanceTeam.points.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-cream/80">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-line bg-ink-soft/30 px-5 py-6 sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                {site.hostel.title}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/75">
                {site.hostel.text}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {site.hostel.points.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-cream/80">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {colleges.map((college) => (
            <Link
              key={college.id}
              href={college.slug}
              className="group block overflow-hidden border border-line transition hover:border-gold/50"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={college.image}
                  alt={college.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">
                    {college.shortName}
                  </p>
                  <p className="mt-1 text-sm font-medium text-cream">{college.name}</p>
                  <p className="mt-0.5 text-[11px] text-cream/65">{college.location}</p>
                </div>
              </div>
            </Link>
          ))}
          <ul className="space-y-2 text-sm text-cream/75">
            {facilities.slice(0, 5).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
