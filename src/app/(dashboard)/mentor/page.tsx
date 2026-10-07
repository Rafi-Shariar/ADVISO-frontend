"use client";

import { Sparkles, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMentorStats } from "@/hooks/analytics.hook";
import { MentorStatsSkeleton } from "@/components/modules/dashbaord-mentor/mentor-overview/mentor-stats-skeleton";
import { StatsMetricGrid } from "@/components/modules/dashbaord-mentor/mentor-overview/mentor-stats-matrix-grid";
import { NextSessionCard } from "@/components/modules/dashbaord-mentor/mentor-overview/mentor-next-session-card";
import { SessionsBreakdownCard } from "@/components/modules/dashbaord-mentor/mentor-overview/mentor-session-breakdown";

const MentorPage = () => {
  const { data, isPending } = useMentorStats();
  const stats = data?.data;

  if (isPending) {
    return <MentorStatsSkeleton />;
  }

  const defaultStats = {
    totalSessions: stats?.totalSessions ?? 0,
    completedSessions: stats?.completedSessions ?? 0,
    upcomingSessions: stats?.upcomingSessions ?? 0,
    totalMentoringHours: stats?.totalMentoringHours ?? 0,
    totalEarnings: stats?.totalEarnings ?? 0,
    averageRating: stats?.averageRating ?? 0,
    totalReviews: stats?.totalReviews ?? 0,
    nextSession: stats?.nextSession ?? null,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 🌟 1. Welcome & Quick Action Header Banner */}
      <div className="relative overflow-hidden rounded-[12px] border border-border/70 bg-gradient-to-r from-card via-card to-orange-500/5 p-6 sm:p-7 shadow-2xs">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 border border-orange-500/20">
              <Sparkles className="size-3" /> Mentor Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Dashboard Overview
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Monitor your session fulfillment, engagement hours, ratings, and
              active payouts.
            </p>
          </div>

          <Button
            asChild
            className="rounded-[12px] bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 text-xs sm:text-sm self-start sm:self-auto gap-2"
          >
            <Link href="/mentor/schedules">
              <CalendarPlus className="size-4" />
              <span>Create Slot</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 📊 2. High-Impact 4-Metric Grid */}
      <StatsMetricGrid stats={defaultStats} />

      {/* 🍱 3. Two-Column Modular Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <NextSessionCard nextSession={defaultStats.nextSession} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <SessionsBreakdownCard
            completedSessions={defaultStats.completedSessions}
            upcomingSessions={defaultStats.upcomingSessions}
            totalSessions={defaultStats.totalSessions}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
