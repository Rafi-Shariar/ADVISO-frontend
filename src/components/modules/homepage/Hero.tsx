"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import PlatformAnalytics from "./Analytics";

interface HeroBannerProps {
  analytics?: {
    totalUsers: number;
    totalMentors: number;
    totalSessionHours: number;
    averageReview: number;
  };
}

const defaultAnalytics = {
  totalUsers: 2,
  totalMentors: 5,
  totalSessionHours: 0,
  averageReview: 0,
};

const mentors = [
  { name: "Alex R.", role: "Staff Eng @ Meta", bg: "bg-orange-500" },
  { name: "Sarah K.", role: "VP of Product", bg: "bg-zinc-800" },
  { name: "Tariq M.", role: "Solutions Architect", bg: "bg-amber-600" },
];

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-main-card", {
        opacity: 0,
        y: 35,
        duration: 0.9,
      })
        .from(
          ".hero-side-card",
          {
            opacity: 0,
            x: 30,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".hero-anim-item",
          {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".analytic-metric-box",
          {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".trend-path",
          {
            strokeDashoffset: 400,
            duration: 1.4,
            ease: "power2.inOut",
          },
          "-=0.4",
        )
        .from(
          ".chart-dot",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.6",
        );

      const counters = gsap.utils.toArray<HTMLElement>(".metric-counter");
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const isFloat = el.getAttribute("data-float") === "true";
        const state = { val: 0 };

        gsap.to(state, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.innerText = isFloat
              ? state.val.toFixed(1)
              : Math.floor(state.val).toString();
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full dark:bg-zinc-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 selection:bg-orange-500/20 selection:text-orange-600"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Main Left Card with Subtle Fluid Gradient */}
          <div className="hero-main-card lg:col-span-8 rounded-[12px] bg-linear-to-br from-white via-orange-500/3 to-amber-500/[0.04] dark:from-zinc-900 dark:via-zinc-900 dark:to-orange-950/20 border border-border/60 p-8 sm:p-12 lg:p-14 flex flex-col justify-between shadow-sm relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-gradient-to-br from-orange-400/15 to-transparent dark:from-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-gradient-to-tr from-amber-400/10 to-transparent dark:from-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Content Top */}
            <div className="relative z-10 space-y-6 max-w-xl">
              <h1 className="hero-anim-item text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Architect your career with{" "}
                <span className="text-orange-600 dark:text-orange-500 underline decoration-orange-500/30 decoration-wavy">
                  Experts
                </span>
                .
              </h1>

              <p className="hero-anim-item text-base sm:text-base text-muted-foreground leading-relaxed font-normal">
                Direct, unvetted consultations with engineering leads, product
                visionaries, and startup founders. Break bottlenecks in
                30-minute tactical sessions.
              </p>

              <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-2">
                <Link href="/mentors">
                  <Button className="h-12 px-7 rounded-[12px] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white font-semibold text-sm transition-all duration-300 shadow-md active:scale-95 flex items-center gap-2">
                    Find your mentor
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="/about-us">
                  <Button
                    variant="outline"
                    className="h-12 px-7 rounded-[12px] border-border hover:bg-muted font-medium text-sm transition-all active:scale-95"
                  >
                    How it works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Analytics Metric Bar */}
            <PlatformAnalytics />
          </div>

          {/* Right Stacked Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            {/* Orange Trajectory Card */}
            <div className="hero-side-card rounded-[12px] bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[310px] shadow-lg shadow-orange-500/20 relative overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <h3 className="text-2xl font-bold tracking-tight leading-snug max-w-[180px]">
                  Book your 1-on-1 strategy call
                </h3>
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-inner">
                  <TrendingUp className="size-3" /> +94%
                </div>
              </div>

              <div className="relative my-4 z-10">
                <svg
                  viewBox="0 0 280 90"
                  fill="none"
                  
                  className="w-full h-20 overflow-visible"
                >
                  <line
                    x1="30"
                    y1="10"
                    x2="30"
                    y2="85"
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="140"
                    y1="10"
                    x2="140"
                    y2="85"
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="250"
                    y1="10"
                    x2="250"
                    y2="85"
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray="3 3"
                  />

                  <path
                    className="trend-path"
                    d="M30 65 L140 45 L250 15"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ strokeDasharray: 400 }}
                  />

                  <circle
                    cx="30"
                    cy="65"
                    r="4.5"
                    fill="#FFFFFF"
                    className="chart-dot"
                  />
                  <circle
                    cx="140"
                    cy="45"
                    r="4.5"
                    fill="#FFFFFF"
                    className="chart-dot"
                  />
                  <circle
                    cx="250"
                    cy="15"
                    r="6"
                    fill="#FFFFFF"
                    className="chart-dot shadow-md"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80 z-10">
                <span>Direct session</span>
                <span className="font-semibold text-white">
                  Guaranteed Takeaways
                </span>
              </div>
            </div>

            {/* Dark Roster Card */}
            <div className="hero-side-card rounded-[12px] bg-zinc-950 dark:bg-zinc-900 border border-zinc-800/80 p-8 sm:p-9 flex flex-col justify-between min-h-[20px] text-white shadow-sm relative overflow-hidden">
              <div>
                <h4 className="text-lg font-bold tracking-tight">
                  Consult with leaders
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Over 500+ verified mentors across engineering, AI & product.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-3 overflow-hidden p-1">
                  {mentors.map((m, idx) => (
                    <div
                      key={idx}
                      className={`size-10 rounded-full ${m.bg} border-2 border-zinc-950 flex items-center justify-center font-bold text-xs text-white shadow-md`}
                      title={`${m.name} - ${m.role}`}
                    >
                      {m.name.charAt(0)}
                    </div>
                  ))}
                  <div className="size-10 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[11px] font-bold text-zinc-300">
                    +500
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-orange-500" /> 100%
                    Vetted
                  </p>
                  <p className="text-[11px] text-zinc-400">FAANG & Unicorns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
