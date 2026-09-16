import FeaturedMentors from "@/components/modules/homepage/FeaturedMentors";
import HelpScopeSection from "@/components/modules/homepage/HelpScopeSection";
import HeroBanner from "@/components/modules/homepage/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <HelpScopeSection />
      <FeaturedMentors />
    </div>
  );
}
