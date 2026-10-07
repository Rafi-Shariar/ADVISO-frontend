import Image from "next/image";
import { Star, MessageSquare } from "lucide-react";
import { IReview } from "@/types/mentor.type";

interface ReviewsTabProps {
  reviews: IReview[];
  averageRatings: string;
  totalReviews: number;
}

export const ReviewsTab = ({ reviews, averageRatings, totalReviews }: ReviewsTabProps) => {
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div>
          <h3 className="text-base font-bold text-foreground">Mentee Reviews</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Average Score: <strong className="text-foreground">{averageRatings}</strong> across {totalReviews} reviews
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
          <MessageSquare className="size-8 text-muted-foreground/50" />
          <span>No student reviews recorded yet.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev, idx) => {
            const avatar = rev.session?.user?.profileURL?.trim();
            const studentName = rev.session?.user?.name || "Verified Student";

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-border/50 bg-muted/20 dark:bg-muted/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative size-8 rounded-full overflow-hidden bg-muted border border-border">
                      {avatar ? (
                        <Image src={avatar} alt={studentName} fill className="object-cover" />
                      ) : (
                        <div className="size-full flex items-center justify-center font-bold text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                          {studentName.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{studentName}</span>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    <Star className="size-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                      {rev.ratings}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
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