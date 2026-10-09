import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="relative flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center">
      {/* Subtle Warm Accent Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[80px]" />

      <div className="flex flex-col items-center gap-4">
        {/* Modern Spinner with ADVISO orange accent */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm">
          <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
        </div>

        {/* Animated Loading Text */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold tracking-wide text-foreground">
            Loading
          </span>
          <span className="flex items-center gap-0.5 text-orange-500 font-bold text-sm">
            <span className="inline-block animate-bounce [animation-delay:-0.3s]">.</span>
            <span className="inline-block animate-bounce [animation-delay:-0.15s]">.</span>
            <span className="inline-block animate-bounce">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}