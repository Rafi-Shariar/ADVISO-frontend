import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getMentorSchedules,
} from "@/api";
import { ScheduleParams } from "@/types/schedule.type";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useSuspenseGetAllSchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: [`schedules`, params],
    queryFn: () => getAllSchedules(params),
  });
}

export function useSuspenseGetMentorSchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: [`my-schedules`, params],
    queryFn: () => getMentorSchedules(params),
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
      await queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
      await queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
