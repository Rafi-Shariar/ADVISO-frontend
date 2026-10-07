import apiClient from "@/lib/apiClient";
import { BookSchedule, PaySchedulePayload } from "@/types/session.type";

export const getAllSessionsAdmin = () => {
  return apiClient("/api/v1/session/admin/all-sessions");
};

export const getSessionsAdminDetails = (id: string) => {
  return apiClient(`/api/v1/session/admin/all-sessions/${id}`);
};

export const getAllSessionsMentor = () => {
  return apiClient("/api/v1/session/mentor-sessions");
};

export const getSessionsDetailsMentor = (id: string) => {
  return apiClient(`/api/v1/session/mentor-sessions/${id}`);
};

export const getSessionsOfMentor = (id: string) => {
  return apiClient(`/api/v1/session/slots/${id}`);
};


export const bookSchedule = (payload: BookSchedule) => {
  return apiClient("/api/v1/session/book", {
    method: "POST",
    body: payload,
  });
};

export const PaySchedule = (payload: PaySchedulePayload) => {
  return apiClient("/api/v1/session/pay-session", {
    method: "POST",
    body: payload,
  });
};