import { getAllSchedules } from "@/api";
import { ScheduleParams } from "@/types/schedule.type";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetAllSchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: [`users`, params],
    queryFn: () => getAllSchedules(params),
  });
}