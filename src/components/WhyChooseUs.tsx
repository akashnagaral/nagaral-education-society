import Link from "next/link";
import { site } from "@/lib/site-data";

const highlights = [
  {
    title: "100% II PU board results",
    text: "2025–2026 first pass-out year — every student cleared the board exams.",
  },
  {
    title: "Focused PU Science",
    text: "PUC I & II Science only — with PCMB and PCMCS as subject combinations (branches), not separate courses.",
  },
  {
    title: "Evening doubt clearing",
    text: "Teachers visit study rooms every evening, subject by subject, and stay with students until doubts are cleared.",
  },
  {
    title: "Labs, sports & hostels",
    text: "Science labs, tennis · cricket · football grounds, separate hostels, and hygienic nutritious food.",
  },
  {
    title: "Experienced faculty",
    text: "Seasoned teachers including IIT / NIT backgrounds and PhD holders — plus NEET · CET · JEE · NDA coaching.",
  },
  {
    title: "Guidance by professionals",
    text: "Doctors, engineers, and IAS / KAS officers advise the society on academics and careers.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad section-y bg-atmosphere scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Why parents choose us
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
              Among Dharwad’s best focused PU Science colleges
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Nagaral Education Society® partners with NTSS Dharwad and NES
              Alnavar to deliver disciplined academics, results, and affordable
              pathways — not crowded classrooms.
            </p>
          </div>
          <span className="admissions-blink rounded-sm bg-gold px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-on-gold">
            Admissions open
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="border border-line bg-ink-soft/50 px-5 py-6"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl text-gold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold px-5 py-3 text-sm font-semibold text-on-gold hover:bg-gold-bright"
          >
            Enquire admissions
          </a>
          <Link
            href="/#colleges"
            className="border border-line px-5 py-3 text-sm text-cream hover:border-gold hover:text-gold"
          >
            View colleges
          </Link>
        </div>
      </div>
    </section>
  );
}
