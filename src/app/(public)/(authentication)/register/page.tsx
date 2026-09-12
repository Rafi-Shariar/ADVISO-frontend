import LoginForm from "@/components/forms/login-form";
import Image from "next/image";
import loginIllustration from "@/assets/auth/signup.svg";
import SignUpForm from "@/components/forms/register-form";

export default function SignUpPage() {
  return (
    <main className="min-h-svh w-full grid lg:grid-cols-2 bg-background">
      {/* Left Column: Form Section */}
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-[480px]">
          <SignUpForm />
        </div>
      </div>

      {/* Right Column: Hero Visual Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-orange-50/50 dark:bg-orange-950/10 p-12 border-l border-orange-100 dark:border-orange-900/20 relative overflow-hidden">
        {/* Soft Background Accent Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/30 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
          <div className="w-full aspect-square relative mb-8 drop-shadow-lg">
            <Image
              src={loginIllustration}
              alt="Consultation and Mentorship Illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
