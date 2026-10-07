import { getAdminStats, getMentorStats, getPublicStats } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function usePublicStats() {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: getPublicStats,
    staleTime: 0,
    refetchOnWindowFocus: "always",
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    staleTime: 0,
    refetchOnWindowFocus: "always",
  });
}

export function useMentorStats() {
  return useQuery({
    queryKey: ["mentor-stats"],
    queryFn: getMentorStats,
    staleTime: 0,
    refetchOnWindowFocus: "always",
  });
}
