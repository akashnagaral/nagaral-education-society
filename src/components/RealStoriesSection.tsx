import Image from "next/image";
import { successStories } from "@/lib/site-data";

export function RealStoriesSection() {
  return (
    <section
      id="stories"
      className="section-pad scroll-mt-24 border-t border-line bg-atmosphere section-y"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Real stories
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Real impact
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Hear it from our alumni — what PU Science, coaching, and campus life
          actually felt like on the way to NEET, JEE, and careers they picked
          themselves.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {successStories.map((story) => (
            <article
              key={story.id}
              className="overflow-hidden border border-gold/25 bg-ink-soft/55"
            >
              {story.photo ? (
                <div className="relative mx-auto mt-6 h-40 w-40 overflow-hidden border border-line bg-hero-scrim">
                  <Image
                    src={story.photo}
                    alt={story.name}
                    fill
                    className="object-cover object-top"
                    sizes="160px"
                  />
                </div>
              ) : null}
              <div className="px-5 py-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-cream">
                  {story.name}
                </h3>
                <p className="mt-3 text-base font-medium text-gold">{story.result}</p>
                <p className="mt-1 text-sm text-cream">{story.outcome}</p>
                <blockquote className="mt-4 border-l-2 border-gold/50 pl-4">
                  <p className="text-sm leading-relaxed text-cream/90 italic">
                    &ldquo;{story.note}&rdquo;
                  </p>
                  <footer className="mt-2 text-xs text-muted not-italic">
                    — {story.name.split(" ")[0]}, alumnus
                  </footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>

        <a
          href="#achievements"
          className="mt-8 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
        >
          Board toppers & milestones →
        </a>
      </div>
    </section>
  );
}
