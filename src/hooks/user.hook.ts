import { changeAccountStatus, getAllUsersAdmin } from "@/api/user.api";
import { updateStatusArgs, UserParams } from "@/types/user.type";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetAllUsersAdmin(params: UserParams) {
  return useSuspenseQuery({
    queryKey: [`users`, params],
    queryFn: () => getAllUsersAdmin(params),
  });
}


export function useChangeAccountStatus(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : ({id,payload} : updateStatusArgs) => changeAccountStatus({id,payload}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]})
    }

  })
}