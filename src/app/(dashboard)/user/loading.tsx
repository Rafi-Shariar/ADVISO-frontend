import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center px-4 text-center">
      {/* Dynamic Background Multi-layer Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[80px]" />

      {/* Centered Glassmorphic Loading Card */}
      <div className="flex flex-col items-center rounded-3xl border border-border/70 bg-card/60 px-8 py-9 shadow-lg shadow-black/5 backdrop-blur-md">
        
        {/* Glow Ring with Dual Spinner */}
        <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-background/90 shadow-sm">
          {/* Subtle pulse ring behind icon */}
          <div className="absolute inset-0 animate-ping rounded-2xl bg-orange-500/10 opacity-75 duration-1000" />
          
          <Loader2 className="relative h-8 w-8 animate-spin text-orange-500" strokeWidth={2.2} />
        </div>

        {/* Text Area */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Loading Workspace
          </h3>
          
          <div className="flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-muted-foreground">
            <span>Fetching trajectories and session data</span>
            <span className="flex items-center tracking-widest text-orange-500 font-bold">
              <span className="inline-block animate-bounce [animation-delay:-0.3s]">.</span>
              <span className="inline-block animate-bounce [animation-delay:-0.15s]">.</span>
              <span className="inline-block animate-bounce">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}