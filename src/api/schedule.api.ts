import apiClient from "@/lib/apiClient";
import { ScheduleParams } from "@/types/schedule.type";

export const getAllSchedules = (params: ScheduleParams) => {
  return apiClient(`/api/v1/schedule/admin/all-schedules`, { params });
};


export const getMentorSchedules = (params: ScheduleParams) => {
  return apiClient(`/api/v1/schedule/my-schedules`, { params });
};


