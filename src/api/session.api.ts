import apiClient from "@/lib/apiClient";

export const getAllSessionsAdmin = () => {
  return apiClient("/api/v1/session/admin/all-sessions");
};