"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Search,
  CalendarCheck,
  Video,
  FileCheck2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    stepNumber: "01",
    side: "left",
    icon: Search,
    title: "Pinpoint your bottleneck",
    tagline: "Discovery",
    description: "Filter verified mentors by exact tech stack and target role.",
    metric: "500+ Mentors",
  },
  {
    stepNumber: "02",
    side: "right",
    icon: CalendarCheck,
    title: "Book slot with upfront agenda",
    tagline: "Scheduling",
    description:
      "Pick a time synced with their calendar and attach your problem brief.",
    metric: "Instant Sync",
  },
  {
    stepNumber: "03",
    side: "left",
    icon: Video,
    title: "1-on-1 tactical deep dive",
    tagline: "Live Execution",
    description:
      "30-min focused session for code audits, system design, or mock loops.",
    metric: "Real Takeaways",
  },
  {
    stepNumber: "04",
    side: "right",
    icon: FileCheck2,
    title: "Execute with crystal clarity",
    tagline: "Action Plan",
    description:
      "Leave with actionable notes and a focused roadmap to remove blockers.",
    metric: "Measurable Impact",
  },
];

export default function ProblemSolvingSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // সেন্টার প্রগ্রেস লাইন: দ্রুত রেসপন্স
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 85%",
            scrub: 0.2, // ফাস্টার রেসপন্স
          },
        });
      }

      // কার্ড এন্ট্রান্স: দ্রুত ট্রিগার (স্ক্রিনের নিচে আসতেই দ্রুত চলে আসবে)
      const cards = gsap.utils.toArray<HTMLElement>(".step-card-box");
      cards.forEach((card) => {
        const isLeft = card.classList.contains("step-left");
        gsap.from(card, {
          x: isLeft ? -25 : 25,
          opacity: 0,
          duration: 0.45, // ফাস্ট ডিউরেশন
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%", // স্ক্রিনে প্রবেশ করার সাথে সাথেই ট্রিগার হবে
            toggleActions: "play none none none",
          },
        });
      });

      // সেন্টার নোডস
      const dots = gsap.utils.toArray<HTMLElement>(".step-center-node");
      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0.5,
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dot,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-[#FBFBFB] dark:bg-zinc-950 selection:bg-orange-500/20 selection:text-orange-600 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            One step to solve your problem
          </h2>
          <p className="text-xs text-muted-foreground">
            A zero-fluff pipeline to take you from stuck to clarity in 48 hours.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Central Progress Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-4 w-[2px] bg-border/40">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-b from-orange-500 via-orange-400 to-amber-500 origin-top scale-y-0"
            />
          </div>

          {/* Compact Steps */}
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              const isLeft = step.side === "left";

              return (
                <div
                  key={step.stepNumber}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center"
                >
                  {/* Small Center Node Indicator */}
                  <div className="step-center-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-7 rounded-[8px] bg-background border border-orange-500 items-center justify-center text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 z-20 shadow-xs">
                    {step.stepNumber}
                  </div>

                  {/* Card Container */}
                  <div className={isLeft ? "md:pr-2" : "md:order-2 md:pl-2"}>
                    <div
                      className={`step-card-box ${
                        isLeft ? "step-left" : "step-right"
                      } rounded-[12px] bg-card border border-border/70 hover:border-orange-500/40 p-4 transition-all duration-200 hover:shadow-xs relative select-none`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase">
                          STEP {step.stepNumber} • {step.tagline}
                        </span>
                        <div className="size-6 rounded-[6px] bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                          <Icon className="size-3.5" />
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-foreground tracking-tight leading-snug mb-1">
                        {step.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground/70">
                        <span>{step.metric}</span>
                        <span className="size-1 rounded-full bg-orange-500" />
                      </div>
                    </div>
                  </div>

                  {/* Empty Counterpart Spacer */}
                  <div
                    className={
                      isLeft
                        ? "hidden md:block md:order-2"
                        : "hidden md:block md:order-1"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <Link href="/mentors">
            <Button
              size="sm"
              className="h-10 px-6 rounded-[12px] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
