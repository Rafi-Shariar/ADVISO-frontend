import {
  getAllBlogsAdmin,
  getAllBlogsPublic,
  getBlogDetails,
  getFeaturedBlogs,
} from "@/api";
import { BlogParams } from "@/types/blog.types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useFeaturedBlogs() {
  return useQuery({
    queryKey: ["featured-blogs"],
    queryFn: getFeaturedBlogs,
  });
}

export function useAllBlogsPublic() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogsPublic,
  });
}

export function useBlogDetails(id: string) {
  return useQuery({
    queryKey: [`blog-${id}`],
    queryFn: () => getBlogDetails(id),
    enabled: Boolean(id),
  });
}

export function useSuspenseGetAllBlogsAdmin(params: BlogParams) {
  return useSuspenseQuery({
    queryKey: [`payments`, params],
    queryFn: () => getAllBlogsAdmin(params),
  });
}
