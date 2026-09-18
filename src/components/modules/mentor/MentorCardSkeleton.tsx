import { Skeleton } from "@/components/ui/skeleton";

export function MentorCardSkeleton() {
  return (
    <div className="shrink-0 w-[240px] sm:w-[250px] snap-start rounded-[12px] bg-card border border-border/60 p-3 flex flex-col justify-between select-none">
      <div>
        {/* Square Image Skeleton with Badge Placeholder */}
        <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-3 border border-border/40">
          <Skeleton className="w-full h-full rounded-[12px]" />
          {/* Rating Badge Skeleton */}
          <div className="absolute bottom-2 left-2">
            <Skeleton className="h-5 w-16 rounded-[8px] bg-foreground/10" />
          </div>
        </div>

        {/* Mentor Info Skeleton */}
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-3/4 rounded-[6px]" />
          <Skeleton className="h-3.5 w-full rounded-[6px]" />
        </div>
      </div>

      {/* Meta Strip Skeleton */}
      <div className="pt-2.5 mt-3 border-t border-border/40 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16 rounded-[4px]" />
          <Skeleton className="h-2.5 w-12 rounded-[4px]" />
        </div>

        <div className="flex items-center gap-1.5">
          <Skeleton className="size-3.5 rounded-full shrink-0" />
          <Skeleton className="h-3 w-4/5 rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}
