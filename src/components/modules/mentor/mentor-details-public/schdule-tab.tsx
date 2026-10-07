import { CalendarClock, CalendarCheck } from "lucide-react";

export const SchedulesTab = ({ timezone }: { timezone: string }) => {
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div>
          <h3 className="text-base font-bold text-foreground">Available Mentorship Slots</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Times are synced to mentor's timezone ({timezone})</p>
        </div>
      </div>

      {/* Booking Slot Integration Placeholder */}
      <div className="py-14 text-center space-y-3 rounded-2xl border border-dashed border-border/70 bg-muted/20">
        <CalendarClock className="size-10 mx-auto text-orange-500/60" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Interactive Schedule Calendar</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Weekly slots and recurring hours will be displayed here for instant booking.
          </p>
        </div>
      </div>
    </div>
  );
};