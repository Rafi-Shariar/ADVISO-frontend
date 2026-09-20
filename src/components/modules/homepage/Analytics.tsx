"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePublicStats } from "@/hooks/analytics.hook";

interface AnalyticsProps {
  analytics?: {
    totalUsers?: number;
    totalMentors?: number;
    totalSessionHours?: number;
    averageReview?: number;
  };
}

export const PlatformAnalytics = ({ analytics }: AnalyticsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = usePublicStats();

  const stats = [
    {
      id: 1,
      label: "Active Members",
      value: data?.data.totalUsers ?? data?.data.totalUsers ?? 100,
      suffix: "+",
      code: "ACT_MEM",
      isFloat: false,
    },
    {
      id: 2,
      label: "Verified Mentors",
      value: data?.data.totalMentors ?? data?.data.totalMentors ?? 60,
      suffix: "+",
      code: "EXP_VET",
      isFloat: false,
    },
    {
      id: 3,
      label: "Session Hours",
      value:
        data?.data.totalSessionHours ?? data?.data.totalSessionHours ?? 133,
      suffix: "h",
      code: "ENG_TIME",
      isFloat: false,
    },
    {
      id: 4,
      label: "Satisfaction Score",
      value: data?.data.averageReview ?? data?.data.averageReview ?? 0.0,
      suffix: "/5.0",
      code: "AVG_SAT",
      isFloat: true,
    },
  ];

  useGSAP(
    () => {
      if (isLoading) return;

      const numbers = gsap.utils.toArray<HTMLElement>(".metric-counter");
      numbers.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const isFloat = el.getAttribute("data-float") === "true";
        const state = { val: 0 };

        gsap.to(state, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.innerText = isFloat
              ? state.val.toFixed(1)
              : Math.floor(state.val).toString();
          },
        });
      });
    },
    { scope: containerRef, dependencies: [data, isLoading] },
  );

  return (
    <div ref={containerRef} className="mt-8 relative z-10 select-none">
      <div className="rounded-[12px] bg-zinc-500/[0.04] dark:bg-white/[0.02] border border-border/40 backdrop-blur-xl p-5 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border/40">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`analytic-metric-box group flex flex-col justify-between ${
                idx === 0
                  ? "md:pr-6"
                  : idx === stats.length - 1
                    ? "md:pl-6"
                    : "md:px-6"
              }`}
            >
              {/* Micro Status Label */}

              {/* Counter / Value */}
              {isLoading ? (
                <div className="h-8 w-20 bg-muted/40 animate-pulse rounded-md my-1" />
              ) : (
                <div className="flex items-baseline gap-0.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
                  <span
                    className="metric-counter"
                    data-target={stat.value}
                    data-float={stat.isFloat ? "true" : "false"}
                  >
                    0
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {stat.suffix}
                  </span>
                </div>
              )}

              {/* Metric Label */}
              <p className="mt-1 text-xs font-medium text-muted-foreground tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
