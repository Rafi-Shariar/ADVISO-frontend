"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePaymentDetailsAdmin } from "@/hooks/payment.hook"; // আপনার হুকের সঠিক পাথ দিন
import { formatPaidDate, formatSlotTime } from "@/utils/date-time-converter";
import {
  DollarSign,
  Calendar,
  Clock,
  User,
  CreditCard,
  Hash,
  AlertCircle,
  CheckCircle2,
  Clock3,
  XCircle,
  Loader2,
  Percent,
  Wallet,
  Receipt,
} from "lucide-react";

interface AdminPaymentDetailsSheetProps {
  paymentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPaymentDetailsSheet({
  paymentId,
  isOpen,
  onClose,
}: AdminPaymentDetailsSheetProps) {
  // হুক কল
  const { data, isPending } = usePaymentDetailsAdmin(paymentId as string);
  const payment = data?.data;

  // স্ট্যাটাস অনুযায়ী ব্যাজের স্টাইলিং
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "COMPLETED":
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="size-3.5" />
            Paid
          </span>
        );
      case "REFUNDED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <AlertCircle className="size-3.5" />
            Refunded
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-zinc-500/10 text-zinc-600 border border-zinc-500/20">
            <XCircle className="size-3.5" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock3 className="size-3.5" />
            {status || "Pending"}
          </span>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-xl w-full overflow-y-auto p-0 flex flex-col gap-0 border-l border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {/* ১. হেডার সেকশন */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <SheetHeader className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
                ID: #{payment?.paymentId?.slice(0, 8) || paymentId?.slice(0, 8)}
              </span>
              {payment && getStatusBadge(payment.status)}
            </div>
            <SheetTitle className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Payment Transaction
            </SheetTitle>
            <SheetDescription className="text-xs text-zinc-500">
              Comprehensive audit log, platform revenue, and payout details.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* ২. কন্টেন্ট এরিয়া */}
        {isPending ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-12 text-zinc-400">
            <Loader2 className="size-8 text-orange-500 animate-spin" />
            <p className="text-xs font-semibold tracking-wide">
              Fetching transaction records...
            </p>
          </div>
        ) : payment ? (
          <div className="flex-1 p-6 space-y-6">
            {/* মূল অ্যামাউন্ট ও ট্রানজ্যাকশন হাইলাইটার */}
            <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Receipt className="size-3.5 text-orange-500" /> Gross
                  Invoiced
                </span>
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  ${payment.amount}
                </span>
              </div>

              {/* রেভিনিউ স্প্লিট (Financial Metrics) */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 space-y-1">
                  <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                    <Percent className="size-3 text-orange-500" /> Platform Fee
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    ${payment.platformCharge ?? 0}
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Wallet className="size-3 text-emerald-500" /> Mentor Payout
                  </span>
                  <p className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                    ${payment.mentorEarnings ?? 0}
                  </p>
                </div>
              </div>
            </div>

            {/* রিফান্ড সেকশন (যদি থেকে থাকে) */}
            {payment.refundAmount && (
              <div className="rounded-[12px] border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="size-4" /> Refund Executed
                  </span>
                  <span>${payment.refundAmount}</span>
                </div>
                <div className="space-y-1 text-xs text-rose-600/90 dark:text-rose-400/80">
                  <p>
                    <span className="font-semibold text-rose-800 dark:text-rose-300">
                      Reason:
                    </span>{" "}
                    {payment.refundReason || "No specific reason provided."}
                  </p>
                  {payment.refundedAt && (
                    <p className="text-[11px] text-zinc-400">
                      Refund Date:{" "}
                       {formatPaidDate(payment.refundedAt)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* গেটওয়ে ও অডিট মেটাডাটা */}
            <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-3 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block pb-1 border-b border-zinc-100 dark:border-zinc-800">
                Payment Gateway Audit
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Payer Reference</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {payment.payerReference || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">bKash TrxID</span>
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    {payment.bkashTrxId || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">bKash Payment ID</span>
                  <span className="font-mono text-zinc-600 dark:text-zinc-400 text-[11px]">
                    {payment.bkashPaymentId || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Internal Invoice / Trx</span>
                  <span className="font-mono text-zinc-600 dark:text-zinc-400 text-[11px]">
                    {payment.transactionId
                      ? `#${payment.transactionId.slice(0, 14)}...`
                      : "N/A"}
                  </span>
                </div>

                {payment.paidAt && (
                  <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-2">
                    <span className="text-zinc-500">Paid Timestamp</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {formatPaidDate(payment.paidAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* সেশন ও মেন্টর ইনফরমেশন কার্ড */}
            {payment.session && (
              <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-3.5 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block pb-1 border-b border-zinc-100 dark:border-zinc-800">
                  Associated Mentorship Session
                </span>

                {/* Mentor Mini Snapshot */}
                <div className="flex items-center gap-3">
                  <div className="relative size-10 rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0">
                    {payment.session.mentor?.user?.profileURL ? (
                      <Image
                        src={payment.session.mentor.user.profileURL}
                        alt={payment.session.mentor.user.name || "Mentor"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center font-bold text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                        {payment.session.mentor?.user?.name
                          ? payment.session.mentor.user.name
                              .slice(0, 2)
                              .toUpperCase()
                          : "ME"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {payment.session.mentor?.user?.name || "Verified Mentor"}
                    </h4>
                    <p className="text-[11px] text-zinc-400">Assigned Expert</p>
                  </div>
                </div>

                {/* Session Date & Slot Time */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <Calendar className="size-3.5 text-orange-500" />
                    <span className="font-semibold">
                      {payment.session.sessionDate
                        ? format(
                            new Date(payment.session.sessionDate),
                            "dd MMM, yyyy",
                          )
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <Clock className="size-3.5 text-zinc-400" />
                    <span className="font-semibold">
                      {formatSlotTime(payment.session.startUTC)} -{" "}
                      {formatSlotTime(payment.session.endUTC)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 p-12 text-center text-zinc-400">
            <Receipt className="size-8 text-zinc-300 dark:text-zinc-700" />
            <p className="text-xs">No transaction details found for this ID.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
