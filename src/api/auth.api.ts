import apiClient from "@/lib/apiClient";
import { IGoogleLoginPayload, ILoginUserPayload, IRegisterUser } from "@/types/auth.type";


export const userRegistration = (payload: IRegisterUser) => {
  return apiClient("/api/v1/auth/register", { method: "POST", body: payload });
};

export const userLogin = (payload: ILoginUserPayload) => {
  return apiClient("/api/v1/auth/login", { method: "POST", body: payload });
};

export const userLogout = () => {
  return apiClient("/api/v1/auth/logout", { method: "POST" });
};

export const getMe = () => {
  return apiClient("/api/v1/auth/me");
};

export const googleAuth = (payload: IGoogleLoginPayload) => {
  return apiClient("/api/v1/auth/google", { method: "POST", body: payload });
};
