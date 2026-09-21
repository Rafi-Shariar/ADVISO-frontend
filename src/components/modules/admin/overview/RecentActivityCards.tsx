import React from "react";
import {
  Calendar,
  ArrowRight,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

export interface IActivity {
  sessionId: string;
  userName: string;
  userEmail: string;
  mentorName: string;
  sessionDate: string;
  status: string;
  sessionFees: number;
}

export type IRecentActivity = IActivity[];

interface Props {
  recentActivities?: IRecentActivity;
}

const getStatusBadge = (status: string) => {
  const normalized = status?.toUpperCase() || "";

  switch (normalized) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        icon: CheckCircle2,
        className: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        icon: CheckCircle2,
        className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        icon: XCircle,
        className: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      };
    default:
      return {
        label: status || "Pending",
        icon: AlertCircle,
        className: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
  }
};

export const RecentActivityCards = ({ recentActivities = [] }: Props) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-[12px] border border-border/70 bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-orange-500/10 border border-orange-500/20 text-orange-500">
            <Activity className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Live Session Activity
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time platform bookings and mentor engagements
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-muted-foreground bg-muted/40 border border-border/60 px-2.5 py-1 rounded-[6px]">
          {recentActivities.length} Records
        </span>
      </div>

      {/* Activity List */}
      <div className="mt-3 divide-y divide-border/40">
        {recentActivities.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground font-mono">
            No recent activity recorded yet.
          </div>
        ) : (
          recentActivities.map((activity) => {
            const statusConfig = getStatusBadge(activity.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={activity.sessionId}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 transition-colors duration-150 hover:bg-muted/30 -mx-3 px-3 rounded-[8px]"
              >
                {/* User & Mentor details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted border border-border/60 text-xs font-bold font-mono text-foreground">
                    {activity.userName ? activity.userName.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap text-xs">
                      <span className="font-semibold text-foreground truncate">
                        {activity.userName}
                      </span>
                      <ArrowRight className="size-3 text-muted-foreground/60 shrink-0" />
                      <span className="font-medium text-orange-600 dark:text-orange-400 truncate">
                        {activity.mentorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3 text-muted-foreground/60" />
                        {formatDate(activity.sessionDate)}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[150px] sm:max-w-xs">
                        {activity.userEmail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Fees */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pl-11 sm:pl-0 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 rounded-[6px] border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${statusConfig.className}`}
                  >
                    <StatusIcon className="size-3" />
                    {statusConfig.label}
                  </span>

                  <span className="text-sm font-bold font-mono text-foreground">
                    {formatCurrency(activity.sessionFees)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivityCards;