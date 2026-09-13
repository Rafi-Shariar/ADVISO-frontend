"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  KeyRound, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  UserPlus, 
  MailCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Logo from "../layout/public/Logo";
import { cn } from "@/lib/utils";

const OTP_EXPIRY_SECONDS = 5 * 60; // 5 minutes

const VerifyAccountForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const { mutate: verify, isPending } = useVerifyAccount();

  // Redirect if no email parameter is present
  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOTP = () => {
    if (isExpired) {
      toast.error("OTP has expired", {
        description: "Please register again to get a fresh verification code.",
      });
      return;
    }

    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    verify(
      { email, otp },
      {
        onSuccess: (_res) => {
          toast.success("Account Verified Successfully!", {
            description: "Your account is active. Welcome to ADVISO!",
            position: "top-right",
          });
          router.push("/login");
        },
        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Verification failed. Please check the code and try again.";

          toast.error("Verification Failed", {
            description: errorDescription,
            position: "top-right",
          });
          setIsInvalid(true);
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-[440px] rounded-3xl border border-border/40 bg-card/60 dark:bg-card/40 backdrop-blur-xl p-3 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
      <CardHeader className="text-center space-y-3 pb-4">
        {/* Brand Icon Badge */}
        <div className="mx-auto p-2.5 rounded-2xl bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/20 w-fit">
          <MailCheck className="size-6" />
        </div>

        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent sm:text-3xl">
            Verify your account
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            We sent a 6-digit verification code to
            <br />
            <span className="font-semibold text-foreground break-all">
              {email || "your email"}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Expiry Banner or Active Timer Pill */}
        {isExpired ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-center space-y-3">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-destructive">
                Code Expired
              </p>
              <p className="text-xs text-muted-foreground">
                Your 5-minute validity window has lapsed. Please register again to generate a new verification code.
              </p>
            </div>
            <Link href="/register" className="block pt-1">
              <Button
                variant="outline"
                className="w-full h-10 rounded-xl gap-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
              >
                <UserPlus className="size-4" /> Re-register Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-colors",
                timeLeft <= 60
                  ? "border-destructive/30 bg-destructive/5 text-destructive animate-pulse"
                  : "border-orange-500/20 bg-orange-500/5 text-orange-600 dark:text-orange-400"
              )}
            >
              <Clock className="size-3.5" />
              <span>Valid for {formatTimer(timeLeft)}</span>
            </div>
          </div>
        )}

        {/* Verification Input Form */}
        {!isExpired && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOTP();
            }}
            className="space-y-5"
          >
            <Field data-invalid={isInvalid} className="space-y-3">
              <FieldLabel
                htmlFor="otp"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center block"
              >
                Enter 6-Digit Secure Code
              </FieldLabel>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  name="otp"
                  id="otp"
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  disabled={isPending || isExpired}
                  onChange={(value) => {
                    setOtp(value);
                    if (isInvalid) setIsInvalid(false);
                  }}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2 sm:gap-2.5">
                    <InputOTPSlot
                      index={0}
                      className="size-11 sm:size-12 rounded-xl text-base font-semibold border-border/80 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                    />
                    <InputOTPSlot
                      index={1}
                      className="size-11 sm:size-12 rounded-xl text-base font-semibold border-border/80 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                    />
                    <InputOTPSlot
                      index={2}
                      className="size-11 sm:size-12 rounded-xl text-base font-semibold border-border/80 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                    />
                    <InputOTPSlot
                      index={3}
                      className="size-11 sm:size-12 rounded-xl text-base font-semibold border-border/80 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                    />
                    <InputOTPSlot
                      index={4}
                      className="size-11 sm:size-12 rounded-xl text-base font-semibold border-border/80 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                    />
                    <InputOTPSlot
                      index={5}
                      className="size-11 sm:size-12 rounded-xl text-base font-semibold border-border/80 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {isInvalid && (
                <div className="text-center">
                  <FieldError
                    errors={[
                      { message: "Please enter a valid 6-digit verification code." },
                    ]}
                  />
                </div>
              )}
            </Field>

            <Button
              disabled={isPending || otp.length !== 6 || isExpired}
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_6px_22px_rgba(234,88,12,0.35)] active:scale-[0.98]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="size-4" /> Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Confirm & Activate
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </form>
        )}

        {/* Support Link */}
        <p className="text-center text-xs text-muted-foreground pt-1">
          Having trouble?{" "}
          <Link
            href="/contact"
            className="font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default VerifyAccountForm;