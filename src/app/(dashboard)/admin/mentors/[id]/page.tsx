import MentorProfileView from "@/components/modules/admin/mentor-profile/mentor-profile-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MentorProfileAdminPage({ params }: PageProps) {
  const { id } = await params;

  return <MentorProfileView id={id} />;
}
