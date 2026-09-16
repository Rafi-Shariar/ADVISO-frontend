
import { getPublicStats } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";


export function usePublicStats() {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: getPublicStats,
  });
}
