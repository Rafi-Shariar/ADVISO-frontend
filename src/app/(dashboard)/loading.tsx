import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Background Soft Glow matching not-found & hero */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-orange-400/10 blur-[100px]" />

      <div className="mx-auto flex max-w-md flex-col items-center">
        {/* Rounded Icon Card matching not-found aesthetic */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/80 bg-background/80 shadow-sm backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Preparing your workspace
        </h2>

        {/* Animated text description */}
        <p className="mt-3 flex items-center justify-center text-sm text-muted-foreground sm:text-base">
          <span>Loading trajectory details</span>
          <span className="ml-1 inline-flex tracking-widest text-orange-500 font-bold">
            <span className="animate-bounce [animation-delay:-0.3s]">.</span>
            <span className="animate-bounce [animation-delay:-0.15s]">.</span>
            <span className="animate-bounce">.</span>
          </span>
        </p>
      </div>
    </div>
  );
}