import {
  bookSchedule,
  getAllSessionsAdmin,
  getAllSessionsMentor,
  getSessionsAdminDetails,
  getSessionsDetailsMentor,
  getSessionsOfMentor,
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
