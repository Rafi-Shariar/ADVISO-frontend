"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBookSchedule } from "@/hooks/session.hook";
import { formatScheduleDate, formatSlotTime } from "@/utils/date-time-converter";
import { MentorSlotItem } from "./slot-card";
import { Calendar, Clock, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface BookScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: MentorSlotItem | null;
}

export const BookScheduleModal = ({
  open,
  onOpenChange,
  slot,
}: BookScheduleModalProps) => {
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync: bookSchedule, isPending } = useBookSchedule();

  const handleClose = (state: boolean) => {
    if (!isPending) {
      setPurpose("");
      setError("");
      onOpenChange(state);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!purpose.trim()) {
      setError("Please outline the purpose or agenda of this 1:1 call.");
      return;
    }

    if (!slot) return;

    try {
      setError("");

      // 🚀 Step 1: Call bookSession
      const response = await bookSchedule({
        slotId: slot.slotId,
        purpose: purpose.trim(),
      });

      console.log("Book Response:", response);

      // Backend returns: { paymentURL: "https://..." } inside data
      const paymentURL =
        response?.data?.paymentURL ||
        response?.paymentURL ||
        response?.data?.bkashURL;

      if (paymentURL) {
        toast.info("Connecting to bKash payment gateway...", {
          position: "top-right",
        });
        window.location.href = paymentURL;
      } else {
        throw new Error("Payment URL not found in server response.");
      }
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Booking process failed. Please try again.";

      setError(errorMsg);
      toast.error("Failed to complete booking", {
        description: errorMsg,
        position: "top-right",
      });
    }
  };

  if (!slot) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Header */}
          <DialogHeader className="space-y-1 text-left">
            <div className="size-10 rounded-[12px] bg-orange-500/10 text-orange-600 flex items-center justify-center mb-1">
              <Sparkles className="size-5" />
            </div>
            <DialogTitle className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Confirm 1:1 Session
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500">
              Share what you would like to discuss so your mentor can prepare effectively.
            </DialogDescription>
          </DialogHeader>

          {/* Slot Metadata Badge Strip */}
          <div className="p-3.5 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-zinc-500">
                <Calendar className="size-3.5 text-orange-500" /> Date
              </span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                {formatScheduleDate(slot.date)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold border-t border-zinc-200/50 dark:border-zinc-700/40 pt-2">
              <span className="flex items-center gap-1.5 text-zinc-500">
                <Clock className="size-3.5 text-zinc-400" /> Time Window
              </span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                {formatSlotTime(slot.startTime)} - {formatSlotTime(slot.endTime)}
              </span>
            </div>
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-medium">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Purpose Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="bookingPurpose"
              className="text-[11px] font-bold uppercase tracking-wider text-zinc-400"
            >
              Session Purpose & Agenda <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="bookingPurpose"
              rows={4}
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
                if (error) setError("");
              }}
              disabled={isPending}
              placeholder="e.g., Code architecture review, career transition tips for senior roles, or system design interview prep..."
              className="w-full rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none transition-all"
            />
          </div>

          {/* Footer Controls */}
          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
              className="rounded-[12px] border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-3.5 animate-spin text-orange-500" />
                  <span>Connecting bKash...</span>
                </span>
              ) : (
                "Pay & Confirm"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};