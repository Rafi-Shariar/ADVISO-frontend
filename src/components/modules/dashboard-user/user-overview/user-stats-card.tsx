import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MessageSquareWarning,
} from "lucide-react";
import { IUserAnalytic } from "@/types/analytic.type";

interface UserStatsCardsProps {
  stats: IUserAnalytic;
}

export function UserStatsCards({ stats }: UserStatsCardsProps) {
  const cards = [
    {
      title: "Upcoming Sessions",
      value: stats.upcomingSessions,
      icon: Clock3,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "Completed Sessions",
      value: stats.completedSessions,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Total Investment",
      value: `$${stats.totalPayment}`,
      icon: CreditCard,
      color: "text-zinc-900 dark:text-zinc-100",
      bg: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200/80 dark:border-zinc-700/80",
    },
    {
      title: "Pending Feedback",
      value: stats.pendingReviews,
      icon: MessageSquareWarning,
      color:
        stats.pendingReviews > 0
          ? "text-amber-600 dark:text-amber-400"
          : "text-zinc-400",
      bg:
        stats.pendingReviews > 0
          ? "bg-amber-500/10 border-amber-500/20"
          : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200/80 dark:border-zinc-700/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="p-5 rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-2xs space-y-3 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">
                {card.title}
              </span>
              <div className={`p-2 rounded-[12px] border ${card.bg}`}>
                <Icon className={`size-4 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
