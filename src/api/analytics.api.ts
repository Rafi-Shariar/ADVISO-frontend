import apiClient from "@/lib/apiClient";

export const getPublicStats = () => {
  return apiClient("/api/v1/analytics");
};

export const getAdminStats = () => {
  return apiClient("/api/v1/analytics/admin");
};

export const getMentorStats = () => {
  return apiClient("/api/v1/analytics/mentor");
};
