"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { AuthValidation } from "@/validation/auth.validation";
import { useGoogleOAuth, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import Logo from "../layout/public/Logo";

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();


  const form = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "Admin@admin12345",
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
        onSuccess: (res) => {
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

  return (
    <div className="w-full space-y-6">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center space-y-2">
        <Logo size="md" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-orange-600 dark:text-orange-500">
            Welcome back!
          </h1>
          <p className="text-sm text-muted-foreground">
            Simplify your consultations and guide your career path.
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
                  className="text-sm font-medium"
                >
                  Email
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
                  className="rounded-full px-4 h-11 text-sm border-border focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 shadow-sm"
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
                    className="text-sm font-medium"
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
                  placeholder="Enter your password"
                  className="rounded-full px-4 h-11 text-sm border-border focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 shadow-sm"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Login Button */}
        <Button
          disabled={isPending}
          type="submit"
          className="w-full h-11 rounded-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium text-sm transition-all shadow-sm active:scale-[0.99] mt-1"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4" /> Submitting...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* Divider */}
      <FieldSeparator className="text-xs uppercase font-medium tracking-wider text-muted-foreground my-4">
        Or continue with
      </FieldSeparator>

      {/* Google OAuth Section */}
      <div className="w-full flex justify-center [&>div]:!w-full [&_iframe]:!w-full [&_iframe]:!mx-auto">
        <div className="w-full flex justify-center">
          <GoogleLogin
            shape="pill"
            size="medium"
            text="continue_with"
            theme="outline"
            width="100%"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>

      {/* Footer Register Link */}
      <p className="text-center text-sm text-muted-foreground pt-1">
        Not a member?{" "}
        <Link
          href="/register"
          className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline"
        >
          Register now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
