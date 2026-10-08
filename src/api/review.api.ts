import apiClient from "@/lib/apiClient";

export const getFeaturedReviews = () => {
  return apiClient("api/v1/review");
};


export const getAllReviewAdmin = () => {
  return apiClient("/api/v1/review/admin/all-reviews");
};