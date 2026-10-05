import apiClient from "@/lib/apiClient";

export const getAllSessionsAdmin = () => {
  return apiClient("/api/v1/session/admin/all-sessions");
};

export const getSessionsAdminDetails = (id: string) => {
  return apiClient(`/api/v1/session/admin/all-sessions/${id}`);
};
