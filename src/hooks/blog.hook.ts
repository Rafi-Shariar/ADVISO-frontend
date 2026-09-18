import { getAllBlogsPublic, getFeaturedBlogs, getPublicStats } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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
