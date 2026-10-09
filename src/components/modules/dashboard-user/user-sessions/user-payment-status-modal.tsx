"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";

export function PaymentStatusModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); // 'success' | 'failed' | null

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === "success" || status === "failed") {
      setIsOpen(true);

      // ৩ সেকেন্ড পর মোডাল বন্ধ হবে এবং URL থেকে কুয়েরি প্যারাম ক্লিন হবে
      const timer = setTimeout(() => {
        setIsOpen(false);
        router.replace("/user/sessions", { scroll: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (!status) return null;

  const isSuccess = status === "success";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border-border/80 bg-background/95 p-6 backdrop-blur-md text-center shadow-2xl">
        {/* Soft Background Accent Glow */}
        <div
          className={`pointer-events-none absolute -top-12 left-1/2 -z-10 h-32 w-48 -translate-x-1/2 rounded-full blur-3xl ${
            isSuccess ? "bg-emerald-500/20" : "bg-destructive/20"
          }`}
        />

        <DialogHeader className="flex flex-col items-center">
          {/* Animated Icon Container */}
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm ${
              isSuccess
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                : "border-destructive/20 bg-destructive/10 text-destructive"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="h-8 w-8 animate-in zoom-in-75 duration-300" />
            ) : (
              <XCircle className="h-8 w-8 animate-in zoom-in-75 duration-300" />
            )}
          </div>

          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </DialogTitle>

          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            {isSuccess
              ? "Your session booking has been confirmed. Redirecting..."
              : "Something went wrong with your transaction. Please try again."}
          </DialogDescription>
        </DialogHeader>

        {/* 3s Auto-dismiss progress bar */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full animate-[progress_3s_linear] ${
              isSuccess ? "bg-emerald-500" : "bg-destructive"
            }`}
            style={{
              animation: "shrinkWidth 3s linear forwards",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}