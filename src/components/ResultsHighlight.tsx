import { site } from "@/lib/site-data";

export function ResultsHighlight() {
  const { milestone } = site;

  return (
    <section
      id="results-highlight"
      className="section-pad scroll-mt-24 border-y border-line bg-ink-soft/80 py-10"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-5 sm:items-center">
          <div className="shrink-0 border border-gold/50 bg-ink px-5 py-4 text-center">
            <p className="font-[family-name:var(--font-display)] text-4xl leading-none text-gold sm:text-5xl">
              100%
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-cream/70">
              II PU board
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              First pass-out · {milestone.batch}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-cream sm:text-3xl">
              {milestone.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              {milestone.detail}
            </p>
          </div>
        </div>
        <span className="admissions-blink shrink-0 rounded-sm bg-gold px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink">
          Admissions open
        </span>
      </div>
    </section>
  );
}
