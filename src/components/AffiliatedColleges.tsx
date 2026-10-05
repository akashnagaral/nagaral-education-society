import Image from "next/image";
import Link from "next/link";
import { colleges } from "@/lib/site-data";

export function AffiliatedColleges() {
  return (
    <section id="colleges" className="section-pad section-y bg-atmosphere scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Affiliated colleges
        </p>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Two campuses. One mission.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Established colleges in Dharwad and Alnavar — Nagaral Education
          Society® has collaborated with them since 2024 to strengthen academics,
          coaching, and student support.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {colleges.map((college) => (
            <article key={college.id} className="group">
              <Link href={college.slug} className="block overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={college.image}
                    alt={college.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hero-scrim/90 via-hero-scrim/25 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.18em] text-gold">
                    Collaboration since {college.collaboratedSince}
                  </p>
                </div>
              </Link>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-cream">
                <Link href={college.slug} className="hover:text-gold">
                  {college.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{college.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/80">
                {college.description[0].slice(0, 180)}…
              </p>
              <Link
                href={college.slug}
                className="mt-5 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
              >
                View college details & map →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
