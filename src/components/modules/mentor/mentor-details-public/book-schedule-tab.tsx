"use client";

import { useMemo, useState } from "react";
import { CalendarX, Sparkles } from "lucide-react";
import { useSessionsOfMentor } from "@/hooks/session.hook";
import { MentorSlotItem } from "../book-schedule/slot-card";
import { ScheduleSkeleton } from "../book-schedule/schedule-loading-skeleton";
import { DateSlotGroup } from "../book-schedule/date-slot-group";
import { BookScheduleModal } from "../book-schedule/book-slot-modal";

interface BookScheduleTabProps {
  mentorId: string;
  timezone: string;
}

export const BookScheduleTab = ({
  mentorId,
  timezone,
}: BookScheduleTabProps) => {
  const { data, isPending } = useSessionsOfMentor(mentorId);
  const rawSlots: MentorSlotItem[] = data?.data || [];

  // Modal State
  const [selectedSlot, setSelectedSlot] = useState<MentorSlotItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group by Date
  const groupedSlots = useMemo(() => {
    const groups: Record<string, MentorSlotItem[]> = {};

    rawSlots.forEach((slot) => {
      if (!groups[slot.date]) {
        groups[slot.date] = [];
      }
      groups[slot.date].push(slot);
    });

    return Object.keys(groups)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => ({
        date,
        slots: groups[date],
      }));
  }, [rawSlots]);

  // স্লটে ক্লিক করলে সরাসরি মোডাল ওপেন হবে
  const handleSelectSlot = (slot: MentorSlotItem) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Available 1:1 Strategy Slots
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Select a slot to confirm your booking. Synced with mentor's timezone ({timezone}).
          </p>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-orange-500/10 text-orange-600 text-xs font-bold">
          <Sparkles className="size-3.5" />
          <span>Instant Confirmation</span>
        </span>
      </div>

      {/* Slots List */}
      {isPending ? (
        <ScheduleSkeleton />
      ) : groupedSlots.length === 0 ? (
        <div className="py-20 rounded-[12px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="size-12 rounded-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center">
            <CalendarX className="size-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              No Slots Available
            </p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              This mentor does not have any open strategy slots at the moment.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedSlots.map((group, index) => (
            <DateSlotGroup
              key={group.date}
              date={group.date}
              slots={group.slots}
              onSelectSlot={handleSelectSlot}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      )}

      {/* 🚀 Booking & Payment Modal */}
      <BookScheduleModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        slot={selectedSlot}
      />
    </div>
  );
};