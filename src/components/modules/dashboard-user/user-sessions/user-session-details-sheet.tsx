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
import { Button } from "@/components/ui/button";
import { useSessionDetailsUser } from "@/hooks/session.hook"; // আপনার হুকের সঠিক পাথ দিন

import { formatSlotTime } from "@/utils/date-time-converter";
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  Loader2,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Target,
  Mail,
  Receipt,
  FileQuestion,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  CalendarX,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IUserSessionDetails } from "@/types/session.type";

interface UserSessionDetailsSheetProps {
  sessionId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserSessionDetailsSheet({
  sessionId,
  isOpen,
  onClose,
}: UserSessionDetailsSheetProps) {
  const { data, isPending } = useSessionDetailsUser(sessionId as string);
  const session: IUserSessionDetails | undefined = data?.data;

  const [copied, setCopied] = useState(false);

  const isConfirmed =
    session?.status === "COMFIRMED" || session?.status === "CONFIRMED";
  const isCompleted = session?.completedSession;
  const isCancelled = session?.status === "CANCELLED";
  const isPendingStatus = session?.status === "PENDING";

  // সেফ ডেট ফরম্যাটিং হেল্পার (মিলি-সেকেন্ডে কোলন থাকলে ক্র্যাশ রোধ করতে)
  const formatSafeDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    try {
      const normalized = dateStr.replace(/(\d{2}:\d{2}:\d{2}):(\d{3})/, "$1.$2");
      const parsed = new Date(normalized);
      if (isNaN(parsed.getTime())) return dateStr.split(" GMT")[0];
      return format(parsed, "dd MMM yyyy, hh:mm a");
    } catch {
      return dateStr;
    }
  };

  const handleCopyId = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Transaction ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* 🚀 Desktop-এর জন্য বর্ধিত ও রেসপন্সিভ Width (sm:max-w-xl lg:max-w-2xl) */}
      <SheetContent className="sm:max-w-xl lg:max-w-2xl w-full overflow-y-auto p-0 flex flex-col gap-0 border-l border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        
        {/* ১. টপ হেডার বার */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
          <SheetHeader className="space-y-1.5 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Session ID: #{session?.sessionId?.slice(0, 8) || sessionId?.slice(0, 8)}
                </span>
              </div>

              {/* ডায়নামিক স্ট্যাটাস ব্যাজ */}
              {session && (
                <div>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      <CheckCircle2 className="size-3.5" />
                      Session Completed
                    </span>
                  ) : isConfirmed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Confirmed
                    </span>
                  ) : isCancelled ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      <CalendarX className="size-3.5" />
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      <Clock3 className="size-3.5" />
                      Payment Pending
                    </span>
                  )}
                </div>
              )}
            </div>

            <SheetTitle className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Session Dossier
            </SheetTitle>
            <SheetDescription className="text-xs text-zinc-500">
              Verified 1-on-1 tactical strategy session details and meeting telemetry.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* ২. মূল বডি কনটেন্ট */}
        {isPending ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-12 text-zinc-400">
            <Loader2 className="size-8 text-orange-500 animate-spin" />
            <p className="text-xs font-semibold tracking-wide">
              Loading session telemetry...
            </p>
          </div>
        ) : session ? (
          <div className="flex-1 p-6 sm:p-7 space-y-6">
            
            {/* ক্যান্সেলেশন অ্যালার্ট (যদি স্ট্যাটাস CANCELLED হয়) */}
            {isCancelled && (
              <div className="rounded-[12px] border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="size-4" /> This Session Has Been Cancelled
                  </span>
                  {session.cancelledAt && (
                    <span className="text-[11px] font-normal text-zinc-400">
                      Cancelled on: {formatSafeDate(session.cancelledAt)}
                    </span>
                  )}
                </div>
                {session.cancellationReason && (
                  <p className="text-xs text-rose-600/90 dark:text-rose-400/80 leading-relaxed">
                    <strong className="font-semibold text-rose-800 dark:text-rose-300">Stated Reason:</strong>{" "}
                    {session.cancellationReason}
                  </p>
                )}
              </div>
            )}

            {/* মেন্টর প্রোফাইল কার্ড */}
            <div className="p-4 sm:p-5 rounded-[12px] bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-2xs">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Assigned Expert
              </span>
              <div className="flex flex-col  sm:items-center justify-center items-center gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative size-12 sm:size-14 rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0">
                    {session.mentor?.user?.profileURL ? (
                      <Image
                        src={session.mentor.user.profileURL}
                        alt={session.mentor.user.name || "Mentor"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center font-bold text-sm text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                        {session.mentor?.user?.name
                          ? session.mentor.user.name.slice(0, 2).toUpperCase()
                          : "ME"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {session.mentor?.user?.name || "Verified Mentor"}
                    </h4>
                    {session.mentor?.headline && (
                      <p className="text-xs text-zinc-500 font-medium mt-0.5">
                        {session.mentor.headline}
                      </p>
                    )}
                    {session.mentor?.user?.email && (
                      <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-1">
                        <Mail className="size-3 text-orange-500" />
                        {session.mentor.user.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="self-start px-3 py-1.5 rounded-[12px] bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 min-w-full">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Session Rate
                  </span>
                  <p className="text-base font-black text-orange-600 dark:text-orange-500">
                    ${session.sessionFees}
                  </p>
                </div>
              </div>
            </div>

            {/* টাইম ও শিডিউল গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-1 shadow-2xs">
                <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="size-3.5 text-orange-500" /> Booking Date
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {session.sessionDate
                    ? format(new Date(session.sessionDate), "EEEE, dd MMMM, yyyy")
                    : "N/A"}
                </p>
              </div>

              <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-1 shadow-2xs">
                <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Clock className="size-3.5 text-sky-500" /> Slot Time Window
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {formatSlotTime(session.startUTC)} - {formatSlotTime(session.endUTC)}
                </p>
              </div>
            </div>

            {/* সেশন পারপাস ও এজেন্ডা */}
            <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 space-y-2 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Target className="size-3.5 text-orange-500" /> Discussion Agenda & Objective
              </span>
              <div className="p-3.5 rounded-[12px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800 text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line">
                {session.purpose || "No specific purpose provided during booking."}
              </div>
            </div>

            {/* পেমেন্ট ও ইনভয়েস অডিট */}
            {session.payment && (
              <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Receipt className="size-3.5 text-orange-500" /> Payment & Transaction Ledger
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    {session.payment.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50 flex justify-between items-center">
                    <span className="text-zinc-500">Gross Paid</span>
                    <span className="font-black text-sm text-zinc-900 dark:text-zinc-100">
                      ${session.payment.amount || session.sessionFees}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50 flex justify-between items-center">
                    <span className="text-zinc-500">Trx ID</span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(session.payment?.transactionId || "")}
                      className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <span>{session.payment.transactionId}</span>
                      {copied ? (
                        <Check className="size-3 text-emerald-500" />
                      ) : (
                        <Copy className="size-3 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </div>

                {session.payment.paidAt && (
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <span>Processed At</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {formatSafeDate(session.payment.paidAt)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* মেন্টর ফিডব্যাক নোট (সেশন কমপ্লিট হলে) */}
            {session.feedbackByMentor && (
              <div className="rounded-[12px] border border-orange-500/20 bg-orange-500/5 dark:bg-orange-950/20 p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" /> Mentor's Follow-up Feedback
                </span>
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line italic">
                  "{session.feedbackByMentor}"
                </p>
              </div>
            )}

            {/* অ্যাকশন বাটন সেকশন: ভিডিও কল লিংক অথবা পেন্ডিং পেমেন্ট */}
            <div className="pt-2">
              {session.meetingLink && isConfirmed && !isCompleted ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full h-11 rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 font-bold shadow-xs active:scale-[0.98] transition-all text-xs sm:text-sm gap-2"
                >
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Video className="size-4 text-orange-500" />
                    <span>Join Google Meet Room</span>
                    <ExternalLink className="size-3.5 ml-1 opacity-70" />
                  </a>
                </Button>
              ) : isPendingStatus ? (
                <div className="p-3.5 rounded-[12px] bg-amber-500/10 border border-amber-500/20 text-center text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Payment is pending for this slot. Complete payment from the sessions table to confirm.
                </div>
              ) : isCompleted ? (
                <div className="p-3.5 rounded-[12px] bg-purple-500/10 border border-purple-500/20 text-center text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="size-4" />
                  This session has concluded successfully.
                </div>
              ) : null}
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 p-12 text-center text-zinc-400">
            <FileQuestion className="size-8 text-zinc-300 dark:text-zinc-700" />
            <p className="text-xs">No session record found.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}