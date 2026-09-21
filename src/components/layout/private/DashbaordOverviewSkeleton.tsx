import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardOverviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Header / Greeting Strip Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 sm:w-64 rounded-[8px]" />
          <Skeleton className="h-4 w-72 sm:w-96 rounded-[6px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-[8px]" />
          <Skeleton className="h-9 w-9 rounded-[8px]" />
        </div>
      </div>

      {/* 2. Top Metric Cards Row (Universal 4-card or 5-card responsive layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-[12px] border border-border/70 bg-card/60 p-5 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="size-9 rounded-[8px]" />
              <Skeleton className="h-4 w-12 rounded-[6px]" />
            </div>
            <div className="space-y-2 pt-1">
              <Skeleton className="h-7 w-20 rounded-[6px]" />
              <Skeleton className="h-3 w-28 rounded-[4px]" />
              <Skeleton className="h-2.5 w-20 rounded-[4px]" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Middle Tier: Primary Ledger / Comparative Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Highlight Metric Card */}
        <div className="lg:col-span-5 rounded-[12px] border border-border/70 bg-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-2.5 rounded-full" />
              <Skeleton className="h-3.5 w-36 rounded-[4px]" />
            </div>
            <Skeleton className="h-10 w-44 rounded-[8px] mt-2" />
          </div>
          <div className="pt-6 border-t border-border/40 flex items-center justify-between">
            <Skeleton className="h-3.5 w-32 rounded-[4px]" />
            <Skeleton className="h-3.5 w-20 rounded-[4px]" />
          </div>
        </div>

        {/* Right Side: Comparative / Analytical Breakdown */}
        <div className="lg:col-span-7 rounded-[12px] border border-border/70 bg-card p-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <Skeleton className="h-4 w-48 rounded-[6px]" />
            <Skeleton className="h-3.5 w-24 rounded-[4px]" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="rounded-[8px] bg-muted/20 border border-border/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20 rounded-[4px]" />
                <Skeleton className="h-3 w-10 rounded-[4px]" />
              </div>
              <Skeleton className="h-6 w-24 rounded-[6px]" />
              <Skeleton className="h-2.5 w-32 rounded-[4px]" />
            </div>
            <div className="rounded-[8px] bg-muted/20 border border-border/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24 rounded-[4px]" />
                <Skeleton className="h-3 w-10 rounded-[4px]" />
              </div>
              <Skeleton className="h-6 w-24 rounded-[6px]" />
              <Skeleton className="h-2.5 w-36 rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lower Tier: Community Breakdown & Sentiment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Segmented Population Skeleton */}
        <div className="rounded-[12px] border border-border/70 bg-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-36 rounded-[6px]" />
              <Skeleton className="h-3 w-56 rounded-[4px]" />
            </div>
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16 rounded-[4px]" />
                <Skeleton className="h-7 w-12 rounded-[6px]" />
                <Skeleton className="h-2.5 w-20 rounded-[4px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Feedback / Quality Panel Skeleton */}
        <div className="rounded-[12px] border border-border/70 bg-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-40 rounded-[6px]" />
              <Skeleton className="h-3 w-60 rounded-[4px]" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="rounded-[8px] bg-muted/20 border border-border/50 p-4 space-y-2">
              <Skeleton className="h-8 w-16 rounded-[6px]" />
              <Skeleton className="h-3 w-28 rounded-[4px]" />
            </div>
            <div className="rounded-[8px] bg-muted/20 border border-border/50 p-4 space-y-2">
              <Skeleton className="h-8 w-14 rounded-[6px]" />
              <Skeleton className="h-3 w-32 rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Tier: Feed / List Activity Skeleton */}
      <div className="rounded-[12px] border border-border/70 bg-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-9 rounded-[8px]" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-44 rounded-[6px]" />
              <Skeleton className="h-3 w-64 rounded-[4px]" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-[6px]" />
        </div>

        <div className="space-y-3 pt-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 py-3 border-b border-border/30 last:border-0"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-40 sm:w-56 rounded-[4px]" />
                  <Skeleton className="h-2.5 w-28 sm:w-40 rounded-[4px]" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-20 rounded-[6px]" />
                <Skeleton className="h-4 w-12 rounded-[4px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewSkeleton;
