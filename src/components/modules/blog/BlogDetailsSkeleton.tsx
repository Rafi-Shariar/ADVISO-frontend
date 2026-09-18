import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Skeleton className="w-full h-[280px] sm:h-[400px] rounded-[12px]" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-11 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-36 rounded-[4px]" />
          <Skeleton className="h-3 w-52 rounded-[4px]" />
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <Skeleton className="h-8 w-4/5 rounded-[6px]" />
        <Skeleton className="h-4 w-full rounded-[6px]" />
        <Skeleton className="h-4 w-full rounded-[6px]" />
        <Skeleton className="h-4 w-3/4 rounded-[6px]" />
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
