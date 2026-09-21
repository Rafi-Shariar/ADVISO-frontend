import React from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Video,
  ArrowUpRight,
} from "lucide-react";

export interface ISessionsOverview {
  totalSessions: string;
  confirmedSessions: string;
  completedSessions: string;
  cancelledSessions: string;
  totalMentoringHours: string;
}

interface SessionCardsProps {
  sessions?: ISessionsOverview;
}

export const SessionCards = ({ sessions }: SessionCardsProps) => {
  const cards = [
    {
      title: "Total Bookings",
      value: sessions?.totalSessions ?? "0",
      subtext: "Lifetime reservations",
      icon: Video,
      badge: "+12.5%",
      gradient: "from-orange-500/[0.04] via-transparent to-transparent",
      accentBorder: "group-hover:border-orange-500/40",
      iconColor: "text-orange-500/80 group-hover:text-orange-500",
      badgeStyle: "text-orange-500/90 bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "Confirmed",
      value: sessions?.confirmedSessions ?? "0",
      subtext: "Upcoming live sessions",
      icon: CalendarCheck,
      badge: "Active",
      gradient: "from-blue-500/[0.04] via-transparent to-transparent",
      accentBorder: "group-hover:border-blue-500/40",
      iconColor: "text-blue-500/80 group-hover:text-blue-500",
      badgeStyle: "text-blue-500/90 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Completed",
      value: sessions?.completedSessions ?? "0",
      subtext: "Delivered & verified",
      icon: CheckCircle2,
      badge: "98.4%",
      gradient: "from-emerald-500/[0.04] via-transparent to-transparent",
      accentBorder: "group-hover:border-emerald-500/40",
      iconColor: "text-emerald-500/80 group-hover:text-emerald-500",
      badgeStyle: "text-emerald-500/90 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Cancelled",
      value: sessions?.cancelledSessions ?? "0",
      subtext: "Refunded or dropped",
      icon: XCircle,
      badge: "2.1%",
      gradient: "from-rose-500/[0.04] via-transparent to-transparent",
      accentBorder: "group-hover:border-rose-500/40",
      iconColor: "text-rose-500/80 group-hover:text-rose-500",
      badgeStyle: "text-rose-500/90 bg-rose-500/10 border-rose-500/20",
    },
    {
      title: "Mentoring Hours",
      value: `${sessions?.totalMentoringHours ?? "0"}h`,
      subtext: "Total airtime delivered",
      icon: Clock,
      badge: "Tracked",
      gradient: "from-amber-500/[0.04] via-transparent to-transparent",
      accentBorder: "group-hover:border-amber-500/40",
      iconColor: "text-amber-500/80 group-hover:text-amber-500",
      badgeStyle: "text-amber-500/90 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-[12px] border border-border/70 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${card.accentBorder}`}
          >
            {/* Soft Ambient Top Gradient */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${card.gradient}`}
            />

            {/* Top Bar: Subdued Icon Container + Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-[8px] border border-border/60 bg-muted/30 transition-colors duration-200">
                <Icon className={`size-4 stroke-[1.75] transition-colors ${card.iconColor}`} />
              </div>

              <span
                className={`inline-flex items-center rounded-[6px] border px-2 py-0.5 text-[10px] font-medium font-mono ${card.badgeStyle}`}
              >
                {card.badge}
              </span>
            </div>

            {/* Metrics */}
            <div className="relative z-10 mt-5">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
                  {card.value}
                </span>
                <ArrowUpRight className="size-3.5 text-muted-foreground/30 transition-transform duration-200 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <div className="mt-1.5 space-y-0.5">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {card.title}
                </h4>
                <p className="text-[11px] text-muted-foreground/60 truncate">
                  {card.subtext}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SessionCards;