import apiClient from "@/lib/apiClient";

export const getFeaturedMentors = () => {
  return apiClient("/api/v1/mentor/featured");
};

export const getMentorDetails = (id : string) => {
  return apiClient(`/api/v1/mentor/${id}`);
};
