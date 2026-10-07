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

export interface ApplicationReview {
  mentorId: string;
  headline: string;
  bio: string;
  yearOfExperience: number;
  expertiseTags: string[];
  linkedinURL: string;
  professionalDomain: string;
  portfolioURL: string;
  resume: string;
  sessionCharge: number;
  documents: Document[];
  verificationStatus: string;
  createdAt: string;
  user: User;
  rejectionReason: string;
  reviewedBy: string;
  reviewedAt: string;
}

export interface Document {
  url: string;
  publicId: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  timezone: string;
  isEmailVerified: boolean;
  profileURL: string;
  imagePublicId: string;
  googleId: string;
  authProvider: string;
  accountStatus: string;
  isDeleted: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewApplicationPaylaod {
  mentorId: string;
  verificationStatus: MentorVerificationStatus;
  rejectionReason?: string;
}

export interface MentorProfileAdmin extends ApplicationReview {
  blogs: BlogItemInMentorDetails[];
  reviews: IReview[];
}
