import {
  getAllSessionsAdmin,
  getAllSessionsMentor,
  getSessionsAdminDetails,
  getSessionsDetailsMentor,
} from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useSessionsAdmin() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSessionsAdmin,
  });
}

export function useSessionDetails(id: string) {
  return useQuery({
    queryKey: [`session-${id}`],
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
    queryKey: [`mentor-session-${id}`],
    queryFn: () => getSessionsDetailsMentor(id),
    enabled: Boolean(id),
  });
}
