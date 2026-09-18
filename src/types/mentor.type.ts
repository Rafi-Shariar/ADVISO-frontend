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
  verificationStatus: string;
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
}
