import apiClient from "@/lib/apiClient";
import { ILoginUserPayload } from "@/types/auth.type";

export const userLogin = (payload: ILoginUserPayload) => {
  return apiClient("/api/v1/auth/login", { method: "POST", body: payload });
};

export const userLogout = () => {
  return apiClient("/api/v1/auth/logout", { method: "POST" });
};

export const getMe = () => {
  return apiClient("/api/v1/auth/me");
};
