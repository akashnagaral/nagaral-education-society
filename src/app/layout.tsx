import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyContact } from "@/components/StickyContact";
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

export const metadata: Metadata = {
  title: {
    default: "Nagaral Education Society®️ | Quality PU Science Education",
    template: "%s | Nagaral Education Society",
  },
  description:
    "Nagaral Education Society®️ in Dharwad — NTSS PU College & NES Alnavar. PUC Science with NEET, CET, JEE & NDA coaching. Admissions open.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyContact />
      </body>
    </html>
  );
}
