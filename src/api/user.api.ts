import apiClient from "@/lib/apiClient";
import { ChangeAccountStatusPayload, updateStatusArgs, UserParams } from "@/types/user.type";

export const getAllUsersAdmin = (params: UserParams) => {
  return apiClient(`api/v1/user/admin/all-user`, { params });
};


export const changeAccountStatus = ( {id,payload} : updateStatusArgs) => {

  return apiClient(`/api/v1/user/admin/update-status/${id}`, {
    method : "PATCH",
    body : payload
  })

}