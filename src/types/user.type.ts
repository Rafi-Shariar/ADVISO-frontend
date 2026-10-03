export type UserAccountStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";
export type UserAccountRole = "USER" | "MENTOR" | "ADMIN" | "SUPER_ADMIN";

export interface UserParams {
  role ?: UserAccountRole,
  accountStatus?: UserAccountStatus;
  searchTerm?: string;
  page?: number;
  limit?: number;

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