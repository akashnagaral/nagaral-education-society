import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollegePage } from "@/components/CollegePage";
import { colleges } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "NES PU Science College, Alnavar",
  description:
    "NES PU Science College, Alnavar — in collaboration with Nagaral Education Society® since 2024. Focused PU Science with scholarships and modern labs.",
};

export default function NesAlnavarPage() {
  const college = colleges.find((c) => c.id === "nes-alnavar");
  if (!college) notFound();
  return <CollegePage college={college} />;
}
