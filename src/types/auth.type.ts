export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IGoogleLoginPayload {
  idToken: string;
  timezone: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  timezone: string;
  password: string;
}

export interface IVerifyEmailPayload {
  otp: string;
  email: string;
}

export type UserRole = "ADMIN" | "USER" | "MENTOR" | "SUPER_ADMIN";
