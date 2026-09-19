"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Target,
  Users,
  Award,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// তিনটি লোকাল ইমেজ ইমপোর্ট (প্রয়োজনমতো আপনার ইমেজ ফাইলের এক্সটেনশন মিলিয়ে নিবেন)
import AboutHero from "@/assets/aboutus/aboutus-2.jpg";
import AboutMission from "@/assets/aboutus/aboutus-3.jpg";
import AboutCommunity from "@/assets/aboutus/aboutus-1.jpg";

const coreValues = [
  {
    id: 1,
    icon: Target,
    title: "Actionable Mentorship",
    description:
      "Real-world strategies and roadmap-based reviews instead of generic advice.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Vetted Industry Leaders",
    description:
      "Every advisor goes through rigorous professional verification before taking sessions.",
  },
  {
    id: 3,
    icon: Award,
    title: "Outcome Driven",
    description:
      "Focused on measurable career shifts, interview breakthroughs, and growth metrics.",
  },
  {
    id: 4,
    icon: Users,
    title: "Community Synergy",
    description:
      "A collaborative ecosystem connecting ambitious talent with experienced veterans.",
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
      {/* ১. Hero Section */}
      <section className="space-y-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          Empowering <span className="text-orange-500">Ambition</span> Through Dedicated <span className="text-orange-500">Guidance.</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ADVISO is built to bridge the experience gap between aspiring
          professionals and senior industry pioneers. We provide direct access
          to high-impact 1-on-1 mentorship, career steering, and practical
          industry insights.
        </p>

        {/* Hero Image */}
        <div className="relative w-full h-[280px] sm:h-[450px] rounded-[12px] overflow-hidden border border-border/70 shadow-sm mt-8">
          <Image
            src={AboutHero}
            alt="ADVISO Mentorship Experience"
            fill
            priority
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </section>

      {/* ২. Mission & Vision Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-4 order-2 lg:order-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-500 uppercase tracking-wider font-semibold">
            <span>Our Mission</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
            Democratizing Access to Seasoned Domain Experts
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Finding genuine, constructive career steering shouldn’t depend on
            luck or exclusive networks. We believe everyone deserves
            personalized feedback from individuals who have already navigated
            the challenges they currently face.
          </p>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Whether preparing for high-stakes interviews, scaling architecture,
            or transitioning leadership tracks, our verified mentors offer
            tailored frameworks to accelerate your progress.
          </p>

          <div className="pt-2">
            <Link href="/mentors">
              <Button className="rounded-[12px] bg-orange-500 hover:bg-orange-600 text-white gap-2 text-xs">
                <span>Explore Advisors</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mission Image */}
        <div className="relative w-full h-[260px] sm:h-[380px] rounded-[12px] overflow-hidden border border-border/70 shadow-sm order-1 lg:order-2">
          <Image
            src={AboutMission}
            alt="Our Mission and Strategy"
            fill
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </section>

      {/* ৩. Core Pillars Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Built on Clear Principles
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            What drives our product architecture and community culture every
            day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.id}
                className="rounded-[12px] border-border/70 bg-card hover:border-orange-500/50 transition-colors shadow-none"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="size-10 rounded-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center border border-orange-500/20">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ৪. Community & Bottom CTA Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-[12px] border border-border/70 bg-muted/20 p-6 sm:p-10">
        {/* Community Image */}
        <div className="relative w-full h-[260px] sm:h-[340px] rounded-[12px] overflow-hidden border border-border/60 shadow-sm">
          <Image
            src={AboutCommunity}
            alt="ADVISO Mentor Community"
            fill
            placeholder="blur"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <Badge
            variant="outline"
            className="rounded-[8px] border-border/80 text-muted-foreground font-mono text-[11px]"
          >
            JOIN OUR ROSTER
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
            Are You an Experienced Professional?
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Give back to the next wave of engineers, designers, and founders.
            Set your own availability, share your specialized knowledge, and
            build a lasting personal mentorship brand on ADVISO.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button className="rounded-[12px] bg-orange-500 hover:bg-orange-600 text-white text-xs">
                Apply as a Mentor
              </Button>
            </Link>

            <Link href="/blogs">
              <Button
                variant="outline"
                className="rounded-[12px] border-border/80 text-xs"
              >
                Read Mentor Blogs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
