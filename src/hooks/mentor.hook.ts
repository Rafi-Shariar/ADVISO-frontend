import {
  applyAsMentor,
  getAllMentorsAdmin,
  getAllMentorsPublic,
  getFeaturedMentors,
  getMentorDetails,
  getMentorDetailsAdmin,
  getMentorProfile,
  reviewApplication,
  updateMentorProfile,
} from "@/api/mentor.api";
import { MentorParams } from "@/types/mentor.type";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mentors"] });
      await queryClient.invalidateQueries({ queryKey: ["application-status"] });
    },
  });
}

export function useMentorDetailsAdmin(id: string) {
  return useQuery({
    queryKey: [`mentorDetails-${id}`],
    queryFn: () => getMentorDetailsAdmin(id),
    enabled: Boolean(id),
  });
}

export function useReviewApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewApplication,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mentors"] });
      await queryClient.invalidateQueries({ queryKey: ["application-status"] });
    },
  });
}

export function useGetMentorProfile() {
  return useQuery({
    queryKey: [`mentor-profile`],
    queryFn: getMentorProfile,
  });
}

export function useUpdateMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMentorProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mentors"] });
      await queryClient.invalidateQueries({ queryKey: ["mentor-profile"] });
    },
  });
}
