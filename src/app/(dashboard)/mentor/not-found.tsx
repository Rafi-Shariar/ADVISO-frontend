import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Background Soft Glow matching ADVISO hero */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-orange-400/10 blur-[100px]" />

      <div className="mx-auto flex max-w-xl flex-col items-center">
        {/* Subtle Icon Wrapper */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/80 bg-background/80 shadow-sm backdrop-blur-sm">
          <Compass className="h-8 w-8 text-orange-500" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Page not found
        </h1>

        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          The roadmap or resource you are looking for has been moved, renamed,
          or does not exist in this trajectory.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/mentor"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background shadow transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>

          <Link
            href="/mentor/sessions"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
          >
            Explore Sessions
          </Link>
        </div>
      </div>
    </div>
  );
}
