"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { formatScheduleDate } from "@/utils/date-time-converter";
import { MentorSlotItem, SlotCard } from "./slot-card";

interface DateSlotGroupProps {
  date: string;
  slots: MentorSlotItem[];
  onSelectSlot: (slot: MentorSlotItem) => void;
  defaultExpanded?: boolean;
}

export const DateSlotGroup = ({
  date,
  slots,
  onSelectSlot,
  defaultExpanded = true,
}: DateSlotGroupProps) => {
  const [isCollapsed, setIsCollapsed] = useState(!defaultExpanded);
  const [showAll, setShowAll] = useState(false);

  // Initial preview count
  const PREVIEW_LIMIT = 6;
  const visibleSlots = showAll ? slots : slots.slice(0, PREVIEW_LIMIT);
  const hasMore = slots.length > PREVIEW_LIMIT;

  return (
    <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Date Header with Collapse trigger */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <div className="p-2 rounded-[8px] bg-orange-500/10 text-orange-600">
            <Calendar className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 transition-colors">
              {formatScheduleDate(date)}
            </h3>
            <span className="text-[11px] text-zinc-400 font-medium">
              {slots.length} available {slots.length === 1 ? "slot" : "slots"}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-[8px] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronUp className="size-4" />
          )}
        </button>
      </div>

      {/* Slots Grid */}
      {!isCollapsed && (
        <div className="space-y-3 pt-1 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {visibleSlots.map((slot) => (
              <SlotCard
                key={slot.slotId}
                slot={slot}
                onSelectSlot={onSelectSlot}
              />
            ))}
          </div>

          {/* Show More / Show Less Toggle Button */}
          {hasMore && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[12px] bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                {showAll ? (
                  <>
                    <span>Show Fewer Slots</span>
                    <ChevronUp className="size-3.5" />
                  </>
                ) : (
                  <>
                    <span>View All {slots.length} Slots</span>
                    <ChevronDown className="size-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
