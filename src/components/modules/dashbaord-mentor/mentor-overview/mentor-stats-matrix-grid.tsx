import { DollarSign, Video, Clock, Star } from "lucide-react";

interface StatsMetricGridProps {
  stats: {
    totalEarnings: number;
    totalSessions: number;
    totalMentoringHours: number;
    averageRating: number;
    totalReviews: number;
  };
}

export const StatsMetricGrid = ({ stats }: StatsMetricGridProps) => {
  const metrics = [
    {
      label: "Total Revenue",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      subtext: "Gross mentorship earnings",
      icon: DollarSign,
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      borderAccent: "hover:border-emerald-500/40",
    },
    {
      label: "Total Sessions",
      value: stats.totalSessions,
      subtext: "All-time client appointments",
      icon: Video,
      iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      borderAccent: "hover:border-orange-500/40",
    },
    {
      label: "Mentoring Time",
      value: `${stats.totalMentoringHours}h`,
      subtext: "Total active call duration",
      icon: Clock,
      iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      borderAccent: "hover:border-sky-500/40",
    },
    {
      label: "Client Rating",
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "N/A",
      subtext: `From ${stats.totalReviews} verified feedback`,
      icon: Star,
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      borderAccent: "hover:border-amber-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`group p-5 rounded-[12px] bg-card border border-border/70 shadow-2xs hover:shadow-xs transition-all duration-200 ${item.borderAccent}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
              <div
                className={`size-9 rounded-[12px] flex items-center justify-center ${item.iconBg} transition-transform group-hover:scale-105`}
              >
                <Icon className="size-4" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                {item.value}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {item.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
