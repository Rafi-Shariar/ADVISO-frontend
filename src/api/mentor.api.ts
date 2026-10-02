import apiClient from "@/lib/apiClient";
import { MentorParams } from "@/types/mentor.type";

export const getFeaturedMentors = () => {
  return apiClient("/api/v1/mentor/featured");
};

export const getMentorDetails = (id: string) => {
  return apiClient(`/api/v1/mentor/${id}`);
};

export const getAllMentorsAdmin = (params: MentorParams) => {
  return apiClient(`api/v1/mentor/admin/all-mentors`, { params });
};
