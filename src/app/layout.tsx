import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { Chatbot } from "@/components/Chatbot";
import { FollowUsRail } from "@/components/FollowUsRail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyContact } from "@/components/StickyContact";
import { themeInitScript } from "@/lib/theme";
import { site } from "@/lib/site-data";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = "https://nagaral.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nagaral Education Society® | PU Science · Dharwad",
    template: "%s | Nagaral Education Society",
  },
  description:
    "Looking for the best PU college / best PU Science college in Dharwad? Nagaral Education Society® collaborates with NTSS PU College, Dharwad and NES PU Science College, Alnavar — PUC Science, NEET, CET, JEE & NDA coaching. 100% II PU results 2025–2026. Admissions open.",
  keywords: [
    "Nagaral Education Society",
    "best PU college in Dharwad",
    "best PU Science college Dharwad",
    "best college in Dharwad",
    "PUC Science Dharwad",
    "NTSS PU College Dharwad",
    "NES PU Science College Alnavar",
    "NEET coaching Dharwad",
    "JEE CET NDA coaching Dharwad",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
    title: "Nagaral Education Society® | PU Science Colleges in Dharwad",
    description:
      "Focused PU Science in Dharwad with NTSS & NES Alnavar — 100% II PU board results, NEET · CET · JEE · NDA coaching. Admissions open.",
    images: [
      {
        url: "/images/hero-students.png",
        width: 1200,
        height: 630,
        alt: "Nagaral Education Society — PU Science colleges in Dharwad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagaral Education Society® | PU Science Colleges in Dharwad",
    description:
      "NTSS Dharwad & NES Alnavar — PUC Science with NEET, CET, JEE & NDA coaching. Admissions open.",
    images: ["/images/hero-students.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Nagaral Education Society",
  alternateName: "NES",
  url: siteUrl,
  logo: `${siteUrl}/images/nes-logo.png`,
  description:
    "Nagaral Education Society® — focused PU Science education in Dharwad through collaboration with NTSS PU College and NES PU Science College, Alnavar.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dharwad",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  telephone: "+919019939321",
  email: site.email,
  areaServed: "Dharwad",
  sameAs: [site.social.youtube, site.social.instagram, site.social.telegram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FollowUsRail />
        <StickyContact />
        <Chatbot />
      </body>
    </html>
  );
}
