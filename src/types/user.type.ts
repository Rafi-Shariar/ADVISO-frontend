export interface UserParams {
//   verificationStatus?: MentorVerificationStatus;
  searchTerm?: string;
  professionalDomain?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface UserProfileAdmin {
  userId: string
  role: string
  name: string
  email: string
  timezone: string
  isEmailVerified: boolean
  profileURL: string
  imagePublicId: string
  googleId: string
  authProvider: string
  accountStatus: string
  isDeleted: boolean
  deletedAt: string
  createdAt: string
  updatedAt: string
}