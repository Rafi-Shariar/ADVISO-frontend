import React from "react";
import { Star, MessageSquareQuote, ThumbsUp, Sparkles } from "lucide-react";

export interface IFeedbackOverview {
  averagePlatformRating: number;
  totalReviews: number;
}

interface Props {
  feedback?: IFeedbackOverview;
}

export const FeedbackCards = ({ feedback }: Props) => {
  const rating = Number(feedback?.averagePlatformRating ?? 0);
  const totalReviews = feedback?.totalReviews ?? 0;

  // Approximate satisfaction percentage derived from a 5-star baseline
  const satisfactionRate =
    rating > 0 ? Math.min(100, Math.round((rating / 5) * 100)) : 0;

  return (
    <div className="rounded-[12px] border border-border/70 bg-card p-6">
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-border/40">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Platform Reputation & Quality
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Mentee sentiment metrics based on verified post-session reviews
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[11px] font-mono text-orange-500">
          <Sparkles className="size-3.5" />
          <span>{satisfactionRate}% Satisfaction Index</span>
        </div>
      </div>

      {/* Hero Feedback Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
        {/* Left: Star Rating Scoreboard */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-[10px] bg-muted/20 border border-border/50">
          <div className="text-center sm:text-left">
            <span className="text-5xl font-black font-mono tracking-tight text-foreground">
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </span>
            <span className="text-sm font-mono text-muted-foreground ml-1">
              / 5.0
            </span>

            {/* Dynamic Star Group */}
            <div className="flex items-center gap-1 mt-2 justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(rating)
                      ? "fill-orange-500 text-orange-500"
                      : "fill-muted text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-px sm:h-12 w-full sm:w-px bg-border/60 my-auto" />

          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-semibold text-foreground">
              Community Consensus
            </span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Calculated across all completed and evaluated booking
              interactions.
            </p>
          </div>
        </div>

        {/* Right: Metrics & Volume Breakdown */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Total Testimonials Logged */}
          <div className="rounded-[10px] bg-muted/20 border border-border/50 p-4 flex items-center gap-3.5">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-blue-500/10 border border-blue-500/20 shrink-0">
              <MessageSquareQuote className="size-5 text-blue-500" />
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Verified Reviews
              </span>
              <div className="text-2xl font-bold font-mono text-foreground mt-0.5">
                {totalReviews.toLocaleString()}
              </div>
              <p className="text-[10px] text-muted-foreground/70">
                Audited student testimonials
              </p>
            </div>
          </div>

          {/* Mentor Trust Score */}
          <div className="rounded-[10px] bg-muted/20 border border-border/50 p-4 flex items-center gap-3.5">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <ThumbsUp className="size-5 text-emerald-500" />
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Recommendation
              </span>
              <div className="text-2xl font-bold font-mono text-foreground mt-0.5">
                {satisfactionRate}%
              </div>
              <p className="text-[10px] text-muted-foreground/70">
                Positive feedback threshold
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCards;
