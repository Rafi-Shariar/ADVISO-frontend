"use client";

import { Clock, ArrowRight } from "lucide-react";
import { formatSlotTime } from "@/utils/date-time-converter";

export interface MentorSlotItem {
  slotId: string;
  scheduleId: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface SlotCardProps {
  slot: MentorSlotItem;
  onSelectSlot: (slot: MentorSlotItem) => void;
}

export const SlotCard = ({ slot, onSelectSlot }: SlotCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelectSlot(slot)}
      className="group relative flex items-center justify-between p-3.5 rounded-[12px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 hover:border-orange-500/70 dark:hover:border-orange-500/70 hover:shadow-xs transition-all duration-200 text-left active:scale-[0.98] cursor-pointer"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-[8px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-colors">
          <Clock className="size-3.5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 transition-colors">
            {formatSlotTime(slot.startTime)} - {formatSlotTime(slot.endTime)}
          </p>
          <span className="text-[10px] text-zinc-400 block font-medium">
            20 Min Call
          </span>
        </div>
      </div>

      <div className="size-6 rounded-[8px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 text-zinc-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
        <ArrowRight className="size-3" />
      </div>
    </button>
  );
};
