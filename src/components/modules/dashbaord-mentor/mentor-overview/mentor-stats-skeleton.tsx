import { Skeleton } from "@/components/ui/skeleton";

export const MentorStatsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="h-32 rounded-[12px] bg-muted/40 border border-border/40 p-6 flex flex-col justify-center gap-3">
        <Skeleton className="h-7 w-56 rounded-[12px]" />
        <Skeleton className="h-4 w-96 rounded-[12px]" />
      </div>

      {/* 4-Stat Metric Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="p-5 rounded-[12px] border border-border/50 bg-card space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded-[12px]" />
              <Skeleton className="size-9 rounded-[12px]" />
            </div>
            <Skeleton className="h-8 w-28 rounded-[12px]" />
            <Skeleton className="h-3 w-36 rounded-[12px]" />
          </div>
        ))}
      </div>

      {/* Bento Grid Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 h-52 rounded-[12px] bg-card border border-border/50 p-6 space-y-4">
          <Skeleton className="h-5 w-40 rounded-[12px]" />
          <Skeleton className="h-20 w-full rounded-[12px]" />
        </div>
        <div className="lg:col-span-5 h-52 rounded-[12px] bg-card border border-border/50 p-6 space-y-4">
          <Skeleton className="h-5 w-44 rounded-[12px]" />
          <Skeleton className="h-24 w-full rounded-[12px]" />
        </div>
      </div>
    </div>
  );
};
