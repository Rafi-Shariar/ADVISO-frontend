"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForgotPassword, useResetPassword } from "@/hooks";
import { Loader2, KeyRound, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ResetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultEmail?: string; // Dashboard-এ আগে থেকে ইউজারের ইমেইল থাকলে পাস করার জন্য
}

export function ResetPasswordModal({
  open,
  onOpenChange,
  defaultEmail = "",
}: ResetPasswordModalProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { mutate: sendOtp, isPending: isSendingOtp } = useForgotPassword();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setStep("email");
      if (!defaultEmail) setEmail("");
      setOtp("");
      setNewPassword("");
    }
    onOpenChange(isOpen);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    sendOtp(email, {
      onSuccess: () => {
        toast.success("Verification code sent to your email.");
        setStep("otp");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to send OTP code.");
      },
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    resetPassword(
      {
        email,
        otp,
        password: newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password changed successfully.");
          handleClose(false);
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update password.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl border-border/80 bg-background/95 p-6 backdrop-blur-md shadow-2xl">
        {/* Glow Element */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-32 w-48 -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl" />

        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-border/80 bg-background shadow-sm">
            {step === "email" ? (
              <Mail className="h-6 w-6 text-orange-500" />
            ) : (
              <KeyRound className="h-6 w-6 text-orange-500" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            {step === "email" ? "Reset your password" : "Set new password"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {step === "email"
              ? "Enter your account email to receive a 6-digit verification code."
              : `Enter the code sent to ${email} and your new password.`}
          </DialogDescription>
        </DialogHeader>

        {step === "email" ? (
          <form onSubmit={handleSendEmail} className="mt-4 space-y-4">
            <div className="space-y-1.5 text-left">
              <Label
                htmlFor="reset-email"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="h-11 rounded-xl border-border/60 bg-background/60 px-4 text-sm shadow-inner focus-visible:ring-1 focus-visible:ring-orange-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isSendingOtp}
              className="h-11 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-sm hover:bg-orange-600 active:scale-[0.98] transition-all"
            >
              {isSendingOtp ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                6-Digit Verification Code
              </Label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(val) => setOtp(val)}
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-11 w-11 rounded-xl border-border/70 text-sm font-semibold shadow-inner focus:border-orange-500"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-1.5 text-left">
              <Label
                htmlFor="new-pass"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                New Password
              </Label>
              <Input
                id="new-pass"
                type="password"
                placeholder="••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-11 rounded-xl border-border/60 bg-background/60 px-4 text-sm shadow-inner focus-visible:ring-1 focus-visible:ring-orange-500"
              />
            </div>

            <div className="space-y-2 pt-1">
              <Button
                type="submit"
                disabled={isResetting}
                className="h-11 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-sm hover:bg-orange-600 active:scale-[0.98] transition-all"
              >
                {isResetting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Update Password"
                )}
              </Button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Change email
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
