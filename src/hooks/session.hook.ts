import {
  bookSchedule,
  cancleSession,
  getAllSessionsAdmin,
  getAllSessionsMentor,
  getAllSessionsUser,
  getSessionsAdminDetails,
  getSessionsDetailsMentor,
  getSessionsOfMentor,
  getSessionsUserDetails,
  PaySchedule,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSessionsAdmin() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSessionsAdmin,
  });
}

export function useSessionDetails(id: string) {
  return useQuery({
    queryKey: [`session-`, id],
    queryFn: () => getSessionsAdminDetails(id),
    enabled: Boolean(id),
  });
}

export function useSessionsMentor() {
  return useQuery({
    queryKey: ["mentor-sessions"],
    queryFn: getAllSessionsMentor,
  });
}

export function useSessionDetailsMentor(id: string) {
  return useQuery({
    queryKey: [`mentor-session`, id],
    queryFn: () => getSessionsDetailsMentor(id),
    enabled: Boolean(id),
  });
}

export function useSessionsOfMentor(id: string) {
  return useQuery({
    queryKey: [`mentor-session`, id],
    queryFn: () => getSessionsOfMentor(id),
    enabled: Boolean(id),
  });
}

export function useBookSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mentor-session"] });
    },
  });
}

export function usePaySchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PaySchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mentor-session"] });
      await queryClient.invalidateQueries({ queryKey: ["mentor-sessions"] });
    },
  });
}

export function useSessionsUser() {
  return useQuery({
    queryKey: ["my-sessions"],
    queryFn: getAllSessionsUser,
  });
}

export function useSessionDetailsUser(id: string) {
  return useQuery({
    queryKey: [`my-session`, id],
    queryFn: () => getSessionsUserDetails(id),
    enabled: Boolean(id),
  });
}

export function useCancleSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancleSession,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mentor-sessions"] });
      await queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
  });
}
