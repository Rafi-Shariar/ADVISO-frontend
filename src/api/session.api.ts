import apiClient from "@/lib/apiClient";
import {
  BookSchedule,
  CancleSession,
  PaySchedulePayload,
} from "@/types/session.type";

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

export const getAllSessionsUser = () => {
  return apiClient("/api/v1/session/my-sessions");
};

export const getSessionsUserDetails = (id: string) => {
  return apiClient(`/api/v1/session/my-sessions/${id}`);
};

export const cancleSession = (payload: CancleSession) => {
  return apiClient("/api/v1/session/cancel", {
    method: "POST",
    body: payload,
  });
};
