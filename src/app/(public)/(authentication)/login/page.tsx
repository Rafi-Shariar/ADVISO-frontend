import LoginForm from "@/components/forms/login-form";
import Image from "next/image";
import loginIllustration from "@/assets/auth/login.svg";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-svh w-full grid lg:grid-cols-12 bg-background relative overflow-hidden selection:bg-orange-500/20 selection:text-orange-600">
      {/* Background Micro-Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Left Column: Focused Glass Authentication Pod */}
      <div className="lg:col-span-6  flex flex-col justify-center items-center px-6 py-12 sm:px-12 relative z-10">
        <div className="w-full max-w-[420px] rounded-3xl border border-border/40 bg-card/60 dark:bg-card/40 backdrop-blur-xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <LoginForm />
        </div>
      </div>

      {/* Right Column: Dynamic Glass Showcase & Floating Trust Metrics */}
      <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-12 xl:p-16 relative bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-transparent border-l border-border/40 overflow-hidden">
        {/* Organic Ambient Aurora Spheres */}
        <div className="absolute top-10 right-10 w-[480px] h-[480px] bg-gradient-to-br from-orange-400/20 to-amber-300/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-gradient-to-tr from-amber-500/15 to-orange-600/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="self-end relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-background/80 backdrop-blur-md text-xs font-medium text-orange-600 dark:text-orange-400 shadow-sm">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>Top-Tier Verified Mentors</span>
          </div>
        </div>

        {/* Centerpiece: Floating Illustration with Floating Card overlays */}
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] max-w-[500px]">
            <Image
              src={loginIllustration}
              alt="Mentorship and Consultation"
              fill
              priority
              className="object-contain drop-shadow-[0_20px_25px_rgba(234,88,12,0.12)]"
            />

            {/* Micro Floating Interaction Pill Left */}
            <div className="absolute -bottom-2 -left-4 rounded-2xl border border-border/50 bg-background/90 dark:bg-card/90 backdrop-blur-md p-3.5 shadow-xl flex items-center gap-3">
              <div className="size-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <Compass className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground">
                  Strategic Guidance
                </p>
                <p className="text-[11px] text-muted-foreground">
                  1-on-1 Personalized Roadmaps
                </p>
              </div>
            </div>

            {/* Micro Floating Interaction Pill Right */}
            <div className="absolute -top-4 -right-4 rounded-2xl border border-border/50 bg-background/90 dark:bg-card/90 backdrop-blur-md p-3.5 shadow-xl flex items-center gap-3">
              <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <ShieldCheck className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground">
                  Secure Consultations
                </p>
                <p className="text-[11px] text-muted-foreground">
                  End-to-End Encrypted Sessions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote / Social Proof Footer */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Empower your trajectory with expert perspective.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Gain clear, actionable guidance from industry authorities across 20+
            specialized domains on Adviso.
          </p>
        </div>
      </div>
    </main>
  );
}
