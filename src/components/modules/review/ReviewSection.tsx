"use client";
import { useFeaturedReviews } from "@/hooks/review.hook";
import { IReview } from "@/types/review.type";
import React from "react";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import { ReviewCard } from "./ReviewCard";

const ReviewSection = () => {
  const { data, isPending } = useFeaturedReviews();

  const reviews: IReview[] = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-16">
      <div className="text-center space-y-2 mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Experience from our service
        </h2>
        <p className="text-xs text-muted-foreground">
          A zero-fluff pipeline to take you from stuck to clarity in 48 hours.
        </p>
      </div>

      <div>
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.comment} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
