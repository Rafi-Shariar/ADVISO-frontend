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

import { formatPaidDate, formatSlotTime } from "@/utils/date-time-converter";
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
} from "lucide-react";
import { useSessionDetailsUser } from "@/hooks/session.hook";

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
  const session = data?.data;

  const isConfirmed =
    session?.status === "COMFIRMED" || session?.status === "CONFIRMED";
  const isCompleted = session?.completedSession;
  const isCancelled = session?.status === "CANCELLED";

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          <CheckCircle2 className="size-3.5" />
          Completed
        </span>
      );
    }
    if (isConfirmed) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Confirmed
        </span>
      );
    }
    if (isCancelled) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 border border-rose-500/20">
          <AlertCircle className="size-3.5" />
          Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
        <Clock3 className="size-3.5" />
        {session?.status || "Pending"}
      </span>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md w-full overflow-y-auto p-0 flex flex-col gap-0 border-l border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {/* ১. হেডার সেকশন */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <SheetHeader className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
                #{session?.sessionId?.slice(0, 8) || sessionId?.slice(0, 8)}
              </span>
              {session && getStatusBadge()}
            </div>
            <SheetTitle className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Session Overview
            </SheetTitle>
            <SheetDescription className="text-xs text-zinc-500">
              Details and access credentials for your upcoming 1:1 strategy call.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* ২. কনটেন্ট সেকশন */}
        {isPending ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-12 text-zinc-400">
            <Loader2 className="size-8 text-orange-500 animate-spin" />
            <p className="text-xs font-semibold tracking-wide">
              Loading session details...
            </p>
          </div>
        ) : session ? (
          <div className="flex-1 p-6 space-y-5">
            {/* মেন্টর কার্ড */}
            <div className="p-4 rounded-[12px] bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-2xs">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Assigned Mentor
              </span>
              <div className="flex items-center gap-3.5">
                <div className="relative size-12 rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0">
                  {session.mentor?.user?.profileURL ? (
                    <Image
                      src={session.mentor.user.profileURL}
                      alt={session.mentor.user.name || "Mentor"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center font-bold text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                      {session.mentor?.user?.name
                        ? session.mentor.user.name.slice(0, 2).toUpperCase()
                        : "ME"}
                    </div>
                  )}
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {session.mentor?.user?.name || "Verified Mentor"}
                  </h4>
                  {session.mentor?.headline && (
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {session.mentor.headline}
                    </p>
                  )}
                  {session.mentor?.user?.email && (
                    <p className="text-[11px] text-zinc-400 truncate flex items-center gap-1 mt-1">
                      <Mail className="size-3 text-orange-500 shrink-0" />
                      {session.mentor.user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* শিডিউল সময় ও তারিখ কার্ড */}
            <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-zinc-500 font-medium">
                  <Calendar className="size-4 text-orange-500" /> Session Date
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {session.sessionDate
                    ? format(new Date(session.sessionDate), "EEEE, dd MMMM, yyyy")
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
                <span className="flex items-center gap-2 text-zinc-500 font-medium">
                  <Clock className="size-4 text-zinc-400" /> Slot Time
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {formatSlotTime(session.startUTC)} - {formatSlotTime(session.endUTC)}
                </span>
              </div>
            </div>

            {/* সেশন পারপাস / এজেন্ডা */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Target className="size-3.5 text-orange-500" /> Discussion Agenda
              </span>
              <div className="p-3.5 rounded-[12px] bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line">
                {session.purpose || "No specific purpose provided."}
              </div>
            </div>

            {/* পেমেন্ট ইনফো */}
            {session.payment && (
              <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-2.5 shadow-2xs text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Receipt className="size-3.5 text-orange-500" /> Payment Summary
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-[12px] text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    {session.payment.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Amount Paid</span>
                  <span className="font-black text-sm text-zinc-900 dark:text-zinc-100">
                    ${session.payment.amount || session.sessionFees}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Transaction ID</span>
                  <span className="font-mono text-zinc-600 dark:text-zinc-400 font-semibold">
                    {session.payment.transactionId || "N/A"}
                  </span>
                </div>
{session.payment.paidAt && (
  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
    <span>Paid Date</span>
    <span>{formatPaidDate(session.payment.paidAt)}</span>
  </div>
)}
              </div>
            )}

            {/* ফিডব্যাক (যদি মেন্টর দিয়ে থাকেন) */}
            {session.feedbackByMentor && (
              <div className="p-3.5 rounded-[12px] bg-orange-500/5 border border-orange-500/20 text-xs space-y-1">
                <span className="font-bold text-orange-600 uppercase tracking-wider text-[10px]">
                  Mentor's Feedback Note
                </span>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {session.feedbackByMentor}
                </p>
              </div>
            )}

            {/* মিটিং বাটন */}
            {session.meetingLink && !isCancelled && (
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 font-bold shadow-xs active:scale-[0.98] transition-all text-xs sm:text-sm gap-2"
                >
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Video className="size-4 text-orange-500" />
                    <span>Join Google Meet Session</span>
                    <ExternalLink className="size-3.5 ml-1 opacity-70" />
                  </a>
                </Button>
              </div>
            )}
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