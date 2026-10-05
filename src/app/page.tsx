import { AboutSection } from "@/components/AboutSection";
import { AffiliatedColleges } from "@/components/AffiliatedColleges";
import { AchievementsSection } from "@/components/AchievementsSection";
import { Contact } from "@/components/Contact";
import { CoursesTabs } from "@/components/CoursesTabs";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { Leadership } from "@/components/Leadership";
import { ResultsHighlight } from "@/components/ResultsHighlight";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <ResultsHighlight />
      <WhyChooseUs />
      <AboutSection />
      <CoursesTabs />
      <AffiliatedColleges />
      <AchievementsSection />
      <Leadership />
      <FaqSection />
      <Contact />
    </>
  );
}
