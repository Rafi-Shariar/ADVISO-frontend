import apiClient from "@/lib/apiClient";
import { MentorApplicationPayload, MentorParams, ReviewApplicationPaylaod } from "@/types/mentor.type";

export const getFeaturedMentors = () => {
  return apiClient("/api/v1/mentor/featured");
};

export const getAllMentorsPublic = (params: MentorParams) => {
  return apiClient(`/api/v1/mentor`, { params });
};

export const getMentorDetails = (id: string) => {
  return apiClient(`/api/v1/mentor/${id}`);
};

export const getAllMentorsAdmin = (params: MentorParams) => {
  return apiClient(`/api/v1/mentor/admin/all-mentors`, { params });
};

export const applyAsMentor = (paylaod: MentorApplicationPayload) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(paylaod.data));
  formData.append("resume", paylaod.resume);
  formData.append("documents", paylaod.documents);

  return apiClient("/api/v1/mentor/applications/apply", {
    method: "POST",
    body: formData,
  });
};


export const getMentorDetailsAdmin = (id: string) => {
  return apiClient(`/api/v1/mentor/admin/all-mentors/${id}`);
};

export const reviewApplication = (payload: ReviewApplicationPaylaod) => {
  return apiClient("/api/v1/mentor/applications/approve", { method: "POST", body: payload });
};