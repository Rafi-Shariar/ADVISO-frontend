/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  BriefcaseBusiness,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PROFILE_IMG =
  "https://res.cloudinary.com/ps64ygxj/image/upload/v1785322858/zaov3mdclr3soa9opakt.jpg";

export interface MentorData {
  mentorId: string;
  headline: string;
  bio: string;
  yearOfExperience: number;
  expertiseTags: string[];
  linkedinURL: string;
  professionalDomain: string;
  sessionCharge: string;
  averageRatings: string;
  totalReviews: number;
  user: {
    name: string;
    profileURL: string;
  };
}

const mockMentors: MentorData[] = [
  {
    mentorId: "1",
    headline: "Lead Architect & Cloud Consultant",
    bio: "10+ years architecting fault-tolerant cloud infrastructures on AWS and GCP.",
    yearOfExperience: 10,
    expertiseTags: ["AWS", "System Design", "Microservices"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Software Engineering",
    sessionCharge: "50",
    averageRatings: "4.95",
    totalReviews: 42,
    user: { name: "Tahmid Rahman", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "2",
    headline: "Principal Product Manager @ FinTech",
    bio: "Ex-Stripe PM helping early and mid-level product managers crack product sense.",
    yearOfExperience: 8,
    expertiseTags: ["Product Sense", "Roadmapping", "Growth"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Product Management",
    sessionCharge: "65",
    averageRatings: "5.00",
    totalReviews: 31,
    user: { name: "Sabrina Hossain", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "3",
    headline: "Staff Frontend Engineer & Systems",
    bio: "Specialized in scalable Next.js architectures and design systems.",
    yearOfExperience: 9,
    expertiseTags: ["Next.js", "TypeScript", "Performance"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Software Engineering",
    sessionCharge: "55",
    averageRatings: "4.92",
    totalReviews: 54,
    user: { name: "Zubair Al Mahmud", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "4",
    headline: "Senior UX Designer & Strategist",
    bio: "Portfolio reviews and design interview readiness for global agencies.",
    yearOfExperience: 6,
    expertiseTags: ["Figma", "UX Research", "Prototyping"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "UI/UX Design",
    sessionCharge: "40",
    averageRatings: "4.88",
    totalReviews: 24,
    user: { name: "Ayesha Anika", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "5",
    headline: "AI Research Scientist & MLOps Lead",
    bio: "Guiding ML practitioners from model exploration to production LLMs.",
    yearOfExperience: 7,
    expertiseTags: ["LLMs", "PyTorch", "MLOps"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Data Science & AI",
    sessionCharge: "70",
    averageRatings: "4.98",
    totalReviews: 29,
    user: { name: "Dr. Farhan Tanvir", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "6",
    headline: "VP of Growth & Performance Marketing",
    bio: "Helping startups build high-efficiency performance marketing channels.",
    yearOfExperience: 11,
    expertiseTags: ["Paid Ads", "SEO", "Attribution"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Digital Marketing",
    sessionCharge: "60",
    averageRatings: "4.90",
    totalReviews: 44,
    user: { name: "Nabila Karim", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "7",
    headline: "Head of Talent & Tech Recruiter",
    bio: "Resume positioning and compensation negotiation tactics.",
    yearOfExperience: 8,
    expertiseTags: ["Hiring", "Resume Audit", "Negotiation"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Career & Job Search",
    sessionCharge: "45",
    averageRatings: "4.97",
    totalReviews: 68,
    user: { name: "Kamrul Hasan", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "8",
    headline: "Senior Engineering Manager",
    bio: "Mentoring engineers navigating management tracks and high-impact OKRs.",
    yearOfExperience: 12,
    expertiseTags: ["Leadership", "Strategy", "1-on-1s"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Leadership & Management",
    sessionCharge: "75",
    averageRatings: "4.94",
    totalReviews: 36,
    user: { name: "Sajid Imtiaz", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "9",
    headline: "Immigration Advisor & Admissions",
    bio: "Guiding students and professionals on grad admissions and EU visas.",
    yearOfExperience: 6,
    expertiseTags: ["Scholarships", "SOP Review", "EU Visas"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Higher Education",
    sessionCharge: "35",
    averageRatings: "4.89",
    totalReviews: 50,
    user: { name: "Tasneem Ahmed", profileURL: PROFILE_IMG },
  },
  {
    mentorId: "10",
    headline: "Cybersecurity Lead & SecOps",
    bio: "Advising engineers on cloud compliance and defensive security architecture.",
    yearOfExperience: 9,
    expertiseTags: ["AppSec", "Cloud Security", "Penetration"],
    linkedinURL: "https://linkedin.com",
    professionalDomain: "Cybersecurity",
    sessionCharge: "60",
    averageRatings: "4.96",
    totalReviews: 28,
    user: { name: "Mahir Faysal", profileURL: PROFILE_IMG },
  },
];

export default function FeaturedMentors() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // এক কার্ডের সাইজ অনুযায়ী স্ক্রোল দূরত্ব (280px কার্ড + 16px গ্যাপ)
    const scrollAmount = 296;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }, []);

  // প্রতি ২.৫ সেকেন্ড পরপর অটো-স্লাইড (ইউজার হোভার করলে পজ থাকবে)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, scroll]);

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background selection:bg-orange-500/20 selection:text-orange-600">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border/40 pb-5">
          <div className="space-y-2 ">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Experts are here to guide
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Book tactical 1-on-1 strategy calls with verified mentors
              currently working in top-tier companies.
            </p>
          </div>

          {/* Left / Right Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="size-9 rounded-[12px] border-border/70 hover:bg-muted active:scale-95 transition-all"
              aria-label="Previous mentor"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="size-9 rounded-[12px] border-border/70 hover:bg-muted active:scale-95 transition-all"
              aria-label="Next mentor"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Carousel (Single Line Row) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {mockMentors.map((mentor) => (
            <Link
              key={mentor.mentorId}
              href={`/mentors/${mentor.mentorId}`}
              className="group shrink-0 w-[240px] sm:w-[250px] snap-start rounded-[12px] bg-card border border-border/60 hover:border-orange-500/50 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 select-none"
            >
              <div>
                {/* Balanced Compact Portrait Image */}
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden bg-muted mb-3 border border-border/40">
                  <Image
                    src={mentor.user.profileURL}
                    alt={mentor.user.name}
                    fill
                    sizes="250px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Rating Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-md text-white px-2 py-0.5 rounded-[8px] text-[11px] font-semibold flex items-center gap-1 border border-white/10 shadow-sm">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span>{mentor.averageRatings}</span>
                    <span className="text-[10px] text-white/70">
                      ({mentor.totalReviews})
                    </span>
                  </div>
                </div>

                {/* Mentor Info */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground truncate group-hover:text-orange-500 transition-colors">
                    {mentor.user.name}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-1 leading-snug">
                    {mentor.headline}
                  </p>
                </div>
              </div>

              {/* Clean Meta Strip: Exp & Professional Domain */}
              <div className="pt-2.5 mt-3 border-t border-border/40 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-orange-500" />
                    {mentor.yearOfExperience}y exp
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/80 truncate">
                  <BriefcaseBusiness className="size-3.5 text-orange-500 shrink-0" />
                  <span className="truncate">{mentor.professionalDomain}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center pt-2">
          <Link href="/mentors">
            <Button
              size="lg"
              className="h-11 px-8 rounded-[12px] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95 flex items-center gap-2"
            >
              <span>Find your mentor</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
