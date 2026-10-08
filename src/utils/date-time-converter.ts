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


// সেফ ডেট ফরম্যাটিং ফাংশন
export const formatPaidDate = (dateStr?: string) => {
  if (!dateStr) return "N/A";

  try {
    // 1. কোলন যুক্ত মিলিসেকেন্ড ফিক্স করা: "15:32:41:427" -> "15:32:41.427"
    const normalizedStr = dateStr.replace(
      /(\d{2}:\d{2}:\d{2}):(\d{3})/,
      "$1.$2"
    );

    const parsedDate = new Date(normalizedStr);

    if (isNaN(parsedDate.getTime())) {
      // যদি তাও ইনভ্যালিড থাকে তবে অরিজিনাল স্ট্রিংয়ের প্রথম অংশ দেখাবে
      return dateStr.split(" GMT")[0];
    }

    return format(parsedDate, "dd MMM yyyy, hh:mm a");
  } catch {
    return dateStr;
  }
};