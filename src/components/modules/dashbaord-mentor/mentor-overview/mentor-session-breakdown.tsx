import { CheckCircle2, CalendarRange, Clock } from "lucide-react";

interface SessionsBreakdownCardProps {
  completedSessions: number;
  upcomingSessions: number;
  totalSessions: number;
}

export const SessionsBreakdownCard = ({
  completedSessions,
  upcomingSessions,
  totalSessions,
}: SessionsBreakdownCardProps) => {
  const completionRate =
    totalSessions > 0
      ? Math.round((completedSessions / totalSessions) * 100)
      : 100;

  return (
    <div className="rounded-[12px] border border-border/70 bg-card p-6 shadow-2xs space-y-5 flex flex-col justify-between">
      <div className="space-y-1">
        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Delivery Progress
        </h4>
        <p className="text-xs text-muted-foreground">
          Snapshot of session completion vs future pipeline
        </p>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">Fulfillment Rate</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {completionRate}%
            </span>
          </div>
          <div className="h-2 w-full rounded-[12px] bg-muted overflow-hidden">
            <div
              className="h-full rounded-[12px] bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Small Data Cards */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-[12px] bg-muted/30 border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              <span>Delivered</span>
            </div>
            <p className="text-lg font-black text-foreground">
              {completedSessions}
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] bg-muted/30 border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarRange className="size-3.5 text-sky-500" />
              <span>In Queue</span>
            </div>
            <p className="text-lg font-black text-foreground">
              {upcomingSessions}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground border-t border-border/50 pt-3">
        Completed sessions automatically trigger mentee review prompts.
      </p>
    </div>
  );
};
