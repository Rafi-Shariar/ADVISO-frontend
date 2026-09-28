import { getFeaturedMentors, getMentorDetails } from "@/api/mentor.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFeaturedMentors() {
  return useQuery({
    queryKey: ["featured-mentors"],
    queryFn: getFeaturedMentors,
  });
}



export function useMentorDetails(id: string) {
  return useQuery({
    queryKey: [`mentor-${id}`],
    queryFn: () => getMentorDetails(id),
    enabled: Boolean(id),
  });
}
