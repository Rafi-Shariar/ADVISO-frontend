import { CalendarClock, Sparkles } from "lucide-react";

interface BookScheduleTabProps {
  mentorId: string;
  timezone: string;
}

export const BookScheduleTab = ({ mentorId, timezone }: BookScheduleTabProps) => {
  return (
    <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Book a 1:1 Strategy Call
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Select a convenient date and time slot. Displayed in mentor's timezone ({timezone}).
          </p>
        </div>
        <span className="self-start sm:self-auto px-2.5 py-1 rounded-[12px] bg-orange-500/10 text-orange-600 text-[11px] font-bold uppercase tracking-wider">
          Instant Booking
        </span>
      </div>

      {/* Slots Integration Canvas */}
      <div className="py-20 rounded-[12px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="size-12 rounded-[12px] bg-orange-500/10 text-orange-600 flex items-center justify-center">
          <CalendarClock className="size-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Select from Available Slots
          </p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Calendar view with real-time morning, afternoon, and evening slots will render here.
          </p>
        </div>
      </div>
    </div>
  );
};