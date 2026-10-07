import { format } from "date-fns";

// "HH:mm" থেকে UTC Epoch ISO স্ট্রিং ("1970-01-01THH:mm:00.000Z")
// schedule.helper.ts
export const convertToUtcEpochIso = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  
  // লোকাল টাইম হিসেবে সেট করা
  const date = new Date(1970, 0, 1, hours, minutes, 0, 0);
  
  // toISOString() স্বয়ংক্রিয়ভাবে লোকাল সময়কে সমতুল্য UTC তে কনভার্ট করবে
  return date.toISOString();
};

// "HH:mm" ফরম্যাটে দুই সময়ের মিনিটের ব্যবধান বের করা
export const getTimeDifferenceInMinutes = (start: string, end: string): number => {
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  return endH * 60 + endM - (startH * 60 + startM);
};

// ১৫ মিনিটের ব্যবধানে মডার্ন সিলেক্টর অপশন তৈরি (যেমন: "09:00 AM", "09:15 AM")
export const generateTimeSlots = (): { label: string; value: string }[] => {
  const slots: { label: string; value: string }[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 20) {
      const hStr = hour.toString().padStart(2, "0");
      const mStr = min.toString().padStart(2, "0");
      const value = `${hStr}:${mStr}`;

      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const label = `${displayHour.toString().padStart(2, "0")}:${mStr} ${period}`;

      slots.push({ label, value });
    }
  }
  return slots;
};

export const TIME_SLOTS = generateTimeSlots();