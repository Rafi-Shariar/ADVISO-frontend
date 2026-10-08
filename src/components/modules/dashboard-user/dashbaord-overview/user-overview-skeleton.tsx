import { Skeleton } from "@/components/ui/skeleton";

export default function UserOverviewSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-[12px]" />
        <Skeleton className="h-4 w-72 rounded-[12px]" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[12px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-3.5 w-24 rounded-[12px]" />
              <Skeleton className="size-8 rounded-[12px]" />
            </div>
            <Skeleton className="h-7 w-16 rounded-[12px]" />
          </div>
        ))}
      </div>

      {/* Next Session & Quick Nav Card Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-[12px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4">
          <Skeleton className="h-5 w-40 rounded-[12px]" />
          <Skeleton className="h-24 w-full rounded-[12px]" />
        </div>
        <div className="p-6 rounded-[12px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4">
          <Skeleton className="h-5 w-32 rounded-[12px]" />
          <Skeleton className="h-20 w-full rounded-[12px]" />
        </div>
      </div>
    </div>
  );
}
