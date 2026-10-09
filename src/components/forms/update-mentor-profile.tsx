"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { UpdateMentorProfile } from "@/types/mentor.type";
import {
  useGetMentorProfile,
  useUpdateMentorProfile,
} from "@/hooks/mentor.hook";

const UpdateMentorProfileForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { data, isPending } = useGetMentorProfile();
  const { mutate: updateProfile, isPending: updating } =
    useUpdateMentorProfile();

  const currentProfile = data?.data;

  const form = useForm({
    defaultValues: {
      headline: currentProfile?.headline || "",
      bio: currentProfile?.bio || "",
      yearOfExperience: Number(currentProfile?.yearOfExperience) || 0,
      expertiseTags: (currentProfile?.expertiseTags as string[]) || [],
      linkedinURL: currentProfile?.linkedinURL || "",
      portfolioURL: currentProfile?.portfolioURL || "",
      sessionCharge: Number(currentProfile?.sessionCharge) || 0,
    },
    onSubmit: async ({ value }) => {
      if (value.expertiseTags.length < 3) {
        toast.error("Please add at least 3 expertise tags.");
        return;
      }

      const applicationData: UpdateMentorProfile = {
        headline: value.headline.trim(),
        bio: value.bio.trim(),
        yearOfExperience: Number(value.yearOfExperience),
        expertiseTags: value.expertiseTags,
        linkedinURL: value.linkedinURL.trim(),
        portfolioURL: value.portfolioURL.trim() || undefined,
        sessionCharge: Number(value.sessionCharge),
      };

      updateProfile(applicationData, {
        onSuccess: (res: any) => {
          if (!res?.success) {
            toast.error(res?.message || "Failed to update profile.");
            return;
          }

          toast.success("Profile Updated", {
            description:
              "Your professional profile has been updated successfully.",
            position: "top-right",
          });
        },
        onError: (err: any) => {
          const errorDescription =
            err?.response?.data?.message ||
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Update Failed", {
            description: errorDescription,
            position: "top-right",
          });
        },
      });
    },
  });

  // সার্ভার থেকে ডাটা আসার সাথে সাথে ফর্মে ভ্যালু পুশ করা
  useEffect(() => {
    if (currentProfile) {
      form.reset({
        headline: currentProfile.headline || "",
        bio: currentProfile.bio || "",
        yearOfExperience: Number(currentProfile.yearOfExperience) || 0,
        expertiseTags: currentProfile.expertiseTags || [],
        linkedinURL: currentProfile.linkedinURL || "",
        portfolioURL: currentProfile.portfolioURL || "",
        sessionCharge: Number(currentProfile.sessionCharge) || 0,
      });
    }
  }, [currentProfile, form]);

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-6 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <div className="bg-card text-card-foreground rounded-[12px] border border-border/80 shadow-2xs backdrop-blur-sm p-6 sm:p-8">
        <div className="mb-6 border-b border-border/40 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Update Professional Profile
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Update your public profile, rates, and mentorship domain tags.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Primary Details */}
          <div className="space-y-4">
            <form.Field
              name="headline"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Headline is required" : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Headline
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="e.g. Senior Software Architect at Google"
                      className="h-10 text-xs sm:text-sm rounded-[12px] transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="bio"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Bio is required" : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Bio
                    </FieldLabel>
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Share your career journey, expertise, and how you help mentees..."
                      className="w-full rounded-[12px] border border-input bg-transparent p-3 text-xs sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/80 transition-all resize-none"
                    />
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field
              name="yearOfExperience"
              validators={{
                onChange: ({ value }) =>
                  Number(value) < 1 ? "Minimum 1 year required" : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Years of Experience
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      max={50}
                      // স্টেটের মান 0 বা undefined/null হলে ফাঁকা স্ট্রিং দেখাবে
                      value={
                        field.state.value === 0 || field.state.value == null
                          ? ""
                          : field.state.value
                      }
                      onChange={(e) => {
                        const rawVal = e.target.value;
                        // পুরোটা ক্লিয়ার করলে স্টেট খালি স্ট্রিং বা undefined হবে
                        if (rawVal === "") {
                          field.handleChange("" as unknown as number);
                          return;
                        }
                        // সংখ্যা লিখলে পার্স করে স্টেটে পাঠাবে
                        field.handleChange(Number(rawVal));
                      }}
                      onBlur={field.handleBlur}
                      className="h-10 text-xs sm:text-sm rounded-[12px] transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="sessionCharge"
              validators={{
                onChange: ({ value }) =>
                  Number(value) < 0 ? "Rate cannot be negative" : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Per Session Charge ($)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      step="any"
                      // 0 বা null/undefined হলে ইনপুট বক্সে খালি স্ট্রিং দেখাবে
                      value={
                        field.state.value === 0 || !field.state.value
                          ? ""
                          : field.state.value
                      }
                      onChange={(e) => {
                        const rawVal = e.target.value;

                        // পুরোটা মুছলে 0 পাস হবে, কিন্তু value-এর কারণে ইনপুট খালি দেখাবে
                        if (rawVal === "") {
                          field.handleChange(0);
                          return;
                        }

                        const num = Number(rawVal);
                        if (!Number.isNaN(num)) {
                          field.handleChange(num);
                        }
                      }}
                      onBlur={field.handleBlur}
                      className="h-10 text-xs sm:text-sm rounded-[12px] transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                    {isInvalid && (
                      <span className="text-destructive font-medium tracking-tight">
                        {field.state.meta.errors
                          .map((e: any) => e?.message || e)
                          .join(", ")}
                      </span>
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Expertise Tags */}
          <form.Field
            name="expertiseTags"
            validators={{
              onChange: ({ value }) =>
                !Array.isArray(value) || value.length < 3
                  ? "Minimum 3 tags required"
                  : undefined,
            }}
          >
            {(field) => {
              const tags: string[] = Array.isArray(field.state.value)
                ? field.state.value
                : [];
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              const handleKeyDown = (
                e: React.KeyboardEvent<HTMLInputElement>,
              ) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const trimmed = inputValue.trim();
                  if (!trimmed) return;

                  if (!tags.includes(trimmed)) {
                    field.handleChange([...tags, trimmed]);
                  }
                  setInputValue("");
                } else if (
                  e.key === "Backspace" &&
                  !inputValue &&
                  tags.length > 0
                ) {
                  field.handleChange(tags.slice(0, -1));
                }
              };

              const removeTag = (indexToRemove: number) => {
                field.handleChange(
                  tags.filter((_, idx) => idx !== indexToRemove),
                );
              };

              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block"
                  >
                    Expertise Tags
                  </label>

                  <div
                    className={`min-h-[50px] rounded-[12px] border p-2 bg-background/50 flex flex-wrap items-center gap-1.5 transition-all ${
                      isInvalid
                        ? "border-destructive/60 ring-1 ring-destructive/30"
                        : "border-input focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40"
                    }`}
                  >
                    {tags.map((tag, index) => (
                      <Badge
                        key={`${tag}`}
                        variant="secondary"
                        className="pl-2.5 pr-1 py-1 text-xs font-normal rounded-[8px] border border-border/60 bg-muted/80 text-foreground flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="rounded-full p-0.5 text-muted-foreground hover:bg-background/80 hover:text-foreground transition-colors"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={field.handleBlur}
                      placeholder={
                        tags.length === 0
                          ? "Type a skill (e.g. Next.js, System Design) and press Enter"
                          : "Add more..."
                      }
                      className="flex-1 min-w-[140px] border-0 shadow-none focus-visible:ring-0 p-1 h-7 text-xs placeholder:text-muted-foreground/60 bg-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-0.5">
                    <span className="text-muted-foreground font-mono">
                      {tags.length} added • Min 3 required
                    </span>
                    {isInvalid && (
                      <span className="text-destructive font-medium tracking-tight">
                        {field.state.meta.errors
                          .map((e: any) => e?.message || e)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              );
            }}
          </form.Field>

          {/* Social Links Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field
              name="linkedinURL"
              validators={{
                onChange: ({ value }) =>
                  !value ? "LinkedIn profile URL is required" : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      LinkedIn URL
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="https://linkedin.com/in/username"
                      className="h-10 text-xs sm:text-sm rounded-[12px] transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                    {isInvalid && (
                      <span className="text-destructive font-medium tracking-tight">
                        {field.state.meta.errors
                          .map((e: any) => e?.message || e)
                          .join(", ")}
                      </span>
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="portfolioURL">
              {(field) => (
                <Field className="space-y-1.5">
                  <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Portfolio / Website Link (Optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="https://yourportfolio.com"
                    className="h-10 text-xs sm:text-sm rounded-[12px] transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                  />
                </Field>
              )}
            </form.Field>
          </div>

          {/* Submission Button */}
          <div className="pt-3">
            <Button
              type="submit"
              disabled={updating}
              className="w-full h-11 text-xs sm:text-sm font-bold rounded-[12px] shadow-xs transition-all active:scale-[0.99] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900"
            >
              {updating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-orange-500" />
                  Updating Profile...
                </span>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMentorProfileForm;
