"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Optional hash id this block should force-show when navigated to */
  hashId?: string;
};

export function Reveal({ children, className = "", hashId }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const show = () => setVisible(true);

    const matchHash = () => {
      if (!hashId) return;
      const hash = window.location.hash.replace(/^#/, "");
      if (hash === hashId || (hashId === "courses" && hash === "coaching")) {
        show();
      }
    };

    matchHash();

    const onClick = (event: MouseEvent) => {
      if (!hashId) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      const hash = href.includes("#") ? href.split("#").pop() : "";
      if (
        hash === hashId ||
        (hashId === "courses" && (hash === "coaching" || hash === "courses"))
      ) {
        window.setTimeout(show, 0);
      }
    };
    document.addEventListener("click", onClick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    window.addEventListener("hashchange", matchHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", matchHash);
      document.removeEventListener("click", onClick);
    };
  }, [hashId]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
