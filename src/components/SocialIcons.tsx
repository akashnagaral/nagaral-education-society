"use client";

import { useId } from "react";
import { site } from "@/lib/site-data";

export function YouTubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#FF0000" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4a4.1 4.1 0 01-1.5-1 4.1 4.1 0 01-1-1.5c-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.2 0-3.5 0-4.8.1-.9 0-1.5.2-1.8.3-.4.2-.7.3-1 .7-.3.3-.5.6-.7 1-.1.3-.3.9-.3 1.8-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c0 .9.2 1.5.3 1.8.2.4.3.7.7 1 .3.3.6.5 1 .7.3.1.9.3 1.8.3 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c.9 0 1.5-.2 1.8-.3.4-.2.7-.3 1-.7.3-.3.5-.6.7-1 .1-.3.3-.9.3-1.8.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c0-.9-.2-1.5-.3-1.8-.2-.4-.3-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.9-.3-1.8-.3-1.3-.1-1.6-.1-4.8-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 1.8a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm6.2-.9a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z"
      />
    </svg>
  );
}

export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#2AABEE" className={className} aria-hidden="true">
      <path d="M11.9 2a10 10 0 100 20 10 10 0 000-20zm4.7 6.8l-1.6 7.5c-.1.5-.4.7-.8.5l-2.3-1.7-1.1 1.1c-.1.1-.3.3-.5.3l.2-2.4 4.3-3.9c.2-.2 0-.3-.3-.1l-5.4 3.4-2.3-.7c-.5-.2-.5-.5.1-.7l9-3.5c.4-.1.8.1.7.7z" />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
};

export function SocialLinks({
  className = "flex flex-wrap items-center gap-3",
  iconClassName = "h-5 w-5",
  showLabels = false,
}: SocialLinksProps) {
  const items = [
    {
      href: site.social.youtube,
      label: "YouTube",
      Icon: YouTubeIcon,
    },
    {
      href: site.social.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
    },
    {
      href: site.social.telegram,
      label: "Telegram",
      Icon: TelegramIcon,
    },
  ] as const;

  return (
    <div className={className}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center gap-2 transition hover:opacity-80"
        >
          <Icon className={iconClassName} />
          {showLabels ? <span className="text-sm text-cream/80">{label}</span> : null}
        </a>
      ))}
    </div>
  );
}
