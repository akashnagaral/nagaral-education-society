import Link from "next/link";
import { SocialLinks } from "@/components/SocialIcons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { colleges, site } from "@/lib/site-data";

export function Contact() {
  return (
    <section id="contact" className="section-pad section-y scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Admissions & enquiries · Dharwad
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Call, WhatsApp, or email us for admissions and SSLC vacation classes.
          Campus maps are on each college page.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-on-gold hover:brightness-110"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <a
                href={site.phoneHref}
                className="font-[family-name:var(--font-display)] text-2xl text-gold hover:text-gold-bright"
              >
                {site.phone}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Email</p>
              <a
                href={site.emailHref}
                className="mt-1 block text-lg text-cream hover:text-gold"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Address</p>
              <p className="mt-1 text-cream/85">{site.address}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Timings</p>
              <p className="mt-1 text-cream/85">{site.timings.weekdays}</p>
              <p className="text-cream/70">{site.timings.sunday}</p>
              <p className="mt-2 text-sm text-muted">{site.timings.note}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Social</p>
              <SocialLinks className="mt-3 flex flex-wrap items-center gap-4" showLabels />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Our colleges</p>
            {colleges.map((college) => (
              <Link
                key={college.id}
                href={college.slug}
                className="block border border-line px-5 py-4 transition hover:border-gold/60"
              >
                <p className="font-medium text-cream">{college.name}</p>
                <p className="mt-1 text-sm text-muted">{college.address}</p>
                {college.collegeCode ? (
                  <p className="mt-1 text-xs text-gold">College code: {college.collegeCode}</p>
                ) : null}
                <p className="mt-2 text-sm text-gold">Map, results & details →</p>
              </Link>
            ))}
            <Link
              href="/careers"
              className="block border border-gold/40 bg-ink-soft/50 px-5 py-4 transition hover:border-gold"
            >
              <p className="font-medium text-cream">Careers</p>
              <p className="mt-1 text-sm text-muted">
                Lecturer & lab assistant openings at both campuses
              </p>
              <p className="mt-2 text-sm text-gold">View openings →</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
