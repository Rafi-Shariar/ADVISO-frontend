import { getFeaturedMentors } from "@/api/mentor.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFeaturedMentors() {
  return useQuery({
    queryKey: ["featured-mentors"],
    queryFn: getFeaturedMentors,
  });
}
