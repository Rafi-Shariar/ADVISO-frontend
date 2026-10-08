"use client";

import React from "react";

import { useUserStats } from "@/hooks/analytics.hook";
import UserOverviewSkeleton from "@/components/modules/dashboard-user/dashbaord-overview/user-overview-skeleton";
import { UserStatsCards } from "@/components/modules/dashboard-user/dashbaord-overview/user-stats-card";
import { UserNextSession } from "@/components/modules/dashboard-user/dashbaord-overview/user-next-session";
import { IUserAnalytic } from "@/types/analytic.type";

const UserPage = () => {
  const { data, isPending } = useUserStats();

  if (isPending) {
    return <UserOverviewSkeleton />;
  }

  const stats: IUserAnalytic = data?.data || {
    totalSessions: 0,
    completedSessions: 0,
    upcomingSessions: 0,
    totalPayment: 0,
    pendingReviews: 0,
    nextSession: null,
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          User Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Monitor your mentorship trajectories, bookings, and platform
          investment.
        </p>
      </div>

      {/* 4 KPI Metrics */}
      <UserStatsCards stats={stats} />

      {/* Next Scheduled Call & Quick Links */}
      <UserNextSession nextSession={stats.nextSession} />
    </div>
  );
};

export default UserPage;
