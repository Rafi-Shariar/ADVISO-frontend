import Image from "next/image";
import { Star } from "lucide-react";
import { IReview } from "@/types/mentor.type";

interface MentorReviewsTabProps {
  reviews: IReview[];
  averageRatings: string;
  totalReviews: number;
}

export const MentorReviewsTab = ({
  reviews,
  averageRatings,
  totalReviews,
}: MentorReviewsTabProps) => {
  return (
    <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header with Stats */}
      <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Student Testimonials
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Verified ratings and feedback from past 1-on-1 strategy sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{averageRatings || "5.0"}</span>
          <span className="text-[11px] text-zinc-400">({totalReviews} total)</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="py-14 text-center text-xs text-zinc-400">
          No reviews available yet for this mentor.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev, idx) => {
            const avatar = rev.session?.user?.profileURL?.trim();
            const studentName = rev.session?.user?.name || "Student";

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-[12px] border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative size-8 rounded-[12px] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      {avatar ? (
                        <Image src={avatar} alt={studentName} fill className="object-cover" />
                      ) : (
                        <div className="size-full flex items-center justify-center font-bold text-xs text-zinc-500">
                          {studentName.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {studentName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span>{rev.ratings}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};