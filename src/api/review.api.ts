import apiClient from "@/lib/apiClient";

export const getFeaturedReviews = () => {
  return apiClient("api/v1/review");
};