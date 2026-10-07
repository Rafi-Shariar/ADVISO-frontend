import { Star, MessageSquareQuote, Calendar } from "lucide-react";

interface Review {
  reviewId: string;
  ratings: string;
  comment: string;
  createdAt: string;
}

interface MentorReviewsTabProps {
  reviews: Review[];
  averageRatings: string;
  totalReviews: number;
  totalSessions: number;
}

export const MentorReviewsTab = ({
  reviews,
  averageRatings,
  totalReviews,
  totalSessions,
}: MentorReviewsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Ratings Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Star className="size-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">
              {averageRatings || "0.0"}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Average Rating (out of 5)
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
            <MessageSquareQuote className="size-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">
              {totalReviews || 0}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Total Reviews Written
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Star className="size-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">
              {totalSessions || 0}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Mentorship Engagements
            </p>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/50">
          Mentee Feedback History
        </h3>

        {reviews.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No mentee reviews recorded yet.
          </div>
        ) : (
          <div className="space-y-3.5">
            {reviews.map((rev) => (
              <div
                key={rev.reviewId}
                className="p-4 rounded-2xl border border-border/50 bg-muted/20 dark:bg-muted/10 space-y-2 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                      {rev.ratings}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3 text-muted-foreground" />
                    {new Date(rev.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
