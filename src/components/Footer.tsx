import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialIcons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { colleges, site } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="section-pad mx-auto grid max-w-6xl gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/nes-logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain opacity-80"
            />
            <p className="font-[family-name:var(--font-display)] text-xl text-cream">
              {site.name}
              <sup className="ml-0.5 text-sm text-gold">®</sup>
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Based in Dharwad since {site.founded}. PUC Science
            with NEET, CET, JEE & NDA coaching — scholarships and focused teaching.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {colleges.map((college) => (
              <li key={college.id}>
                <Link href={college.slug} className="hover:text-gold">
                  {college.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/careers" className="hover:text-gold">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a href={site.emailHref} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold"
                aria-label="WhatsApp"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-ink">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </span>
                {site.phone}
              </a>
            </li>
            <li>
              <SocialLinks className="flex flex-wrap items-center gap-3" iconClassName="h-4 w-4" />
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="section-pad py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}®. All rights reserved.
      </p>
    </footer>
  );
}
