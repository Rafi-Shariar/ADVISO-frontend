import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="rounded-[12px] bg-white dark:bg-zinc-900 border border-border/70 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between relative select-none">
      {/* Wide Aspect Banner Image Skeleton */}
      <div className="w-full sm:w-[200px] h-[160px] sm:h-auto shrink-0 rounded-[12px] overflow-hidden">
        <Skeleton className="w-full h-full min-h-[160px] rounded-[12px]" />
      </div>

      {/* Content & Author Strip Skeleton */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-2.5">
          {/* Date & Read Time Strip */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-20 rounded-[6px]" />
            <Skeleton className="size-1 rounded-full" />
            <Skeleton className="h-3 w-16 rounded-[6px]" />
          </div>

          {/* Title (2 lines) */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-4 sm:h-5 w-[90%] rounded-[6px]" />
            <Skeleton className="h-4 sm:h-5 w-[65%] rounded-[6px]" />
          </div>

          {/* Content Excerpt (2 lines) */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3 w-full rounded-[6px]" />
            <Skeleton className="h-3 w-4/5 rounded-[6px]" />
          </div>
        </div>

        {/* Mentor / Author Pod Skeleton */}
        <div className="pt-3 mt-4 border-t border-border/40 flex items-center gap-2.5">
          <Skeleton className="size-7 rounded-full shrink-0" />
          <div className="space-y-1 flex-1 min-w-0">
            <Skeleton className="h-3 w-24 rounded-[4px]" />
            <Skeleton className="h-2.5 w-36 rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  );
}