import apiClient from "@/lib/apiClient";

export const getAllSessionsAdmin = () => {
  return apiClient("/api/v1/session/admin/all-sessions");
};

export const getSessionsAdminDetails = (id: string) => {
  return apiClient(`/api/v1/session/admin/all-sessions/${id}`);
};

export const getAllSessionsMentor = () => {
  return apiClient("/api/v1/session/mentor-sessions");
};

export const getSessionsDetailsMentor = (id: string) => {
  return apiClient(`/api/v1/session/mentor-sessions/${id}`);
};
