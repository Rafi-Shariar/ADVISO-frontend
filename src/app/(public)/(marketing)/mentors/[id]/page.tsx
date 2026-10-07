import { getAllMentorsPublic } from "@/api";
import MentorDetailsView from "@/components/modules/mentor/mentor-details-public/mentor-details-view";
import { IMentorProfile } from "@/types/mentor.type";

export async function generateStaticParams() {
  try {
    const res = await getAllMentorsPublic({ limit: 50, page: 1 });
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

export default async function MentorDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <MentorDetailsView id={id} />;
}
