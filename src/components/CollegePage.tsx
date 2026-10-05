import Image from "next/image";
import Link from "next/link";
import { AchievementsSection } from "@/components/AchievementsSection";
import { MapSection } from "@/components/MapSection";
import { ResultsSection } from "@/components/ResultsSection";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  achievements,
  resultsForCollege,
  type College,
  site,
} from "@/lib/site-data";

type Props = {
  college: College;
};

export function CollegePage({ college }: Props) {
  const collegeAchievements = achievements.filter(
    (a) => a.collegeId === college.id,
  );
  const collegeResults = resultsForCollege(college.id);

  return (
    <>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src={college.image}
          alt={college.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-scrim/70 via-hero-scrim/65 to-hero-scrim" />
        <div className="section-pad relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end pb-14 pt-24">
          <p className="animate-rise text-xs uppercase tracking-[0.22em] text-gold">
            In collaboration with {site.name}® since {college.collaboratedSince}
          </p>
          <h1 className="animate-rise-delay-1 mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight text-hero-fg sm:text-5xl md:text-6xl">
            {college.name}
          </h1>
          <p className="animate-rise-delay-2 mt-4 text-hero-fg-muted">{college.address}</p>
          {college.collegeCode ? (
            <p className="mt-1 text-sm text-gold">College code: {college.collegeCode}</p>
          ) : null}
          <div className="animate-rise-delay-3 mt-6 flex flex-wrap items-center gap-3">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-on-gold hover:brightness-110"
              aria-label="WhatsApp admissions"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
            <a
              href="#location"
              className="border border-hero-fg/35 px-5 py-3 text-sm text-hero-fg hover:border-gold hover:text-gold"
            >
              Campus location
            </a>
            <Link
              href="/#contact"
              className="border border-hero-fg/35 px-5 py-3 text-sm text-hero-fg hover:border-gold hover:text-gold"
            >
              Full contact
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad section-y">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              About the college
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream">
              Collaboration with NES
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-cream/80 sm:text-base">
              {college.description.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
          <aside className="border border-line bg-ink-soft/60 p-6 self-start">
            <p className="text-xs uppercase tracking-[0.18em] text-gold">At a glance</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/85">
              {college.focus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="gold-rule my-6" />
            <p className="text-xs text-muted">Society contact</p>
            <a href={site.phoneHref} className="mt-1 block text-gold">
              {site.phone}
            </a>
            <a href={site.emailHref} className="mt-1 block text-sm text-cream/80 hover:text-gold">
              {site.email}
            </a>
          </aside>
        </div>
      </section>

      <MapSection college={college} />

      <AchievementsSection
        variant="college"
        items={collegeAchievements}
        title={`${college.shortName} achievements`}
        subtitle="Student achievements for this campus by year. Real names and results will replace these placeholders."
        showMergedNote={false}
      />

      <ResultsSection college={college} items={collegeResults} />
    </>
  );
}
