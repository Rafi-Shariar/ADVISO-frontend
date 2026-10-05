import { getAllSessionsAdmin } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useSessionsAdmin() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSessionsAdmin,
  });
}