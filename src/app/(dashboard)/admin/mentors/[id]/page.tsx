import { getAllMentorsAdmin, getAllMentorsPublic } from "@/api";
import MentorProfileView from "@/components/modules/admin/mentor-profile/mentor-profile-view";
import MentorDetailsView from "@/components/modules/mentor/mentor-details-view";
import ApplicationReviewView from "@/components/modules/review-application/review-application-view";
import { IMentorProfile } from "@/types/mentor.type";

export async function generateStaticParams() {
  try {
    const res = await getAllMentorsAdmin({ limit: 50, page: 1 });
    const mentors: IMentorProfile[] = res?.data || [];

    return mentors.map((mentor) => ({
      id: mentor.mentorId,
    }));
  } catch (error) {
    console.error("Error generating static params for mentors:", error);
    return [];
  }
}

export const revalidate = 3600;

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MentorProfileAdminPage({ params }: PageProps) {
  const { id } = await params;

  return <MentorProfileView id={id} />;
}
