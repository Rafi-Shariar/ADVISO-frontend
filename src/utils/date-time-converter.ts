import { isValid, format } from "date-fns";

export function formatScheduleDate(dateString: string) {
  const date = new Date(dateString);
  return isValid(date) ? format(date, "EEE do MMM, yyyy") : "Invalid Date";
}

export const formatSlotTime = (isoString?: string) => {
  if (!isoString) return "--:--";
  const date = new Date(isoString);
  return isValid(date) ? format(date, "h:mm a") : "Invalid Time";
};


export const formatPaidDate = (dateStr?: string | null): string => {
  if (!dateStr || dateStr === "-") return "-";

  try {
    let cleaned = dateStr.trim();

    // ১. মিলিসেকেন্ডের কোলন ঠিক করা: "15:32:41:427" -> "15:32:41.427"
    cleaned = cleaned.replace(/(\d{2}:\d{2}:\d{2}):(\d{3})/, "$1.$2");

    // ২. " GMT+0600" ফরম্যাটকে স্ট্যান্ডার্ড ISO অফসেটে আনা "+06:00"
    cleaned = cleaned.replace(/\s+GMT([+-]\d{2})(\d{2})/, "$1:$2");

    let parsedDate = new Date(cleaned);

    // ৩. যদি তাও Invalid Date থাকে, তবে ম্যানুয়ালি Date & Time এক্সট্রাক্ট করা
    if (isNaN(parsedDate.getTime())) {
      const match = dateStr.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
      );
      if (match) {
        const [, year, month, day, hour, min, sec] = match;
        // লোকাল ডেট হিসেবে অবজেক্ট তৈরি
        parsedDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hour),
          Number(min),
          Number(sec)
        );
      }
    }

    if (isNaN(parsedDate.getTime())) {
      return dateStr;
    }

    return format(parsedDate, "d MMM yyyy, h:mm a");
  } catch {
    return dateStr;
  }
};