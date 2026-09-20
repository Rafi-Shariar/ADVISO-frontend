import { getFeaturedReviews } from "@/api/review.api";
import { useQuery } from "@tanstack/react-query";

export function useFeaturedReviews() {
  return useQuery({
    queryKey: ["featured-reviews"],
    queryFn: getFeaturedReviews,
  });
}