import apiClient from "@/lib/apiClient";
import { profileImagePayload, updateStatusArgs, UserParams } from "@/types/user.type";

export const getAllUsersAdmin = (params: UserParams) => {
  return apiClient(`api/v1/user/admin/all-user`, { params });
};

export const changeAccountStatus = ({ id, payload }: updateStatusArgs) => {
  return apiClient(`/api/v1/user/admin/update-status/${id}`, {
    method: "PATCH",
    body: payload,
  });
};

export const deleteUserAccount = (id: string) => {
  return apiClient(`/api/v1/user/admin/delete-user/${id}`, {
    method: "DELETE",
  });
};

export const getApplicationStatus = () => {
  return apiClient(`api/v1/user/application-status`);
};


export const changeProfilePhoto = (paylaod: profileImagePayload) => {
  const formData = new FormData();

  formData.append("profileImage", paylaod.profileImage);

  return apiClient("/api/v1/user/profile-image", {
    method: "PATCH",
    body: formData,
  });
};