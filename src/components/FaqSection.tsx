"use client";

import { useState } from "react";
import { faqs } from "@/lib/site-data";

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad section-y scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          FAQs
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Common questions
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          Quick answers about admissions, courses, hostels, and results in
          Dharwad.
        </p>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item, index) => {
            const open = openId === index;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : index)}
                >
                  <span className="text-sm font-medium text-cream sm:text-base">
                    {item.q}
                  </span>
                  <span className="mt-0.5 text-gold" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? (
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-cream/75">
                    {item.a}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
