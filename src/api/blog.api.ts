import apiClient from "@/lib/apiClient";

export const getFeaturedBlogs = () => {
  return apiClient("/api/v1/blog/featured-blogs");
};
