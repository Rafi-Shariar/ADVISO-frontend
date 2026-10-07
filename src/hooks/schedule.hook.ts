import { getAllSchedules, getMentorSchedules } from "@/api";
import { ScheduleParams } from "@/types/schedule.type";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetAllSchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: [`users`, params],
    queryFn: () => getAllSchedules(params),
  });
}

export function useSuspenseGetMentorSchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: [`my-schedules`, params],
    queryFn: () => getMentorSchedules(params),
  });
}
