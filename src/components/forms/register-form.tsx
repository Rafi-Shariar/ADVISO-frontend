"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { AuthValidation } from "@/validation/auth.validation";
import { useGoogleOAuth, useRegistration } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import Logo from "../layout/public/Logo";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: googleLogin, isPending: isGooglePending } = useGoogleOAuth();
  const { mutate: register, isPending: isRegisterPending } = useRegistration();
  const router = useRouter();

  const isSubmitting = isRegisterPending || isGooglePending;
  const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || "UTC";

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: AuthValidation.registerZodSchema,
    },
    onSubmit: async ({ value }) => {
      const registerData = {
        name: value.name,
        email: value.email,
        password: value.password,
        timezone,
      };

      register(registerData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error("Registration Failed.", {
              description: "Something went wrong. Please try again.",
              position: "top-right",
            });
            return;
          }

          toast.success("OTP sent to your email.", {
            description: "Please verify your account to proceed.",
            position: "top-right",
          });

          const params = new URLSearchParams({ email: registerData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Registration Failed.", {
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

    googleLogin(
      { idToken, timezone },
      {
        onSuccess: (_res) => {
          router.push("/");
          toast.success("Login Successful.", {
            description: "Welcome to ADVISO",
            position: "top-right",
          });
        },
        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Google Sign-In Failed.", {
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

  return (
    <div className="w-full space-y-6">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-2 rounded-2xl bg-orange-500/5 ring-1 ring-orange-500/10">
          <Logo size="md" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent sm:text-3xl">
            Create an account
          </h1>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Start your universal consultation journey with industry leaders.
          </p>
        </div>
      </div>

      {/* Register Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Full Name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Full Name
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="name"
                  placeholder="e.g. John Doe"
                  className="rounded-xl px-4 h-11 text-sm bg-background/60 border-border/60 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-inner"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Email Address */}
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

        {/* Password Field with Eye Toggle */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    className="rounded-xl pl-4 pr-11 h-11 text-sm bg-background/60 border-border/60 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none p-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Submit Button */}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_6px_22px_rgba(234,88,12,0.35)] active:scale-[0.98] mt-2 overflow-hidden"
        >
          {isRegisterPending ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4" /> Creating Account...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              Get Started
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

      {/* Footer Login Link */}
      <p className="text-center text-xs text-muted-foreground pt-1">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
