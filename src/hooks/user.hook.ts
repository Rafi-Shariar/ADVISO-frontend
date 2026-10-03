import { getAllUsersAdmin } from "@/api/user.api";
import { UserParams } from "@/types/user.type";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetAllUsersAdmin(params: UserParams) {
  return useSuspenseQuery({
    queryKey: [`users`, params],
    queryFn: () => getAllUsersAdmin(params),
  });
}