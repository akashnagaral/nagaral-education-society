import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollegePage } from "@/components/CollegePage";
import { colleges } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "NES PU Science College Alnavar | Best PU Science in Dharwad Region",
  description:
    "NES PU Science College, Alnavar — focused PU Science college near Dharwad in collaboration with Nagaral Education Society®. Scholarships, labs, 100% II PU results. Admissions open.",
  alternates: { canonical: "/colleges/nes-alnavar" },
};

export default function NesAlnavarPage() {
  const college = colleges.find((c) => c.id === "nes-alnavar");
  if (!college) notFound();
  return <CollegePage college={college} />;
}
