import {
  applyAsMentor,
  getAllMentorsAdmin,
  getAllMentorsPublic,
  getFeaturedMentors,
  getMentorDetails,
} from "@/api/mentor.api";
import { MentorParams } from "@/types/mentor.type";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useFeaturedMentors() {
  return useQuery({
    queryKey: ["featured-mentors"],
    queryFn: getFeaturedMentors,
  });
}

export function useSuspenseGetAllMentorsPublic(params: MentorParams) {
  return useSuspenseQuery({
    queryKey: [`mentors`, params],
    queryFn: () => getAllMentorsPublic(params),
  });
}

export function useMentorDetails(id: string) {
  return useQuery({
    queryKey: [`mentor-${id}`],
    queryFn: () => getMentorDetails(id),
    enabled: Boolean(id),
  });
}

export function useSuspenseGetAllMentorsAdmin(params: MentorParams) {
  return useSuspenseQuery({
    queryKey: [`mentors`, params],
    queryFn: () => getAllMentorsAdmin(params),
  });
}


export function useApplyAsMentor() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyAsMentor,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ["mentors"]})
    }
  });
}