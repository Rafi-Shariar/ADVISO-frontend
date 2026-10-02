"use client";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { file } from "zod";
import { Badge } from "../ui/badge";
import { FileUp, X } from "lucide-react";
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
import { isAcceptedFileSize, isAcceptedFileType, MAX_FILE_SIZE } from "@/validation/mentor-application.validation";

const ApplyAsMentorForm = () => {
  const [inputValue, setInputValue] = useState("");
  const form = useForm({
    defaultValues: {
      headline: "",
      bio: "",
      yearOfExperience: "",
      expertiseTags: [] as string[],
      linkedinURL: "",
      professionalDomain: "",
      portfolioURL: "",
      sessionCharge: "",
      resume: null as File | null,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="max-w-2xl mx-auto mt-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="headline">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Headline</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="headline"
                  placeholder="enter your headline"
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="bio">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="Bio"
                  placeholder=""
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="yearOfExperience">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Years of Experience</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  max={50}
                  inputMode="numeric"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="headline"
                  placeholder="10"
                />
              </Field>
            );
          }}
        </form.Field>

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
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            const handleKeyDown = (
              e: React.KeyboardEvent<HTMLInputElement>,
            ) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Form submit hoye jawa thekate eita must

                const trimmed = inputValue.trim();
                if (!trimmed) return;

                // Duplicate tag check ebong max limit check (optional)
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
                // Jodi input box faka thaka obosthay backspace chape, tobe shesh tag-ta delete hobe
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
                  className="text-sm font-medium text-foreground block"
                >
                  Expertise Tags
                </label>

                {/* Input & Tags wrapper box */}
                <div className="rounded-[10px] border border-border/80 bg-background p-2.5 space-y-2 focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
                  {/* Active Tags list */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant="secondary"
                        className="pl-2.5 pr-1 py-1 text-xs font-mono flex items-center gap-1 rounded-[6px] border border-border bg-muted/60 text-foreground"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {/* Actual text input field */}
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
                        ? "Type a tag (e.g. Next.js, CSS) and press Enter"
                        : "Add another tag..."
                    }
                    className="border-0 shadow-none focus-visible:ring-0 p-0 h-8 text-xs font-mono placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Validation and help hints */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <p className="text-muted-foreground">
                    {tags.length} added • Minimum 3 required
                  </p>

                  {isInvalid && (
                    <p className="text-rose-500 font-medium">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            );
          }}
        </form.Field>

        <form.Field name="linkedinURL">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>LinkedIn URL</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="headline"
                  placeholder="https://www.linkedin.com/..."
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="professionalDomain">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Professional Domain</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val as ProfessionDomain)
                  }
                >
                  <SelectTrigger
                    className="w-full"
                    id={field.name}
                    onBlur={field.handleBlur}
                  >
                    <SelectValue placeholder="Select Your Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Your Domain</SelectLabel>
                      {Object.values(PROFESSION_DOMAINS).map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="portfolioURL">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Portfolio Link</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="portfolioURL"
                  placeholder="https://..."
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="sessionCharge">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Per Session Charge</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="portfolioURL"
                  placeholder="10.99"
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="resume">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Resume</FieldLabel>
                <div>
                  <Button>
                    <label htmlFor="resume-field"> Upload Resume</label>
                  </Button>
                  <input id="resume-field" type="file" className="sr-only" name={field.name} onChange={(e) => {
                    const selected = e.target.files?.[0] ?? null;

                    if( selected && (!isAcceptedFileSize(selected?.size) || !isAcceptedFileType(selected.type))){
                      field.handleChange(null);
                      field.handleBlur();
                      return;
                    }
                    field.handleChange(selected);
                    e.target.value = ""
                  }}/>
                  {
                    file ? (

                      <div>
                        <span>{file.name}</span>
                        <Button onClick={() => field.handleChange(null)} variant={"outline"}><X/></Button>

                      </div>
                    ) : <span>Suppored File: .pdf, .doc, .png, .jpg and size {MAX_FILE_SIZE} MB</span>
                  }
                </div>
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" className="mt-6">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default ApplyAsMentorForm;
