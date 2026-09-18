import apiClient from "@/lib/apiClient";

export const getFeaturedBlogs = () => {
  return apiClient("/api/v1/blog/featured-blogs");
};

export const getAllBlogsPublic = () => {
  return apiClient("/api/v1/blog");
};

export const getBlogDetails = (id: string) => {
  return apiClient(`/api/v1/blog/${id}`);
};
