export const ScheduleSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-[12px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-[8px] bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-1">
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
            <div className="size-6 bg-zinc-200 dark:bg-zinc-800 rounded-[8px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[1, 2, 3, 4, 5, 6].map((j) => (
              <div
                key={j}
                className="h-16 rounded-[12px] bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-800"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
