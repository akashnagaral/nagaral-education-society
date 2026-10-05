import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollegePage } from "@/components/CollegePage";
import { colleges } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "NTSS PU College, Dharwad",
  description:
    "NTSS PU College, Dharwad — one of Dharwad’s focused PU Science colleges in collaboration with Nagaral Education Society®. PUC Science, NEET, JEE, CET & NDA coaching. Admissions open.",
  alternates: { canonical: "/colleges/ntss-dharwad" },
};

export default function NtssDharwadPage() {
  const college = colleges.find((c) => c.id === "ntss-dharwad");
  if (!college) notFound();
  return <CollegePage college={college} />;
}
