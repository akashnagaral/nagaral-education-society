import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { careersByCollege, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Nagaral Education Society® — lecturer and lab assistant openings at NTSS PU College, Dharwad and NES PU Science College, Alnavar.",
};

export default function CareersPage() {
  return (
    <>
      <section className="section-pad border-b border-line bg-atmosphere pb-14 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Careers · Dharwad & Alnavar
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-cream sm:text-5xl">
            Build futures with us
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Nagaral Education Society® is hiring passionate educators and lab
            staff for our affiliated colleges. Attractive salaries, focused
            batches, and a mission-driven workplace.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={site.emailHref}
              className="bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-bright"
            >
              Apply via email
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-4 py-3 text-sm text-cream hover:border-gold hover:text-gold"
              aria-label="WhatsApp HR / admissions"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-ink">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              Enquire
            </a>
          </div>
          <p className="mt-4 text-sm text-cream/70">
            Send CV to{" "}
            <a href={site.emailHref} className="text-gold hover:underline">
              {site.email}
            </a>{" "}
            · Call{" "}
            <a href={site.phoneHref} className="text-gold hover:underline">
              {site.phone}
            </a>
          </p>
        </div>
      </section>

      {careersByCollege.map(({ college, roles }) => {
        const lecturers = roles.filter((r) => r.category === "lecturer");
        const labs = roles.filter((r) => r.category === "lab-assistant");

        return (
          <section
            key={college.id}
            id={college.id}
            className="section-pad section-y scroll-mt-24 border-b border-line/60"
          >
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    Openings at
                  </p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-cream">
                    {college.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{college.address}</p>
                </div>
                <Link
                  href={college.slug}
                  className="text-sm text-gold underline-offset-4 hover:underline"
                >
                  College page →
                </Link>
              </div>

              <h3 className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Lecturer positions
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {lecturers.map((role) => (
                  <article
                    key={role.id}
                    className="border border-line bg-ink-soft/40 px-5 py-6"
                  >
                    <h4 className="font-[family-name:var(--font-display)] text-xl text-cream">
                      {role.title}
                    </h4>
                    <p className="mt-2 text-sm text-gold">{role.salary}</p>
                    <ul className="mt-4 space-y-2 text-sm text-cream/75">
                      {role.jd.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <h3 className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Lab assistant positions
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {labs.map((role) => (
                  <article
                    key={role.id}
                    className="border border-line px-5 py-6"
                  >
                    <h4 className="font-[family-name:var(--font-display)] text-lg text-cream">
                      {role.title}
                    </h4>
                    <p className="mt-2 text-sm text-gold">{role.salary}</p>
                    <ul className="mt-4 space-y-2 text-sm text-cream/75">
                      {role.jd.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-pad py-14">
        <div className="mx-auto max-w-6xl border border-line px-6 py-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-cream">
            How to apply
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Email your resume with the role and campus name in the subject line
            (example: “Lecturer Physics — NTSS Dharwad”). Shortlisted candidates
            will be contacted for an interview.
          </p>
          <p className="mt-4 text-sm text-cream/80">
            {site.email} · {site.phone}
          </p>
        </div>
      </section>
    </>
  );
}
