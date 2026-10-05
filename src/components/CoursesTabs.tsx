"use client";

import { useEffect, useState } from "react";
import {
  coachingPrograms,
  courses,
  facilities,
  scholarships,
  site,
} from "@/lib/site-data";

const tabs = [
  { id: "courses", label: "PU Science" },
  { id: "coaching", label: "Coaching" },
  { id: "aid", label: "Scholarships" },
  { id: "campus", label: "Campus life" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function tabFromHash(): TabId | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "coaching") return "coaching";
  if (hash === "courses") return "courses";
  return null;
}

export function CoursesTabs() {
  const [active, setActive] = useState<TabId>("courses");

  useEffect(() => {
    const applyHash = () => {
      const tab = tabFromHash();
      if (tab) setActive(tab);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);

    // Next.js <Link href="/#coaching"> often skips hashchange on the same page
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      if (href === "#coaching" || href.endsWith("/#coaching")) {
        window.setTimeout(() => setActive("coaching"), 0);
      }
      if (href === "#courses" || href.endsWith("/#courses")) {
        window.setTimeout(() => setActive("courses"), 0);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", applyHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  function selectTab(id: TabId) {
    setActive(id);
    if (id === "coaching") {
      window.history.replaceState(null, "", "#coaching");
    } else if (id === "courses") {
      window.history.replaceState(null, "", "#courses");
    } else if (window.location.hash === "#coaching" || window.location.hash === "#courses") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  return (
    <section id="courses" className="section-pad section-y scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          What we offer
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Courses & coaching in Dharwad
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          PUC I & II Science with PCMB / PCMCS combinations, integrated NEET ·
          CET · JEE · NDA coaching, scholarships, and campus support.
        </p>

        <div
          id="coaching"
          className="mt-8 scroll-mt-28"
          aria-hidden={active !== "coaching"}
        />

        <div
          role="tablist"
          aria-label="Courses and coaching"
          className="flex flex-wrap gap-2 border-b border-line pb-px"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => selectTab(tab.id)}
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

        <div className="mt-8">
          {active === "courses" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="border border-line bg-ink-soft/40 px-5 py-6"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-cream">
                    {course.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    {course.detail}
                  </p>
                  {"branches" in course && course.branches ? (
                    <div className="mt-4 border-t border-line pt-4">
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
                        Subject combinations
                      </p>
                      <ul className="mt-3 space-y-2">
                        {course.branches.map((branch) => (
                          <li key={branch.code} className="text-sm text-cream/80">
                            <span className="font-medium text-cream">
                              {branch.code}
                            </span>
                            <span className="text-muted"> — {branch.subjects}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {"points" in course && course.points ? (
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {course.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-cream/80">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}

          {active === "coaching" ? (
            <div className="space-y-6">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                Integrated training by expert faculties alongside PUC — so
                students prepare for board exams and national / state entrances
                together.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {coachingPrograms.map((program) => (
                  <article
                    key={program.id}
                    className="border border-line bg-ink-soft/50 px-5 py-6 transition hover:border-gold/50"
                  >
                    <p className="font-[family-name:var(--font-display)] text-2xl text-gold">
                      {program.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">{program.fullName}</p>
                    <p className="mt-4 text-sm leading-relaxed text-cream/80">
                      {program.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {active === "aid" ? (
            <div className="space-y-6">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                Nagaral Education Society® helps deserving students access
                quality PU Science education through scholarships and flexible
                support — ask at admission for current schemes.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {scholarships.map((item) => (
                  <article
                    key={item.title}
                    className="border border-line px-5 py-6"
                  >
                    <h3 className="text-gold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/75">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {active === "campus" ? (
            <div className="space-y-6">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                Education-oriented campuses in Dharwad and Alnavar — labs,
                sports, hostels, and evening mentoring under one roof.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="border border-gold/35 bg-ink-soft/40 px-5 py-6">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                    {site.hostel.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    {site.hostel.text}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {site.hostel.points.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-cream/80">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gold/35 bg-ink-soft/40 px-5 py-6">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                    {site.eveningMentoring.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    {site.eveningMentoring.text}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {site.eveningMentoring.points.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-cream/80">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                  More campus facilities
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {facilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border border-line/80 px-4 py-3 text-sm text-cream/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted">{site.timings.note}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
