"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Sparkles, 
  Compass, 
  Rocket, 
  CheckCircle2, 
  Layers 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ডোমেন এনামের সাথে সম্পর্কিত স্ট্যাটিক ফিল্টার ট্যাগ
const popularDomains = [
  { label: "Software Engineering", key: "SOFTWARE_ENGINEERING" },
  { label: "Product Management", key: "PRODUCT_MANAGEMENT" },
  { label: "UI/UX Design", key: "UI_UX_DESIGN" },
  { label: "Data Science & AI", key: "DATA_SCIENCE_AND_AI" },
  { label: "Career & Job Search", key: "CAREER_AND_JOB_SEARCH" },
  { label: "Legal Advice", key: "LEGAL_ADVICE" },
  { label: "Real Estate", key: "REAL_ESTATE_AND_INVESTING" },
  { label: "Sales & BizDev", key: "SALES_AND_BUSINESS_DEVELOPMENT" },
];

const helpCards = [
  {
    badge: "Career Advice",
    title: "Break through career plateaus & land target offers",
    description:
      "Audit your positioning, negotiate high-impact compensation, and prepare for rigorous interview loops with verified leaders.",
    cardBg: "bg-[#F3F0FA] dark:bg-purple-950/20",
    accentColor: "text-purple-600 dark:text-purple-400",
    linkText: "Explore Career Mentors",
    href: "/mentors?domain=CAREER_AND_JOB_SEARCH",
    visual: {
      noteTitle: "Where do I go from here?",
      noteSubtitle: "Strategic Career Roadmap",
      pillText: "Clear actionable step",
      avatarInitials: "CA",
      avatarBg: "bg-purple-600",
    },
  },
  {
    badge: "Global Migration",
    title: "Relocate abroad & crack international admissions",
    description:
      "Get authentic guidance on visa sponsorship routes, university admissions, and international job market navigation from those who did it.",
    cardBg: "bg-[#EBF5EE] dark:bg-emerald-950/20",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    linkText: "Find Relocation Mentors",
    href: "/mentors?domain=HIGHER_EDUCATION_AND_ADMISSIONS",
    visual: {
      noteTitle: "Global Relocation Plan",
      noteSubtitle: "Sponsorship & Study Routes",
      pillText: "Verified abroad experience",
      avatarInitials: "GM",
      avatarBg: "bg-emerald-600",
    },
  },
  {
    badge: "Growth Marketing",
    title: "Scale customer acquisition & performance funnels",
    description:
      "Fine-tune your go-to-market engine, paid campaigns, organic brand building, and conversion optimization with seasoned growth leads.",
    cardBg: "bg-[#F9F3EB] dark:bg-amber-950/20",
    accentColor: "text-amber-600 dark:text-amber-400",
    linkText: "Connect with Marketers",
    href: "/mentors?domain=DIGITAL_MARKETING",
    visual: {
      noteTitle: "Full Funnel Strategy",
      noteSubtitle: "Paid CAC & Retention Audit",
      pillText: "Data-backed growth",
      avatarInitials: "MK",
      avatarBg: "bg-amber-600",
    },
  },
];

export default function HelpScopeSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background selection:bg-orange-500/20 selection:text-orange-600">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
         
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            What do you want help with?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal">
            You don't need to have every answer right now. Pick an intent to kick off your trajectory.
          </p>
        </div>

        {/* 3 Interactive Solution Pods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {helpCards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-[12px] ${card.cardBg} border border-border/40 p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Card Header & Texts */}
              <div className="space-y-4">

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Graphic Layer: Overlapping Notes (Reference 2 Style) */}
              <div className="relative my-10 py-6">
                {/* Main Note Card */}
                <div className="w-[88%] rounded-[12px] bg-white dark:bg-zinc-900 border border-border/60 p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Strategy Memo
                    </span>
                    <div className={`size-6 rounded-full ${card.visual.avatarBg} text-white font-bold text-[10px] flex items-center justify-center`}>
                      {card.visual.avatarInitials}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    "{card.visual.noteTitle}"
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {card.visual.noteSubtitle}
                  </p>
                </div>

                {/* Overlapping Floating Pill */}
                <div className="absolute right-2 bottom-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-white dark:bg-zinc-800 border border-border/70 shadow-md">
                  <CheckCircle2 className="size-3.5 text-orange-500" />
                  <span className="text-[11px] font-medium text-foreground">
                    {card.visual.pillText}
                  </span>
                </div>
              </div>

              {/* Card Bottom CTA Link */}
              <div className="pt-2 border-t border-border/30">
                <Link
                  href={card.href}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <span>{card.linkText}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Domain Pills Row (Enum Based) */}
        <div className=" flex flex-col items-center gap-4">
        
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-7xl">
            {popularDomains.map((domain) => (
              <Link
                key={domain.key}
                href={`/mentors?domain=${domain.key}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[12px] text-xs font-normal border-border/70 hover:border-orange-500/50 hover:bg-orange-500/5 transition-colors"
                >
                  {domain.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}