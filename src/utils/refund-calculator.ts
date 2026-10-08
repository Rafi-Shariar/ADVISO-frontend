import { differenceInHours } from "date-fns";

export interface RefundCalculationResult {
  hoursLeft: number;
  refundPercentage: number;
  refundAmount: number;
  sessionFee: number;
}

export const calculateRefundDetails = (
  sessionDate: string,
  startUTC: string,
  sessionFees: string | number,
): RefundCalculationResult => {
  const fee = Number(sessionFees) || 0;

  try {
    // সেশনের তারিখ (YYYY-MM-DD) এবং শুরু হওয়ার সময়কে একসাথে করে পূর্ণাঙ্গ Date তৈরি করা
    const baseDate = new Date(sessionDate);
    const timeDate = new Date(startUTC);

    const fullSessionDateTime = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      timeDate.getUTCHours(),
      timeDate.getUTCMinutes(),
      0,
    );

    const now = new Date();
    // সেশন শুরু হওয়ার আর কত ঘণ্টা বাকি আছে
    const hoursLeft = differenceInHours(fullSessionDateTime, now);

    let refundPercentage = 0;

    if (hoursLeft >= 48) {
      refundPercentage = 100;
    } else if (hoursLeft >= 24) {
      refundPercentage = 50;
    } else if (hoursLeft >= 12) {
      refundPercentage = 25;
    } else {
      refundPercentage = 0;
    }

    const refundAmount = (fee * refundPercentage) / 100;

    return {
      hoursLeft: Math.max(0, hoursLeft),
      refundPercentage,
      refundAmount,
      sessionFee: fee,
    };
  } catch {
    return {
      hoursLeft: 0,
      refundPercentage: 0,
      refundAmount: 0,
      sessionFee: fee,
    };
  }
};
