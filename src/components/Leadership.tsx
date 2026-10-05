import Image from "next/image";
import { site } from "@/lib/site-data";

export function Leadership() {
  const guide = site.inspiration;
  const founder = site.owner;

  return (
    <section id="leadership" className="section-pad section-y bg-atmosphere scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Leadership
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Guide & founder
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          The inspiration who guides our society, and the founder who builds it
          day by day.
        </p>

        {/* Guide — photo left, content right */}
        <div
          id="guide"
          className="mt-12 grid scroll-mt-24 gap-10 border-b border-line pb-16 lg:grid-cols-[1fr_1.05fr] lg:items-start"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Our inspiration
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
              {guide.name}
            </h3>
            <p className="mt-2 text-sm text-gold">{guide.role}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
              {guide.credentials}
            </p>

            <figure className="mt-6 max-w-lg border border-line bg-hero-scrim">
              <Image
                src={guide.photo}
                alt={`${guide.name}, ${guide.role}`}
                width={900}
                height={1125}
                className="h-auto w-full object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <figcaption className="border-t border-line px-4 py-3">
                <p className="text-sm font-medium text-cream">{guide.name}</p>
                <p className="mt-1 text-xs italic leading-snug text-gold">
                  “{guide.quote}”
                </p>
              </figcaption>
            </figure>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Guide of the society
            </p>
            <div className="mt-5 space-y-5 text-sm leading-relaxed text-cream/80 sm:text-base">
              {guide.bio.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {guide.highlights.map((item) => (
                <li
                  key={item}
                  className="border border-line bg-ink-soft/50 px-4 py-3 text-sm text-cream/85"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 bg-gold align-middle" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Founder — content left, photo right */}
        <div
          id="founder"
          className="mt-16 grid scroll-mt-24 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start"
        >
          <div className="lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Founder’s note
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
              {founder.name}
            </h3>
            <p className="mt-2 text-sm text-gold">{founder.role}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
              {founder.credentials}
            </p>
            <div className="mt-5 space-y-5 text-sm leading-relaxed text-cream/80 sm:text-base">
              {founder.bio.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {founder.highlights.map((item) => (
                <li
                  key={item}
                  className="border border-line bg-ink-soft/50 px-4 py-3 text-sm text-cream/85"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 bg-gold align-middle" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:order-2 lg:justify-self-end">
            <figure className="max-w-lg border border-line bg-hero-scrim lg:ml-auto">
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                width={900}
                height={1125}
                className="h-auto w-full object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <figcaption className="border-t border-line px-4 py-3">
                <p className="text-sm font-medium text-cream">{founder.name}</p>
                <p className="mt-1 text-xs italic leading-snug text-gold">
                  “{founder.vision}”
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
