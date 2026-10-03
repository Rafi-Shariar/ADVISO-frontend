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
import {
  CheckCircle2,
  Ban,
  AlertTriangle,
  ShieldCheck,
  Loader2,
  TriangleAlert,
} from "lucide-react";
import { useChangeAccountStatus, useDeleteAccount } from "@/hooks/user.hook";
import { toast } from "sonner";

import { Globe, Activity } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfileAdmin;
}

export function AccountDeleteModal({ open, onOpenChange, user }: Props) {
  const [imageError, setImageError] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

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

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    deleteAccount(user.userId, {
      onSuccess: () => {
        toast.success("Account Deleted successfully", {
          position: "top-right",
        });
        onOpenChange(false);
      },

      onError: (err: any) => {
        const errorDescription =
          err?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again";

        toast.error("Login Failed.", {
          description: errorDescription,
          position: "top-right",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-border/60 bg-background shadow-2xl rounded-2xl">
        <form onSubmit={handleDelete}>
          <DialogHeader className="sr-only">
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>

          {/* User Overview Section */}
          <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center border-b border-border/40 bg-gradient-to-b from-muted/30 to-transparent">
            {/* Avatar with Status Ring */}
            <div className="relative mb-3.5">
              <div
                className={`relative h-20 w-20 rounded-full overflow-hidden border-2 border-background ring-2 transition-all duration-300 activeRing shadow-sm bg-muted`}
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
            <p className="text-sm text-muted-foreground mt-0.5 max-w-[260px] truncate">
              {user.email}
            </p>

            {/* Role & Timezone */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
              {/* Role */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground border border-border/50">
                <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="capitalize">
                  {user.role.toLowerCase().replace("_", " ")}
                </span>
              </span>

              {/* Timezone */}
              {user.timezone && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-muted-foreground bg-muted/60 border border-border/40">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{user.timezone}</span>
                </span>
              )}

              {/* Current Status */}
              {user.accountStatus && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-muted-foreground bg-muted/60 border border-border/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="capitalize">
                    {user.accountStatus.toLowerCase()}
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5 text-left text-amber-900 mt-2">
              <TriangleAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-1 text-xs leading-relaxed">
                <p className="font-semibold text-red-700">
                  Warning: Permanent Action
                </p>
                <p className="text-amber-900/80">
                  Once the account is deleted, all associated data and
                  information will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 bg-muted/20 border-t border-border/40">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              disabled={isPending}
              className="text-xm h-9 px-4 rounded-lg"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="text-xm h-9 px-4 rounded-lg shadow-lg bg-red-600 font-semibold text-white hover:bg-red-900 border border-transparent disabled:opacity-50"
            >
              {isPending && (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              )}
              {isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
