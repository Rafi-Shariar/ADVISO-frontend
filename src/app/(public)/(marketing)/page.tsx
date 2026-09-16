import FAQSection from "@/components/modules/homepage/FAQSection";
import FeaturedMentors from "@/components/modules/homepage/FeaturedMentors";
import HelpScopeSection from "@/components/modules/homepage/HelpScopeSection";
import HeroBanner from "@/components/modules/homepage/Hero";
import ProblemSolvingSteps from "@/components/modules/homepage/ProblemSolvingSteps";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <HelpScopeSection />
      <FeaturedMentors />
      <ProblemSolvingSteps/>
      <FAQSection/>
    </div>
  );
}
