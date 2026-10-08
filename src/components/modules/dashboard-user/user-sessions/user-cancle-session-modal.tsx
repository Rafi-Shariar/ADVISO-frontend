"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { calculateRefundDetails } from "@/utils/refund-calculator";
import { useCancleSession } from "@/hooks/session.hook";
import { ISessionDetailsAdmin } from "@/types/session.type";

interface CancelSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: ISessionDetailsAdmin | null;
}

export function CancelSessionModal({
  isOpen,
  onClose,
  session,
}: CancelSessionModalProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const { mutate: cancelSession, isPending } = useCancleSession();

  if (!session) return null;

  // রিফান্ড ক্যালকুলেশন
  const { hoursLeft, refundPercentage, refundAmount, sessionFee } =
    calculateRefundDetails(
      session.sessionDate,
      session.startUTC,
      session.sessionFees,
    );

  const handleClose = (state: boolean) => {
    if (!isPending) {
      setReason("");
      setError("");
      onClose();
    }
  };

  const handleConfirmCancel = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("Please provide a valid cancellation reason.");
      return;
    }

    setError("");

    cancelSession(
      {
        sessionId: session.sessionId,
        cancellationReason: reason.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Session Cancelled", {
            description:
              refundPercentage > 0
                ? `Booking cancelled. A refund of $${refundAmount} (${refundPercentage}%) will be processed.`
                : "Booking cancelled. No refund applicable based on policy.",
            position: "top-right",
          });
          handleClose(false);
        },
        onError: (err: any) => {
          const errorMsg =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to cancel the session. Please try again.";

          setError(errorMsg);
          toast.error("Cancellation Failed", {
            description: errorMsg,
            position: "top-right",
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[460px] p-6 rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
        <form onSubmit={handleConfirmCancel} className="space-y-5">
          {/* Header */}
          <DialogHeader className="space-y-1 text-left">
            <div className="size-10 rounded-[12px] bg-rose-500/10 text-rose-600 flex items-center justify-center mb-1">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Cancel Mentorship Session
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 leading-relaxed">
              Are you sure you want to cancel session #
              {session.sessionId?.slice(0, 8)}? Please review the refund
              estimate below.
            </DialogDescription>
          </DialogHeader>

          {/* Refund Estimate Breakdown Box */}
          <div className="rounded-[12px] border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-50/70 dark:bg-zinc-800/40 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-zinc-500 font-medium">
                <Clock className="size-3.5 text-orange-500" /> Time Remaining
              </span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                ~{hoursLeft} Hours Left
              </span>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-zinc-200/60 dark:border-zinc-700/50 pt-2">
              <span className="text-zinc-500 font-medium">Original Fee</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                ${sessionFee}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-zinc-200/60 dark:border-zinc-700/50 pt-2">
              <span className="text-zinc-500 font-medium">
                Refund Policy Tier
              </span>
              <span
                className={`font-black text-xs px-2 py-0.5 rounded-[12px] ${
                  refundPercentage === 100
                    ? "bg-emerald-500/10 text-emerald-600"
                    : refundPercentage > 0
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {refundPercentage}% Refund
              </span>
            </div>

            <div className="flex items-center justify-between text-sm font-bold border-t border-zinc-200 dark:border-zinc-700 pt-2.5">
              <span className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100">
                <DollarSign className="size-4 text-emerald-500" /> Total Refund
                Due
              </span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                ${refundAmount}
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-medium">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Cancellation Reason Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="cancelReason"
              className="text-[11px] font-bold uppercase tracking-wider text-zinc-500"
            >
              Cancellation Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="cancelReason"
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              disabled={isPending}
              placeholder="e.g., Unforeseen scheduling conflict, personal emergency, etc..."
              className="w-full rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
              className="rounded-[12px] border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
            >
              Keep Session
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-[12px] bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-3.5 animate-spin text-white" />
                  <span>Cancelling...</span>
                </span>
              ) : (
                "Confirm Cancellation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
