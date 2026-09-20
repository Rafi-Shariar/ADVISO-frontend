import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ReviewCardSkeleton = () => {
  return (
    <div className="rounded-[12px] bg-card border border-border/60 p-4 sm:p-5 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Rating Stars Skeleton */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            {[1,2,3,4,5].map((n, i) => (
              <Skeleton key={n} className="size-3.5 rounded-[4px]" />
            ))}
          </div>
          <Skeleton className="h-3.5 w-6 rounded-[4px]" />
        </div>

        {/* Comment Lines Skeleton */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-3.5 w-full rounded-[4px]" />
          <Skeleton className="h-3.5 w-11/12 rounded-[4px]" />
          <Skeleton className="h-3.5 w-4/5 rounded-[4px]" />
        </div>
      </div>

      {/* User Info Skeleton */}
      <div className="pt-3.5 border-t border-border/40 flex items-center gap-2.5">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <Skeleton className="h-3.5 w-24 rounded-[4px]" />
          <Skeleton className="h-2.5 w-16 rounded-[4px]" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;