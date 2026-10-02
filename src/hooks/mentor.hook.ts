import {
  getAllMentorsAdmin,
  getFeaturedMentors,
  getMentorDetails,
} from "@/api/mentor.api";
import { MentorParams } from "@/types/mentor.type";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

// export function useGetAllMentorsAdmin() {
//   return useQuery({
//     queryKey: ["all-mentors"],
//     queryFn: getAllMentorsAdmin,
//   });
// }

export function useSuspenseGetAllMentorsAdmin(params : MentorParams) {
  return useSuspenseQuery({
    queryKey: [`mentors`, params],
    queryFn: () => getAllMentorsAdmin(params),
  });
}
