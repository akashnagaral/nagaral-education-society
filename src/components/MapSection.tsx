import type { College } from "@/lib/site-data";

type Props = {
  college: College;
};

export function MapSection({ college }: Props) {
  return (
    <section id="location" className="section-pad section-y bg-atmosphere scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Campus location
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Find us on the map
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {college.name} — {college.location}. Open in Google Maps for
          directions, or use the embedded map below.
        </p>

        <div className="mt-8 overflow-hidden border border-line">
          <iframe
            title={`${college.name} location map`}
            src={college.mapEmbedUrl}
            className="h-[min(420px,60vh)] w-full border-0 bg-ink-soft"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a
            href={college.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-bright"
          >
            Open in Google Maps
          </a>
          <p className="text-xs text-muted">
            Location QR code can be added here later.
          </p>
        </div>
      </div>
    </section>
  );
}
