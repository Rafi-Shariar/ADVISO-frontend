"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { AuthValidation } from "@/validation/auth.validation";
import { useGetMe, useGoogleOAuth, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import Logo from "../layout/public/Logo";
import { ArrowRight, GraduationCap, ShieldCheck, User } from "lucide-react";

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: AuthValidation.LoginZodSchema,
    },
    onSubmit: async ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (_res) => {
          router.push("/");
          toast.success("Login Successful.", {
            description: "Welcome back to ADVISO",
            position: "top-right",
          });
        },

        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Login Failed.", {
            description: errorDescription,
            position: "top-right",
          });
        },
      });
    },
  });

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Something went wrong. Try Again");
      return;
    }

    const timezone =
      Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || "UTC";

    googleLogin(
      { idToken, timezone },
      {
        onSuccess: (_res) => {
          router.push("/");
          toast.success("Login Successful.", {
            description: "Welcome back to ADVISO",
            position: "top-right",
          });
        },
        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Login Failed.", {
            description: errorDescription,
            position: "top-right",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Something went wrong. Try Again");
  };

  const handleQuickLogin = (value: string) => {
    const credential = {
      email: "",
      password: "",
    };

    if (value === "USER") {
      credential.email = "user@gmail.com";
      credential.password = "User@user12345";
    } else if (value === "MENTOR") {
      credential.email = "tahmid.rahman@example.com";
      credential.password = "Password123!";
    } else if (value === "SUPER_ADMIN") {
      credential.email = "admin@gmail.com";
      credential.password = "Admin@admin12345";
    } else {
      return;
    }

    login(credential, {
      onSuccess: (_res) => {
        router.push("/");
        toast.success(`Login Successful as ${value}`, {
          description: "Welcome back to ADVISO",
          position: "top-right",
        });
      },

      onError: (err: any) => {
        const errorDescription =
          err?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again";

        toast.error("Login Failed.", {
          description: errorDescription,
          position: "top-right",
        });
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="">
          <Logo size="lg" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent sm:text-3xl">
            Welcome back
          </h1>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Log in to continue your mentorship journey and manage your
            consultations.
          </p>
        </div>
      </div>

      {/* Login Credentials Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Email Field */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email Address
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="rounded-xl px-4 h-11 text-sm bg-background/60 border-border/60 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-inner"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Password Field */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="current-password"
                  placeholder="••••••"
                  className="rounded-xl px-4 h-11 text-sm bg-background/60 border-border/60 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-inner"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Login Button with Accent Glow */}
        <Button
          disabled={isPending}
          type="submit"
          className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_6px_22px_rgba(234,88,12,0.35)] active:scale-[0.98] mt-2 overflow-hidden"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4" /> Authenticating...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              Sign In
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <FieldSeparator className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 my-4">
        Or continue with
      </FieldSeparator>

      {/* Google OAuth Section */}
      <div className="w-full flex justify-center [&>div]:!w-full [&_iframe]:!w-full [&_iframe]:!mx-auto transition-transform active:scale-[0.99]">
        <div className="w-full flex justify-center">
          <GoogleLogin
            shape="rectangular"
            size="large"
            text="continue_with"
            theme="outline"
            width="100%"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>

      {/* Footer Register Link */}
      <p className="text-center text-xs text-muted-foreground pt-1">
        New to Adviso?{" "}
        <Link
          href="/register"
          className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline transition-colors"
        >
          Create an account
        </Link>
      </p>

      <FieldSeparator className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 my-4">
        Quick Login
      </FieldSeparator>

      <div className="grid grid-cols-3 gap-2.5 mt-2 w-full">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickLogin("USER")}
          className="h-9 px-2 rounded-[12px] border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <User className="size-3.5 text-zinc-500 group-hover:text-orange-600 shrink-0" />
          <span>User</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickLogin("MENTOR")}
          className="h-9 px-2 rounded-[12px] border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <GraduationCap className="size-3.5 text-zinc-500 group-hover:text-orange-600 shrink-0" />
          <span>Mentor</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickLogin("SUPER_ADMIN")}
          className="h-9 px-2 rounded-[12px] border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <ShieldCheck className="size-3.5 text-zinc-500 group-hover:text-orange-600 shrink-0" />
          <span>Admin</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
