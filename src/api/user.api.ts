import apiClient from "@/lib/apiClient";
import { UserParams } from "@/types/user.type";

export const getAllUsersAdmin = (params: UserParams) => {
  return apiClient(`api/v1/user/admin/all-user`, { params });
};
