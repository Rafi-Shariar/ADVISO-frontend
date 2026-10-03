"use client";

import { useState } from "react";
import Image from "next/image";
import { UserProfileAdmin, UserAccountStatus } from "@/types/user.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Ban, AlertTriangle, ShieldCheck } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfileAdmin;
}

const statusConfig: Record<
  UserAccountStatus,
  {
    label: string;
    description: string;
    icon: typeof CheckCircle2;
    activeRing: string;
    badgeStyle: string;
  }
> = {
  ACTIVE: {
    label: "Active",
    description: "Account is active with full access to sessions and bookings.",
    icon: CheckCircle2,
    activeRing: "ring-emerald-500",
    badgeStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
  },
  SUSPENDED: {
    label: "Suspended",
    description: "User is temporarily restricted from logging in and scheduling.",
    icon: AlertTriangle,
    activeRing: "ring-amber-500",
    badgeStyle: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40",
  },
  BLOCKED: {
    label: "Blocked",
    description: "Access revoked indefinitely. All ongoing activities are frozen.",
    icon: Ban,
    activeRing: "ring-rose-500",
    badgeStyle: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/40",
  },
};

export function AdminUserAccountStatusModal({ open, onOpenChange, user }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<UserAccountStatus>(user.accountStatus);
  const [imageError, setImageError] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect mutation hook here: { userId: user.userId, accountStatus: selectedStatus }
    onOpenChange(false);
  };

  const activeMeta = statusConfig[selectedStatus];
  const ActiveIcon = activeMeta.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-border/60 bg-background shadow-2xl rounded-2xl">
        <form onSubmit={handleSave}>
          <DialogHeader className="sr-only">
            <DialogTitle>Update Account Status</DialogTitle>
          </DialogHeader>

          {/* User Overview Section */}
          <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center border-b border-border/40 bg-gradient-to-b from-muted/30 to-transparent">
            {/* Avatar with Status Ring */}
            <div className="relative mb-3.5">
              <div
                className={`relative h-20 w-20 rounded-full overflow-hidden border-2 border-background ring-2 transition-all duration-300 ${activeMeta.activeRing} shadow-sm bg-muted`}
              >
                {user.profileURL && !imageError ? (
                  <Image
                    src={user.profileURL}
                    alt={user.name || "User profile"}
                    fill
                    sizes="80px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground tracking-wide">
                    {getInitials(user.name)}
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {user.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-[260px] truncate">
              {user.email}
            </p>

            {/* Role & Timezone pills */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-secondary-foreground border border-border/50">
                <ShieldCheck className="h-3 w-3 text-muted-foreground" />
                {user.role}
              </span>
              {user.timezone && (
                <span className="px-2 py-0.5 rounded-full text-[11px] text-muted-foreground bg-muted/60">
                  {user.timezone}
                </span>
              )}
            </div>
          </div>

          {/* Status Segmented Toggle & State Preview */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h1 className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Account Status
              </h1>

              {/* Segmented Controller */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-muted/60 rounded-xl border border-border/50">
                {(["ACTIVE", "SUSPENDED", "BLOCKED"] as UserAccountStatus[]).map((status) => {
                  const isSelected = selectedStatus === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status as UserAccountStatus)}
                      className={`relative py-2 text-xs font-medium rounded-lg transition-all duration-200 capitalize outline-none ${
                        isSelected
                          ? "bg-background text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {status.toLowerCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Status Callout */}
            <div
              className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed transition-all duration-200 ${activeMeta.badgeStyle}`}
            >
              <ActiveIcon className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{activeMeta.description}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 bg-muted/20 border-t border-border/40">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs h-9 px-4 rounded-lg"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={selectedStatus === user.accountStatus}
              className="text-xs h-9 px-4 rounded-lg shadow-xs"
            >
              Update Status
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}