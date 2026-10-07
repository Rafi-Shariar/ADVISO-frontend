import apiClient from "@/lib/apiClient";
import {
  CreateSchedulePayload,
  DeleteSchedulePayload,
  ScheduleParams,
} from "@/types/schedule.type";

export const getAllSchedules = (params: ScheduleParams) => {
  return apiClient(`/api/v1/schedule/admin/all-schedules`, { params });
};

export const getMentorSchedules = (params: ScheduleParams) => {
  return apiClient(`/api/v1/schedule/my-schedules`, { params });
};

export const createSchedule = (payload: CreateSchedulePayload) => {
  return apiClient("/api/v1/schedule/create", {
    method: "POST",
    body: payload,
  });
};

export const deleteSchedule = (payload: DeleteSchedulePayload) => {
  return apiClient(`/api/v1/schedule/delete`, {
    method: "DELETE",
    body: payload,
  });
};
