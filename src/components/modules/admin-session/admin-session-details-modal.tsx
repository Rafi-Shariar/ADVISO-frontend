"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  CreditCard,
  UserCheck,
  GraduationCap,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Receipt,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSessionDetails } from "@/hooks/session.hook";
import { ISessionDetailsAdmin } from "@/types/session.type";
import { formatScheduleDate, formatSlotTime } from "@/utils/date-time-converter";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

const getStatusBadge = (status: string) => {
  const normalized = status?.toUpperCase() || "";
  switch (normalized) {
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="size-3.5" />
          Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          <XCircle className="size-3.5" />
          Cancelled
        </span>
      );
    case "CONFIRMED":
    case "SCHEDULED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
          <Clock className="size-3.5" />
          {status}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <AlertCircle className="size-3.5" />
          {status || "Pending"}
        </span>
      );
  }
};

const AdminSessionDetailsModal = ({ onOpenChange, open, id }: Props) => {
  const { data, isPending } = useSessionDetails(id);
  const details: ISessionDetailsAdmin | undefined = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-border/70 shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-border/60 bg-muted/30">
          <DialogHeader className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <Sparkles className="size-4" />
                </div>
                <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  Session #{id ? id.slice(0, 8).toUpperCase() : ""}
                </DialogTitle>
              </div>
              {details && getStatusBadge(details.status)}
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Detailed breakdown of schedule, attendees, payment verification, and notes.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content Body */}
        {isPending ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="size-9 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
            <p className="text-xs font-mono text-muted-foreground tracking-wide">Loading session details...</p>
          </div>
        ) : !details ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No session information found.
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Top Quick Bar: Schedule & Meeting Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-card border border-border/70 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <Calendar className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Date</p>
                  <p className="text-xs font-bold text-foreground">
                    {formatScheduleDate(details.sessionDate || details.slot?.schedule?.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Slot Time</p>
                  <p className="text-xs font-bold text-foreground">
                    {formatSlotTime(details.slot?.startTime)} - {formatSlotTime(details.slot?.endTime)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <Video className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Meeting Link</p>
                  {details.meetingLink ? (
                    <Link
                      href={details.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1 truncate"
                    >
                      <span>Join Room</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </Link>
                  ) : (
                    <p className="text-xs text-muted-foreground">Not provided</p>
                  )}
                </div>
              </div>
            </div>

            {/* Participants Grid: Student vs Mentor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student Card */}
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <UserCheck className="size-3.5 text-orange-500" />
                    Student / Mentee
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                    {details.user?.accountStatus || "ACTIVE"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                    <Image
                      src={details.user?.profileURL || "/default-avatar.png"}
                      alt={details.user?.name || "Student"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">{details.user?.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{details.user?.email}</p>
                    <p className="text-[11px] font-mono text-muted-foreground/70 mt-0.5">
                      ID: {details.user?.userId?.slice(0, 10)}...
                    </p>
                  </div>
                </div>
              </div>

              {/* Mentor Card */}
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <GraduationCap className="size-3.5 text-orange-500" />
                    Mentor Profile
                  </div>
                  <span className="text-xs font-bold text-orange-500">
                    ${details.mentor?.sessionCharge}/session
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                    <Image
                      src={details.mentor?.user?.profileURL || "/default-avatar.png"}
                      alt={details.mentor?.user?.name || "Mentor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {details.mentor?.user?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {details.mentor?.headline || details.mentor?.user?.email}
                    </p>
                    <p className="text-[11px] font-mono text-muted-foreground/70 mt-0.5">
                      ID: {details.mentor?.mentorId?.slice(0, 10)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose & Objective */}
            <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1.5">
              <p className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground">
                Session Purpose & Agenda
              </p>
              <p className="text-xs sm:text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                {details.purpose || "No specific goal specified for this session."}
              </p>
            </div>

            {/* Cancellation Notice (If Cancelled) */}
            {details.cancellationReason && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1 text-rose-700 dark:text-rose-400">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="size-3.5" />
                  Cancellation Reason
                </div>
                <p className="text-xs leading-relaxed">{details.cancellationReason}</p>
                {details.cancelledAt && (
                  <p className="text-[10px] font-mono opacity-80 pt-1">
                    Cancelled on: {formatScheduleDate(details.cancelledAt)}
                  </p>
                )}
              </div>
            )}

            {/* Financial & Payment Breakdown */}
            <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <CreditCard className="size-3.5 text-orange-500" />
                  Billing & Payment Breakdown
                </div>
                {details.payment ? (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Paid via {details.payment.bkashPaymentId ? "bKash" : "Gateway"}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-500">Unpaid / Manual</span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Total Fee</p>
                  <p className="text-base font-extrabold text-foreground mt-0.5">
                    ${details.sessionFees || details.payment?.amount || 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Platform Fee</p>
                  <p className="text-base font-extrabold text-muted-foreground mt-0.5">
                    ${details.payment?.platformCharge ?? 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Mentor Payout</p>
                  <p className="text-base font-extrabold text-emerald-500 mt-0.5">
                    ${details.payment?.mentorEarnings ?? 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Transaction ID</p>
                  <p className="text-xs font-mono font-bold text-foreground truncate mt-1">
                    {details.payment?.transactionId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Mentor Feedback & Review Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mentor Feedback */}
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <MessageSquare className="size-3.5 text-orange-500" />
                  Mentor Feedback
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed italic">
                  {details.feedbackByMentor
                    ? `"${details.feedbackByMentor}"`
                    : "No post-session mentor feedback provided yet."}
                </p>
              </div>

              {/* Student Review */}
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    Student Review
                  </div>
                  {details.review?.ratings && (
                    <span className="text-xs font-bold text-amber-500">
                      ★ {details.review.ratings}/5
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed italic">
                  {details.review?.comment
                    ? `"${details.review.comment}"`
                    : "No review submitted by the student."}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminSessionDetailsModal;