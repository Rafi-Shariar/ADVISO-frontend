import { PROFESSION_DOMAINS } from "@/constants/professionDomain.constant";
import z from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "image/png",
  "image/jpeg",
];
export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

export const isAcceptedFileType = (fileType: string) => {
  return ACCEPTED_FILE_TYPES.includes(fileType);
};

export const getCustomFileSchema = <T>(message: string) =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message: message,
    },
  );

export const mentorApplicationSchema = z.object({
  headline: z.string().trim().min(5, "Headline must be at least 5 characters"),
  bio: z
    .string()
    .min(20, "Bio must be atleast 20 characters")
    .max(200, "Bio must be maximum 200 characters."),
  yearOfExperience: z
    .number({ message: "Years of experience is required" })
    .int("Years must be a whole number")
    .min(1, "Minimum 1 year required")
    .max(70, "Maximum 70 years allowed"),

  sessionCharge: z
    .number({ message: "Session charge is required" })
    .min(0, "Charge cannot be negative"),

  expertiseTags: z
    .array(z.string().trim().min(1, "Tag cannot be empty"))
    .min(3, "Minimum 3 tags are required"),

  linkedinURL: z
    .string()
    .trim()
    .min(1, "LinkedIn URL is required")
    .url("Please enter a valid URL")
    .refine(
      (val) => /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/i.test(val),
      "Must be a valid LinkedIn profile URL",
    ),

  professionalDomain: z
    .string()
    .min(1, "Please select a professional domain")
    // If you want strict validation using your PROFESSION_DOMAINS keys:
    .refine(
      (val) => Object.keys(PROFESSION_DOMAINS).includes(val),
      "Invalid domain",
    ),

  portfolioURL: z
    .string()
    .trim()
    .min(1, "Portfolio link is required")
    .url("Please enter a valid website URL"),

  resume: getCustomFileSchema<File | null>(
    `Resume must be a PDF, DOC, DOCX or an image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "A resume or CV is required",
  }),

  documents: getCustomFileSchema<File | null>(
    `Supporting Document must be a PDF, DOC, DOCX or an image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "A Single Supporting Document",
  }),
});
