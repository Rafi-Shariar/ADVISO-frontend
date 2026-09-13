import VerifyAccountForm from "@/components/forms/verify-account-form";
import React, { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const VerifyAccountPage = () => {
  return (
    <main className="min-h-svh w-full flex items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden selection:bg-orange-500/20 selection:text-orange-600">
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Subtle Aurora Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center">
        <Suspense fallback={<Spinner className="size-8 text-orange-500" />}>
          <VerifyAccountForm />
        </Suspense>
      </div>
    </main>
  );
};

export default VerifyAccountPage;