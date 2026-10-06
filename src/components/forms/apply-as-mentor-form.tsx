"use client";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { file } from "zod";
import { Badge } from "../ui/badge";
import { FileUp, Key, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  PROFESSION_DOMAINS,
  ProfessionDomain,
} from "@/constants/professionDomain.constant";
import { Button } from "../ui/button";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_FILE_SIZE,
  mentorApplicationSchema,
} from "@/validation/mentor-application.validation";

const ApplyAsMentorForm = () => {
  const [inputValue, setInputValue] = useState("");
  const form = useForm({
    defaultValues: {
      headline: "",
      bio: "",
      yearOfExperience: 0,
      expertiseTags: [] as string[],
      linkedinURL: "",
      professionalDomain: "",
      portfolioURL: "",
      sessionCharge: 0,
      resume: null as File | null,
      documents: null as File | null,
    },
    validators: {
      onSubmit: mentorApplicationSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-card text-card-foreground rounded-2xl border border-border/60 shadow-xl shadow-black/[0.03] backdrop-blur-sm p-6 sm:p-8">
        <div className="mb-8 border-b border-border/40 pb-5">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Professional Profile
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Complete your details and credentials to set up your consultation
            profile.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Primary Details */}
          <div className="space-y-4">
            <form.Field name="headline">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Headline
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="headline"
                      placeholder="e.g. Senior Full-Stack Engineer & System Architect"
                      className="h-10 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="bio">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Bio
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="Bio"
                      placeholder="A concise summary of your expertise and background"
                      className="h-10 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field name="yearOfExperience">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Years of Experience
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      max={50}
                      inputMode="numeric"
                      value={field.state.value}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.handleChange(Number.isNaN(val) ? 0 : val);
                      }}
                      onBlur={field.handleBlur}
                      autoComplete="headline"
                      placeholder="10"
                      className="h-10 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="sessionCharge">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Per Session Charge ($)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      step="0.01"
                      inputMode="decimal"
                      value={field.state.value === 0 ? "" : field.state.value}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        // When cleared, reset to 0
                        if (rawValue === "") {
                          field.handleChange(0);
                          return;
                        }
                        const val = e.target.valueAsNumber;
                        field.handleChange(Number.isNaN(val) ? 0 : val);
                      }}
                      onBlur={field.handleBlur}
                      autoComplete="portfolioURL"
                      placeholder="10.99"
                      className="h-10 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
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
              onChange: ({ value }) => {
                if (!Array.isArray(value) || value.length < 3) {
                  return "Minimum 3 tags are required";
                }
                return undefined;
              },
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
                    const nextTags = [...tags, trimmed];
                    field.handleChange(nextTags);
                  }
                  setInputValue("");
                } else if (
                  e.key === "Backspace" &&
                  !inputValue &&
                  tags.length > 0
                ) {
                  const nextTags = tags.slice(0, -1);
                  field.handleChange(nextTags);
                }
              };

              const removeTag = (indexToRemove: number) => {
                const nextTags = tags.filter((_, idx) => idx !== indexToRemove);
                field.handleChange(nextTags);
              };

              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground block"
                  >
                    Expertise Tags
                  </label>

                  <div
                    className={`min-h-[52px] rounded-xl border p-2 bg-background/50 flex flex-wrap items-center gap-1.5 transition-all ${
                      isInvalid
                        ? "border-destructive/60 ring-1 ring-destructive/30"
                        : "border-input focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40"
                    }`}
                  >
                    {tags.map((tag, index) => (
                      <Badge
                        key={`${tag}`}
                        variant="secondary"
                        className="pl-2.5 pr-1 py-1 text-xs font-normal rounded-lg border border-border/60 bg-muted/80 hover:bg-muted text-foreground flex items-center gap-1.5 transition-all shadow-xs"
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
                          ? "Type a skill (e.g. React, Node.js) and press Enter"
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
                        {field.state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              );
            }}
          </form.Field>

          {/* Domain Selection */}
          <form.Field name="professionalDomain">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="space-y-1.5">
                  <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Professional Domain
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) =>
                      field.handleChange(val as ProfessionDomain)
                    }
                  >
                    <SelectTrigger
                      className="w-full h-10 text-sm"
                      id={field.name}
                      onBlur={field.handleBlur}
                    >
                      <SelectValue placeholder="Select Your Domain" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Select Your Domain</SelectLabel>
                        {Object.entries(PROFESSION_DOMAINS).map(
                          ([key, domain]) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className="rounded-lg"
                            >
                              {domain}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Social Links Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field name="linkedinURL">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      LinkedIn URL
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="headline"
                      placeholder="https://linkedin.com/in/..."
                      className="h-10 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="portfolioURL">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Portfolio Link
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="portfolioURL"
                      placeholder="https://yourportfolio.com"
                      className="h-10 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary/80"
                    />
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* File Uploads Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Resume */}
            <form.Field name="resume">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const file = field.state.value;
                return (
                  <Field data-invalid={isInvalid} className="space-y-2">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Resume
                    </FieldLabel>
                    <div
                      className={`rounded-xl border border-dashed p-4 bg-muted/20 flex flex-col items-center justify-center text-center gap-2.5 min-h-[140px] transition-colors ${
                        isInvalid
                          ? "border-destructive/70 bg-destructive/5"
                          : "border-border/80 hover:bg-muted/40"
                      }`}
                    >
                      <input
                        id="resume-field"
                        type="file"
                        className="sr-only"
                        name={field.name}
                        onChange={(e) => {
                          const selected = e.target.files?.[0] ?? null;
                          if (
                            selected &&
                            (!isAcceptedFileSize(selected?.size) ||
                              !isAcceptedFileType(selected.type))
                          ) {
                            field.handleChange(null);
                            field.handleBlur();
                            return;
                          }
                          field.handleChange(selected);
                          e.target.value = "";
                        }}
                      />
                      {file ? (
                        <div className="flex items-center justify-between gap-2 w-full bg-background border border-border/80 px-3 py-2 rounded-lg shadow-2xs">
                          <span className="text-xs font-medium truncate max-w-[160px] text-foreground">
                            {file.name}
                          </span>
                          <Button
                            type="button"
                            onClick={() => field.handleChange(null)}
                            variant="ghost"
                            size="icon"
                            className="size-6 text-muted-foreground hover:text-destructive"
                          >
                            <X className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-lg shadow-2xs h-8 text-xs font-medium pointer-events-none"
                          >
                            <label
                              htmlFor="resume-field"
                              className="cursor-pointer pointer-events-auto"
                            >
                              Upload Resume
                            </label>
                          </Button>
                          <span className="text-[11px] text-muted-foreground leading-snug">
                            PDF, DOC, PNG, JPG (max {MAX_FILE_SIZE}MB)
                          </span>
                        </>
                      )}
                    </div>
                  </Field>
                );
              }}
            </form.Field>

            {/* Supporting Documents */}
            <form.Field name="documents">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const file = field.state.value;
                return (
                  <Field data-invalid={isInvalid} className="space-y-2">
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Supporting Documents
                    </FieldLabel>
                    <div
                      className={`rounded-xl border border-dashed p-4 bg-muted/20 flex flex-col items-center justify-center text-center gap-2.5 min-h-[140px] transition-colors ${
                        isInvalid
                          ? "border-destructive/70 bg-destructive/5"
                          : "border-border/80 hover:bg-muted/40"
                      }`}
                    >
                      <input
                        id="documents-field"
                        type="file"
                        className="sr-only"
                        name={field.name}
                        onChange={(e) => {
                          const selected = e.target.files?.[0] ?? null;
                          if (
                            selected &&
                            (!isAcceptedFileSize(selected?.size) ||
                              !isAcceptedFileType(selected.type))
                          ) {
                            field.handleChange(null);
                            field.handleBlur();
                            return;
                          }
                          field.handleChange(selected);
                          e.target.value = "";
                        }}
                      />
                      {file ? (
                        <div className="flex items-center justify-between gap-2 w-full bg-background border border-border/80 px-3 py-2 rounded-lg shadow-2xs">
                          <span className="text-xs font-medium truncate max-w-[160px] text-foreground">
                            {file.name}
                          </span>
                          <Button
                            type="button"
                            onClick={() => field.handleChange(null)}
                            variant="ghost"
                            size="icon"
                            className="size-6 text-muted-foreground hover:text-destructive"
                          >
                            <X className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-lg shadow-2xs h-8 text-xs font-medium pointer-events-none"
                          >
                            <label
                              htmlFor="documents-field"
                              className="cursor-pointer pointer-events-auto"
                            >
                              Upload Documents
                            </label>
                          </Button>
                          <span className="text-[11px] text-muted-foreground leading-snug">
                            PDF, DOC, PNG, JPG (max {MAX_FILE_SIZE}MB)
                          </span>
                        </>
                      )}
                    </div>
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Submission */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-11 text-sm font-medium rounded-xl shadow-xs transition-transform active:scale-[0.99]"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyAsMentorForm;
