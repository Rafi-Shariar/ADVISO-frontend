import { getAllSessionsAdmin, getSessionsAdminDetails } from "@/api";
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
