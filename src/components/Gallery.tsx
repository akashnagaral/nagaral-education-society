import Image from "next/image";
import { SocialLinks } from "@/components/SocialIcons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { galleryItems, site } from "@/lib/site-data";

export function Gallery() {
  return (
    <section id="gallery" className="section-pad section-y bg-atmosphere scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Campus & community
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-cream sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Campuses and life at Nagaral Education Society® in Dharwad & Alnavar.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {galleryItems.map((item) => (
            <figure key={item.id} className="group relative overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-4 left-4 text-sm text-cream">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 border border-line bg-ink-soft/50 px-6 py-6">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Follow us</p>
          <SocialLinks
            className="flex flex-wrap items-center gap-4"
            iconClassName="h-5 w-5"
            showLabels
          />
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-ink hover:brightness-110"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
