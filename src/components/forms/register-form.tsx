"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { AuthValidation } from "@/validation/auth.validation";
import { useGoogleOAuth, useLogin, useRegistration } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import Logo from "../layout/public/Logo";


const SignUpForm = () => {
  const { mutate: googleLogin, isPending } = useGoogleOAuth();
  const { mutate : register} = useRegistration()
  const router = useRouter();

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
        name : value.email,
        email: value.email,
        password: value.password,
        timezone
      };

      register(registerData, {
        onSuccess: (res) => {

          if(!res.success){
            toast.error("Server Failure.", {
            description: "Something went wrong. Please try again",
            position: "top-right",
          });

          }

          toast.success("OTP Sent to your email.", {
            description: "Please verify your account.",
            position: "top-right",
          });

          const params = new URLSearchParams({email : registerData.email})

          router.push(`/register/verify-account?${params.toString()}`);
          
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
    <div className="w-full space-y-8">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <Logo size="lg" className="scale-110 mb-1" />
        <div className="space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-6 text-orange-600">
            Welcome back!
          </h1>
          <p className="text-base text-muted-foreground">
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
        className="space-y-5"
      >
        {/* Name Field */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="space-y-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-base font-semibold"
                >
                  Name
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="name"
                  placeholder="enter your name"
                  className="rounded-full px-5 h-14 text-base border-border/80 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 shadow-sm"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Email Field */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="space-y-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-base font-semibold"
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
                  className="rounded-full px-5 h-14 text-base border-border/80 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 shadow-sm"
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
              <Field className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-base font-semibold"
                  >
                    Password
                  </FieldLabel>
                
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
                  className="rounded-full px-5 h-14 text-base border-border/80 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 shadow-sm"
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
              <Spinner className="size-4" />
            </span>
          ) : (
            "Register"
          )}
        </Button>
      </form>

      {/* Divider */}
      <FieldSeparator className="text-xs uppercase font-medium tracking-wider text-muted-foreground my-6">
        Or continue with
      </FieldSeparator>

      {/* Google OAuth Section */}
      {/* Google OAuth Section */}
      <div className="w-full flex justify-center [&>div]:!w-full [&_iframe]:!w-full [&_iframe]:!mx-auto">
        <div className="w-full flex justify-center">
          <GoogleLogin
            shape="pill"
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
      <p className="text-center text-base text-muted-foreground pt-2">
        Already a member?{" "}
        <Link
          href="/login"
          className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline"
        >
          Login now
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
