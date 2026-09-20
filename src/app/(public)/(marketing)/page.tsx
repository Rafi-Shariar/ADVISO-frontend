import BlogSection from "@/components/modules/homepage/BlogsSection";
import FAQSection from "@/components/modules/homepage/FAQSection";
import FeaturedMentors from "@/components/modules/homepage/FeaturedMentors";
import HelpScopeSection from "@/components/modules/homepage/HelpScopeSection";
import HeroBanner from "@/components/modules/homepage/Hero";
import ProblemSolvingSteps from "@/components/modules/homepage/ProblemSolvingSteps";
import ReviewSection from "@/components/modules/review/ReviewSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <HelpScopeSection />
      <FeaturedMentors />
      <ProblemSolvingSteps />
      <ReviewSection />
      <BlogSection />
      <FAQSection />
    </div>
  );
}
