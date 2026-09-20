import { IReview } from "@/types/review.type";
import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  review: IReview;
}
export const ReviewCard = ({ review }: ReviewCardProps) => {
  const ratingValue = parseFloat(review.ratings) || 5;

  return (
    <div className="rounded-[12px]  bg-card border border-border/70 hover:border-orange-500/40 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
      <div className="space-y-3">
        {/* Rating Stars & Numeric Value */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <Star
                key={n}
                className={`size-3.5 ${
                  i < Math.floor(ratingValue)
                    ? "fill-orange-500 text-orange-500"
                    : "fill-muted text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-foreground">
            {Number(ratingValue).toFixed(1)}
          </span>
        </div>

        {/* Review Comment */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-4">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* User Info Strip */}
      <div className="pt-3.5 mt-4 border-t border-border/40 flex items-center gap-2.5">
        <div className="relative size-8 rounded-full overflow-hidden bg-muted border border-border/60 shrink-0">
          <Image
            src={
              review.session?.user?.profileURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                review.session?.user?.name || "User",
              )}&background=ea580c&color=fff&bold=true`
            }
            alt={review.session?.user?.name || "User"}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground truncate">
            {review.session?.user?.name || "Anonymous Mentee"}
          </p>
          <span className="text-[10px] text-muted-foreground font-mono">
            Verified Mentee
          </span>
        </div>
      </div>
    </div>
  );
};
