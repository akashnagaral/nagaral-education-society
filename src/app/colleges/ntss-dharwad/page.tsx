import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollegePage } from "@/components/CollegePage";
import { colleges } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "NTSS PU College, Dharwad",
  description:
    "NTSS PU College, Dharwad — in collaboration with Nagaral Education Society® since 2024. PUC with NEET, JEE, CET & NDA coaching.",
};

export default function NtssDharwadPage() {
  const college = colleges.find((c) => c.id === "ntss-dharwad");
  if (!college) notFound();
  return <CollegePage college={college} />;
}
