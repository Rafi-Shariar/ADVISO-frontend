import apiClient from "@/lib/apiClient";
import { BlogParams } from "@/types/blog.types";

export const getFeaturedBlogs = () => {
  return apiClient("/api/v1/blog/featured-blogs");
};

export const getAllBlogsPublic = () => {
  return apiClient("/api/v1/blog");
};

export const getBlogDetails = (id: string) => {
  return apiClient(`/api/v1/blog/${id}`);
};

export const getAllBlogsAdmin = (params: BlogParams) => {
  return apiClient("/api/v1/blog/all-blogs", { params });
};
