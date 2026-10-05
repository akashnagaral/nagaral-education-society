"use client";

import { usePathname } from "next/navigation";
import { InstagramIcon, TelegramIcon, YouTubeIcon } from "@/components/SocialIcons";
import { site } from "@/lib/site-data";

const items = [
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.telegram, label: "Telegram", Icon: TelegramIcon },
] as const;

export function FollowUsRail() {
  const pathname = usePathname();

  if (pathname.startsWith("/portal") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <aside
      className="fixed left-0 top-1/2 z-[55] flex -translate-y-1/2 flex-col items-center border border-l-0 border-line bg-ink/95 shadow-[4px_0_24px_rgba(0,0,0,0.2)] backdrop-blur-md"
      aria-label="Follow us on social media"
    >
      <p
        className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Follow us
      </p>
      <div className="flex flex-col items-center gap-3 border-t border-line px-2.5 py-3">
        {items.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="transition hover:scale-110 hover:opacity-90"
            title={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </aside>
  );
}
