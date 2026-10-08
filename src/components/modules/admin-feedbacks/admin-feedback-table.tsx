"use client";

import React from "react";
import { Star, MessageSquareQuote, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";
import { useGetAllReviewAdmin } from "@/hooks/review.hook";
import AdminReviewTableSkeleton from "./admin-feedback-table-skeleton";
import { IFeedback } from "@/types/review.type";
import { formatScheduleDate } from "@/utils/date-time-converter";

const FeedbackTableAdmin = () => {
  const { data, isPending } = useGetAllReviewAdmin();

  if (isPending) {
    return <AdminReviewTableSkeleton />;
  }

  const feedbacks: IFeedback[] = data?.data || [];

  return (
    <div className="w-full">
      <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-2xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-800/40">
              <TableHead className="w-[220px]">Mentor Name</TableHead>
              <TableHead className="w-[220px]">Mentee / User</TableHead>
              <TableHead>Session Date</TableHead>
              <TableHead className="text-right">Ratings</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {feedbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="p-0">
                  <EmptyTableUI />
                </TableCell>
              </TableRow>
            ) : (
              feedbacks.map((feedback: IFeedback) => (
                <React.Fragment key={feedback.reviewId}>
                  {/* Row 1: Session & Reviewers Metadata */}
                  <TableRow className="border-b-0 hover:bg-zinc-50/40 dark:hover:bg-zinc-800/20">
                    {/* Mentor */}
                    <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100">
                      <div>
                        <p className="text-xs font-bold">
                          {feedback.mentor?.user?.name || "N/A"}
                        </p>
                        <p className="text-[11px] text-zinc-400 font-mono font-normal">
                          {feedback.mentor?.user?.email || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Mentee / User */}
                    <TableCell className="text-zinc-700 dark:text-zinc-300">
                      <div>
                        <p className="text-xs font-semibold">
                          {feedback.session?.user?.name || "N/A"}
                        </p>
                        <p className="text-[11px] text-zinc-400 font-mono font-normal">
                          {feedback.session?.user?.email || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Session Date */}
                    <TableCell className="text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3 text-zinc-400" />
                        {feedback.session?.sessionDate
                          ? formatScheduleDate(feedback.session.sessionDate)
                          : "N/A"}
                      </span>
                    </TableCell>

                    {/* Rating Badge */}
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[12px] text-amber-700 dark:text-amber-400 text-xs font-black">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span>{feedback.ratings || "5.0"}</span>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Row 2: Full Width Comment Box (colSpan 4) */}
                  <TableRow className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={4} className="pt-0 pb-4 px-4">
                      <div className="flex items-start gap-2.5 p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
                        <MessageSquareQuote className="size-4 text-orange-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5 text-left">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                            Feedback
                          </span>
                          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                            "
                            {feedback.comment ||
                              "No detailed written feedback provided."}
                            "
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeedbackTableAdmin;
