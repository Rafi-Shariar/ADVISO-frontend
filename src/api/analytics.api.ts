import apiClient from "@/lib/apiClient";

export const getPublicStats = () => {
  return apiClient("/api/v1/analytics");
};
