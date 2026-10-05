"use client";

import { useEffect, useState } from "react";
import { AboutSection } from "@/components/AboutSection";
import { AffiliatedColleges } from "@/components/AffiliatedColleges";
import { AchievementsSection } from "@/components/AchievementsSection";
import { Contact } from "@/components/Contact";
import { CoursesTabs } from "@/components/CoursesTabs";
import { FaqSection } from "@/components/FaqSection";
import { HomeLanding } from "@/components/HomeLanding";
import { Leadership } from "@/components/Leadership";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export type HomeSectionId =
  | "home"
  | "about"
  | "why-us"
  | "courses"
  | "colleges"
  | "achievements"
  | "leadership"
  | "faq"
  | "contact";

const SECTION_HASHES = new Set<string>([
  "home",
  "about",
  "why-us",
  "courses",
  "coaching",
  "colleges",
  "achievements",
  "toppers",
  "stories",
  "leadership",
  "guide",
  "founder",
  "faq",
  "contact",
]);

export function sectionFromHash(raw?: string): HomeSectionId {
  const hash = (raw ?? (typeof window !== "undefined" ? window.location.hash : "")).replace(
    /^#/,
    "",
  );
  if (!hash || hash === "home") return "home";
  if (hash === "coaching" || hash === "courses") return "courses";
  if (hash === "stories") return "home";
  if (hash === "toppers") return "achievements";
  if (hash === "guide" || hash === "founder") return "leadership";
  if (hash === "why-us") return "why-us";
  if (hash === "about") return "about";
  if (hash === "colleges") return "colleges";
  if (hash === "achievements") return "achievements";
  if (hash === "leadership") return "leadership";
  if (hash === "faq") return "faq";
  if (hash === "contact") return "contact";
  return "home";
}

function hashFromHref(href: string): string | null {
  const i = href.indexOf("#");
  if (i < 0) return null;
  const hash = href.slice(i + 1).split("?")[0];
  if (!hash || !SECTION_HASHES.has(hash)) return null;
  // Full paths like /careers#x are not home sections
  const path = href.slice(0, i);
  if (path && path !== "/" && !path.endsWith("/")) return null;
  return hash;
}

export function HomeView() {
  const [section, setSection] = useState<HomeSectionId>("home");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const sync = () => {
      const next = sectionFromHash();
      setSection(next);
      setTick((n) => n + 1);
      const raw = window.location.hash.replace(/^#/, "");
      if (next === "home" && raw === "stories") {
        window.requestAnimationFrame(() => {
          document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        window.scrollTo(0, 0);
      }
    };

    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);

    // Next.js <Link href="/#about"> often updates the URL without firing hashchange
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      const hash = hashFromHref(href);
      if (!hash) return;

      // Same-page hash nav: apply immediately so the panel switches
      if (window.location.pathname === "/" || href.startsWith("#")) {
        window.setTimeout(() => {
          const next = sectionFromHash(hash);
          setSection(next);
          setTick((n) => n + 1);
          if (next === "home" && hash === "stories") {
            window.requestAnimationFrame(() => {
              document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
            });
          } else {
            window.scrollTo(0, 0);
          }
          if (window.location.hash.replace(/^#/, "") !== hash) {
            window.history.pushState(null, "", `#${hash}`);
          }
        }, 0);
      }
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div key={`${section}-${tick}`} className="section-panel min-h-[calc(100svh-4rem)]">
      {section === "home" ? <HomeLanding /> : null}
      {section === "about" ? <AboutSection /> : null}
      {section === "why-us" ? <WhyChooseUs /> : null}
      {section === "courses" ? <CoursesTabs /> : null}
      {section === "colleges" ? <AffiliatedColleges /> : null}
      {section === "achievements" ? <AchievementsSection /> : null}
      {section === "leadership" ? <Leadership /> : null}
      {section === "contact" ? <Contact /> : null}
      {section === "faq" ? <FaqSection /> : null}
    </div>
  );
}
