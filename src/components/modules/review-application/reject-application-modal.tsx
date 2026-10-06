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
import { AlertTriangle, Loader2 } from "lucide-react";

interface RejectApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantName: string;

  isLoading?: boolean;
}

export const RejectApplicationDialog = ({
  open,
  onOpenChange,
  applicantName,
  isLoading = false,
}: RejectApplicationDialogProps) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please provide a reason for the rejection.");
      return;
    }
    setError("");
   
    setReason("");
  };

  const handleClose = (value: boolean) => {
    if (!isLoading) {
      setError("");
      setReason("");
      onOpenChange(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="space-y-2">
            <div className="size-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center mb-1">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Reject Application
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to reject <span className="font-semibold text-foreground">{applicantName}</span>'s mentor application? Please specify the reason so they can improve.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-1">
            <label
              htmlFor="rejectionReason"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Rejection Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="rejectionReason"
              rows={4}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g., Inadequate years of industry experience, invalid portfolio link, missing certification details..."
              className="w-full rounded-xl border border-border/80 bg-muted/30 p-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/50 resize-none transition-all"
              disabled={isLoading}
            />
            {error && (
              <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                {error}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <button
              type="button"
              onClick={() => handleClose(false)}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-muted text-sm font-semibold transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md shadow-rose-600/20 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Rejecting...</span>
                </>
              ) : (
                "Confirm Rejection"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};