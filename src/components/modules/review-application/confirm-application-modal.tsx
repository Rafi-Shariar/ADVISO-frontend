"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReviewApplication } from "@/hooks/mentor.hook";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  Briefcase,
  Loader2,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApproveApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantName: string;
  yearOfExperience: number;
  sessionCharge: string | number;
  professionalDomain: string;
  isLoading?: boolean;
  applicantId: string;
}

export const ApproveApplicationDialog = ({
  open,
  onOpenChange,
  applicantName,
  applicantId,
  yearOfExperience,
  sessionCharge,
  professionalDomain,
  isLoading = false,
}: ApproveApplicationDialogProps) => {
  const { mutate: ApproveApplication, isPending } = useReviewApplication();
  const router = useRouter();

  const handleConfirmApplication = () => {
    const payload = {
      mentorId: applicantId,
      verificationStatus: "APPROVED" as const,
    };

    ApproveApplication(payload, {
      onSuccess: (_res) => {
        toast.success("Approved Application.", {
          description: "The Application has been approved successfully",
          position: "top-right",
        });

        router.push("/admin/mentors");
        onOpenChange(false);
      },

      onError: (err: any) => {
        const errorDescription =
          err?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again";

        toast.error("Action Failed", {
          description: errorDescription,
          position: "top-right",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={isLoading ? () => {} : onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl">
        <DialogHeader className="space-y-2">
          <div className="size-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1">
            <UserCheck className="size-5" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            Approve Mentor Application
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            You are about to accept{" "}
            <span className="font-semibold text-foreground">
              {applicantName}
            </span>{" "}
            as a certified mentor. Please verify the following vital parameters:
          </DialogDescription>
        </DialogHeader>

        {/* Vital Snapshot Review */}
        <div className="rounded-2xl border border-border/80 bg-muted/30 p-4 space-y-3.5 my-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 text-orange-500" /> Experience
            </span>
            <span className="font-semibold text-foreground">
              {yearOfExperience} {yearOfExperience > 1 ? "Years" : "Year"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm border-t border-border/50 pt-2.5">
            <span className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4 text-emerald-500" /> Charge /
              Session
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              ${sessionCharge}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm border-t border-border/50 pt-2.5">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="size-4 text-sky-500" /> Domain
            </span>
            <span className="font-semibold text-foreground capitalize truncate max-w-[200px]">
              {professionalDomain
                ? professionalDomain.toLowerCase().replace(/_/g, " ")
                : "N/A"}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Upon approval, their profile will be published to the public mentor
          directory and session bookings will be enabled.
        </p>

        <DialogFooter className=" sm:gap-0 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="px-4 py-2.5 mr-3 rounded-xl border border-border bg-card text-foreground hover:bg-muted text-sm font-semibold transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleConfirmApplication()}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-semibold shadow-md shadow-orange-500/25 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Approving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                <span>Confirm & Approve</span>
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
