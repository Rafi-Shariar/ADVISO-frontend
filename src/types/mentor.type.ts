import { exitCode } from "process";
import { BlogItem, BlogItemInMentorDetails } from "./blog.types";
import { IReview } from "./review.type";

export type MentorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IMentorProfile {
  mentorId: string;
  headline: string;
  bio: string;
  yearOfExperience: number;
  expertiseTags: string[];
  linkedinURL: string;
  professionalDomain: string;
  portfolioURL: string;
  resume: string;
  resumePublicId: string;
  sessionCharge: string;
  documents: Document[];
  mentorshipStatus: string;
  verificationStatus: MentorVerificationStatus;
  rejectionReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  totalSessionsCompleted: number;
  averageRatings: string;
  totalReviews: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Document {
  title: string;
  fileUrl: string;
  publicId: string;
}

export interface User {
  name: string;
  profileURL: string;
  email: string;
}

export interface IMentorDetails {
  user: {
    name: string;
    timezone: string;
    profileURL: string;
  };
  headline: string;
  bio: string;
  yearOfExperience: number;
  expertiseTags: string[];
  linkedinURL: string;
  professionalDomain: string;
  portfolioURL: string | null;
  sessionCharge: string;
  totalSessionsCompleted: number;
  averageRatings: string;
  totalReviews: number;
  blogs: BlogItemInMentorDetails[];
  reviews: IReview[];
}

export interface MentorParams {
  verificationStatus?: MentorVerificationStatus;
  searchTerm?: string;
  professionalDomain?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ApplicationData {
  headline: string;
  bio: string;
  yearOfExperience: number;
  expertiseTags: string[];
  linkedinURL: string;
  professionalDomain: string;
  portfolioURL: string;
  sessionCharge: number;
}

export interface MentorApplicationPayload {
  data: ApplicationData;
  resume: File;
  documents: File;
}
