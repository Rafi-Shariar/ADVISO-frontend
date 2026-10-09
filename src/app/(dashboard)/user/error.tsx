"use client";

import { useEffect } from "react";
import { RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Soft Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-orange-400/10 blur-[100px]" />

      <div className="mx-auto flex max-w-lg flex-col items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          We encountered an unexpected issue while loading this experience.
          Please try again or head back to the platform.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={() => reset()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-[0.98]"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>

          <Link
            href="/user"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Go to Dashbaord
          </Link>
        </div>
      </div>
    </div>
  );
}
