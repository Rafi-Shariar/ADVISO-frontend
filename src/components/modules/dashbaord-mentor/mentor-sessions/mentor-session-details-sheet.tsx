"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSessionDetailsMentor } from "@/hooks/session.hook";
import {
  formatScheduleDate,
  formatSlotTime,
} from "@/utils/date-time-converter";
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  Loader2,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Star,
  Target,
  Mail,
  FileQuestion,
} from "lucide-react";

interface MentorSessionDetailsSheetProps {
  sessionId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MentorSessionDetailsSheet = ({
  sessionId,
  open,
  onOpenChange,
}: MentorSessionDetailsSheetProps) => {
  const { data, isPending } = useSessionDetailsMentor(sessionId || "");
  const session = data?.data;

  const isCompleted = session?.completedSession;
  const isConfirmed =
    session?.status === "COMFIRMED" || session?.status === "CONFIRMED";
  const isCancelled = session?.status === "CANCELLED";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md w-full overflow-y-auto p-0 flex flex-col gap-0 border-l border-border/80 bg-background">
        {/* 1. Header */}
        <div className="p-6 border-b border-border/60 bg-muted/20">
          <SheetHeader className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                #{session?.sessionId?.slice(0, 8) || sessionId?.slice(0, 8)}
              </span>
              {session && (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                    isCompleted
                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                      : isConfirmed
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : isCancelled
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isCompleted
                        ? "bg-purple-500"
                        : isConfirmed
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                    }`}
                  />
                  {isCompleted ? "Completed" : session.status}
                </span>
              )}
            </div>
            <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
              Session Dossier
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Comprehensive overview of the scheduled mentorship engagement.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* 2. Content Area */}
        {isPending ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-muted-foreground">
            <Loader2 className="size-7 animate-spin text-orange-500" />
            <p className="text-xs font-medium tracking-wide">
              Loading session details...
            </p>
          </div>
        ) : session ? (
          <div className="flex-1 p-6 space-y-6">
            {/* Student Profile Card */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-muted/30 border border-border/70 shadow-2xs">
              <div className="relative size-12 rounded-xl overflow-hidden bg-background border border-border/70 shrink-0">
                {session.user?.profileURL ? (
                  <Image
                    src={session.user.profileURL}
                    alt={session.user.name || "Student"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center font-bold text-base text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                    {session.user?.name
                      ? session.user.name.slice(0, 2).toUpperCase()
                      : "ST"}
                  </div>
                )}
              </div>
              <div className="truncate">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Mentee / Student
                </span>
                <h4 className="text-sm font-bold text-foreground truncate">
                  {session.user?.name || "Anonymous Student"}
                </h4>
                <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                  <Mail className="size-3 text-orange-500 shrink-0" />
                  {session.user?.email || "No email available"}
                </p>
              </div>
            </div>

            {/* Quick Metrics: Fee & Timing */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-card border border-border/70 shadow-2xs space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="size-3.5 text-emerald-500" /> Fee Paid
                </span>
                <p className="text-lg font-black text-foreground">
                  ${session.sessionFees || "0"}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/70 shadow-2xs space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sky-500" /> Session
                  Status
                </span>
                <p className="text-xs font-bold text-foreground truncate mt-1">
                  {isCompleted ? "Marked Complete" : "Upcoming Slot"}
                </p>
              </div>
            </div>

            {/* Date & Time Window */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Calendar className="size-4 text-orange-500" /> Date
                </span>
                <span className="font-semibold text-foreground">
                  {session.slot?.schedule?.date
                    ? formatScheduleDate(session.slot.schedule.date)
                    : session.sessionDate
                      ? formatScheduleDate(session.sessionDate)
                      : "Not specified"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm border-t border-border/50 pt-2.5">
                <span className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Clock className="size-4 text-sky-500" /> Slot Time
                </span>
                <span className="font-semibold text-foreground">
                  {session.slot?.startTime
                    ? formatSlotTime(session.slot.startTime)
                    : formatSlotTime(session.startUTC)}{" "}
                  -{" "}
                  {session.slot?.endTime
                    ? formatSlotTime(session.slot.endTime)
                    : formatSlotTime(session.endUTC)}
                </span>
              </div>
            </div>

            {/* Purpose / Agenda */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Target className="size-3.5 text-orange-500" /> Purpose &
                Discussion Agenda
              </span>
              <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/60 text-xs sm:text-sm leading-relaxed text-foreground whitespace-pre-line">
                {session.purpose ||
                  "No specific purpose stated for this booking."}
              </div>
            </div>

            {/* Student Review & Feedback (If completed & reviewed) */}
            {session.review && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/10 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />{" "}
                    Mentee Rating
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                    {session.review.ratings} / 5.0
                  </span>
                </div>
                <p className="text-xs text-foreground/90 italic leading-relaxed">
                  "{session.review.comment}"
                </p>
              </div>
            )}

            {/* Cancellation Notice (If cancelled) */}
            {session.cancellationReason && (
              <div className="p-3.5 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-700 dark:text-rose-400 space-y-1">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <AlertCircle className="size-3.5" /> Cancellation Reason
                </span>
                <p className="text-xs">{session.cancellationReason}</p>
              </div>
            )}

            {/* Meeting Link CTA */}
            {session.meetingLink && !isCancelled && (
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 text-xs sm:text-sm active:scale-[0.98] transition-all"
                >
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Video className="size-4" />
                    <span>Join Video Call</span>
                    <ExternalLink className="size-3.5 ml-1 opacity-70" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 p-8 text-muted-foreground text-center">
            <FileQuestion className="size-8 text-muted-foreground/60" />
            <p className="text-xs">No dossier record found for this session.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
