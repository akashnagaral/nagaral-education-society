"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  achievements,
  achievementsByYear,
  boardToppers2025,
  collegeName,
  type Achievement,
} from "@/lib/site-data";

type Props = {
  items?: Achievement[];
  title?: string;
  subtitle?: string;
  showMergedNote?: boolean;
  /** Home shows toppers + highlights as tabs */
  variant?: "home" | "college";
};

const homeTabs = [
  { id: "toppers", label: "Toppers" },
  { id: "highlights", label: "Highlights" },
] as const;

type HomeTab = (typeof homeTabs)[number]["id"];

export function AchievementsSection({
  items = achievements,
  title = "Achievements",
  subtitle = "Board toppers and milestones across our colleges.",
  showMergedNote = true,
  variant = "home",
}: Props) {
  const [active, setActive] = useState<HomeTab>("toppers");
  const byYear = achievementsByYear(items);

  useEffect(() => {
    if (variant !== "home") return;
    const openFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#toppers" || hash === "#achievements") setActive("toppers");
      else if (hash === "#highlights") setActive("highlights");
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [variant]);

  if (variant === "college") {
    return (
      <section id="achievements" className="section-pad section-y scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Results & excellence
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {subtitle}
          </p>
          <YearHighlights byYear={byYear} />
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="section-pad section-y scroll-mt-24">
      <div id="toppers" className="mx-auto max-w-6xl scroll-mt-24">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Results & excellence
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
        {showMergedNote ? (
          <p className="mt-2 text-xs text-cream/50">
            Toppers and batch milestones from both campuses.
          </p>
        ) : null}

        <div
          role="tablist"
          aria-label="Achievements"
          className="mt-8 flex flex-wrap gap-2 border-b border-line pb-px"
        >
          {homeTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => {
                setActive(tab.id);
                window.history.replaceState(
                  null,
                  "",
                  `#${tab.id === "highlights" ? "achievements" : tab.id}`,
                );
              }}
              className={`px-4 py-2.5 text-sm transition ${
                active === tab.id
                  ? "border-b-2 border-gold text-gold"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8" role="tabpanel">
          {active === "toppers" ? (
            <div className="space-y-8">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                II PU Board Exams 2025–26 — congratulations to our elites at NES
                PU College, Alnavar, with{" "}
                <span className="text-gold">100% results</span>.
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {boardToppers2025.map((topper) => (
                  <article
                    key={topper.id}
                    className="overflow-hidden border border-line bg-ink-soft/50 text-center"
                  >
                    <div className="border-b border-line bg-hero-scrim px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-gold">
                        {topper.rank}
                      </p>
                    </div>
                    <div className="relative mx-auto mt-6 h-40 w-40 overflow-hidden border border-line bg-hero-scrim">
                      <Image
                        src={topper.photo}
                        alt={topper.name}
                        fill
                        className="object-cover object-top"
                        sizes="160px"
                      />
                    </div>
                    <div className="px-5 py-6">
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cream">
                        {topper.name}
                      </h3>
                      <p className="mt-2 text-2xl font-medium text-gold">
                        {topper.score}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                        {collegeName(topper.collegeId)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border border-gold/35 bg-ink-soft/40 px-5 py-4">
                <p className="text-sm text-cream/85">
                  Congratulations from management, principal, and all staff
                  members.
                </p>
                <Link
                  href="/colleges/nes-alnavar"
                  className="text-sm text-gold underline-offset-4 hover:underline"
                >
                  NES Alnavar details →
                </Link>
              </div>
            </div>
          ) : null}

          {active === "highlights" ? (
            <div className="space-y-4">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                Both colleges — same milestone: 100% II PU board results in
                2025–2026.
              </p>
              <YearHighlights byYear={byYear} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function YearHighlights({
  byYear,
}: {
  byYear: ReturnType<typeof achievementsByYear>;
}) {
  return (
    <div className="mt-6 space-y-10">
      {byYear.map(([year, list]) => (
        <div key={year}>
          <div className="mb-4 flex items-baseline gap-3">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-gold">
              {year}
            </h3>
            <span className="h-px flex-1 bg-line" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {list.map((item) => (
              <li
                key={item.id}
                className="border border-line bg-ink-soft/60 px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {collegeName(item.collegeId)}
                </p>
                <p className="mt-2 font-medium text-cream">{item.studentName}</p>
                <p className="mt-1 text-sm text-cream/70">{item.highlight}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
