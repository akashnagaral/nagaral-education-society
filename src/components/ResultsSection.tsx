import type { College, ResultFile } from "@/lib/site-data";
import { resultsByYear } from "@/lib/site-data";

type Props = {
  college: College;
  items: ResultFile[];
};

export function ResultsSection({ college, items }: Props) {
  const byYear = resultsByYear(items);

  return (
    <section id="results" className="section-pad section-y scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Downloads
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Results & notes
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Public PDF downloads for {college.shortName}. No login required —
          students and parents can download directly.
        </p>

        {byYear.length === 0 ? (
          <div className="mt-8 border border-line bg-ink-soft/50 px-6 py-8">
            <p className="text-cream/80">No files uploaded yet.</p>
            <p className="mt-2 text-sm text-muted">
              To add a result: drop a PDF in{" "}
              <code className="text-gold">public/results/{college.id}/</code>{" "}
              and register it in{" "}
              <code className="text-gold">src/lib/site-data.ts</code>.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {byYear.map(([year, list]) => (
              <div key={year}>
                <div className="mb-4 flex items-baseline gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-gold">
                    {year}
                  </h3>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <ul className="space-y-3">
                  {list.map((file) => (
                    <li key={file.id}>
                      <a
                        href={file.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-wrap items-center justify-between gap-3 border border-line px-5 py-4 transition hover:border-gold/60"
                      >
                        <span>
                          <span className="block font-medium text-cream">
                            {file.title}
                          </span>
                          <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-muted">
                            {file.type === "notes" ? "Study notes" : "Exam result"} · PDF
                          </span>
                        </span>
                        <span className="text-sm text-gold">Download →</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
