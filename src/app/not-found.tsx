import Link from "next/link";
import { ArrowLeft, Home, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] dark:bg-zinc-950 selection:bg-orange-500/20 selection:text-orange-600">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Visual Badge & 404 Accent Display */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Subtle Orange Glow Ambient */}
          <div className="absolute size-48 rounded-[12px] bg-orange-500/10 dark:bg-orange-500/5 blur-3xl pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="size-3.5" />
            <span>Navigation Drift</span>
          </div>

          {/* Large Stylized 404 Header */}
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 select-none">
            4<span className="text-orange-600">0</span>4
          </h1>
        </div>

        {/* Narrative Description */}
        <div className="space-y-2.5 max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Lost in the roadmap?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The page or strategy session you are looking for has been moved, rescheduled, or doesn't exist in our verified directory.
          </p>
        </div>

        {/* Quick Route Suggestions / Memo Card */}
        <div className="p-4 rounded-[12px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs max-w-sm mx-auto text-left space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            <span>Route Memo</span>
            <span className="text-orange-600 font-bold">Suggested Action</span>
          </div>
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            "Verify the link destination or browse top industry leaders."
          </p>
        </div>

        {/* Action Button Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            asChild
            className="w-full sm:w-auto h-11 px-5 rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all gap-2"
          >
            <Link href="/">
              <Home className="size-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-11 px-5 rounded-[12px] border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 text-xs sm:text-sm font-bold shadow-2xs active:scale-[0.98] transition-all gap-2"
          >
            <Link href="/mentors">
              <Compass className="size-4 text-orange-500" />
              <span>Explore Mentors</span>
            </Link>
          </Button>
        </div>

      </div>
    </main>
  );
}