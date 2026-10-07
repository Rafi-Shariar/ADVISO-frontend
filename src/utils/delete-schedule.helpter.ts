import { Slot } from "@/types/schedule.type";

export const canDeleteSchedule = (slots: Slot[]): boolean => {
  if (!slots || slots.length === 0) return false;
  return slots.some((slot) => slot.isBooked);
};
