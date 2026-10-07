import Link from "next/link";
import { CalendarClock, ArrowUpRight, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NextSessionCardProps {
  nextSession: any | null;
}

export const NextSessionCard = ({ nextSession }: NextSessionCardProps) => {
  return (
    <div className="rounded-[12px] border border-border/70 bg-gradient-to-br from-card via-card to-orange-500/5 p-6 shadow-2xs flex flex-col justify-between space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-[12px] bg-orange-500/10 text-orange-600 flex items-center justify-center">
            <CalendarClock className="size-4" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Upcoming Engagement
          </h4>
        </div>
        <span className="px-2.5 py-0.5 rounded-[12px] text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 border border-orange-500/20">
          Live Sync
        </span>
      </div>

      {nextSession ? (
        <div className="p-4 rounded-[12px] bg-background/80 border border-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {nextSession.user?.name || "Mentee"}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {nextSession.scheduledTime}
            </span>
          </div>
          <Button
            asChild
            size="sm"
            className="w-full rounded-[12px] bg-orange-600 hover:bg-orange-700 text-white gap-2 font-semibold shadow-xs"
          >
            <a href={nextSession.meetingLink} target="_blank" rel="noreferrer">
              <Video className="size-3.5" />
              Join Call
            </a>
          </Button>
        </div>
      ) : (
        <div className="py-6 px-4 rounded-[12px] border border-dashed border-border/70 bg-muted/20 text-center space-y-2">
          <Sparkles className="size-6 text-muted-foreground/60 mx-auto" />
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-foreground">
              No sessions scheduled right now
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Keep your availability updated so students can easily book your
              calendar.
            </p>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Manage your open booking slots
        </span>
        <Link
          href="/mentor/schedules"
          className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700 transition-colors"
        >
          View Slots <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
};
