"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Lock, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginRequiredCardProps {
  onCancel?: () => void;
}

export const LoginRequiredCard = ({ onCancel }: LoginRequiredCardProps) => {
  const pathname = usePathname();

  // লগইন সম্পন্ন হলে বর্তমান পেজে যাতে আবার ফিরে আসে
  const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
  const registerUrl = `/register?redirect=${encodeURIComponent(pathname)}`;

  return (
    <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-7 shadow-xs text-center space-y-5">
      {/* Visual Accent Icon */}
      <div className="relative mx-auto flex items-center justify-center">
        <div className="size-14 rounded-[12px] bg-orange-500/10 border border-orange-500/20 text-orange-600 flex items-center justify-center shadow-2xs">
          <Lock className="size-6 stroke-[2.2]" />
        </div>
      </div>

      {/* Copywriting */}
      <div className="space-y-1.5 max-w-sm mx-auto">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
          <Sparkles className="size-3 text-orange-500" />
          Authentication Required
        </div>
        <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Sign in to Reserve Slot
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          You need an active mentee account to confirm 1-on-1 strategy sessions and initiate checkout.
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <Button
          asChild
          className="w-full h-10 rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-bold shadow-xs active:scale-[0.98] transition-all gap-2"
        >
          <Link href={loginUrl}>
            <LogIn className="size-3.5 text-orange-500" />
            <span>Continue to Sign In</span>
          </Link>
        </Button>

        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span>New to ADVISO?</span>
          <Link
            href={registerUrl}
            className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-500 inline-flex items-center gap-1 transition-colors"
          >
            <UserPlus className="size-3.5" />
            <span>Create Account</span>
          </Link>
        </div>
      </div>

      {/* Optional Cancel/Close Button */}
      {onCancel && (
        <div className="pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="rounded-[12px] text-xs font-semibold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 h-8"
          >
            Cancel & Go Back
          </Button>
        </div>
      )}
    </div>
  );
};