import { getAllBlogsPublic, getAllMentorsPublic } from "@/api";
import BlogDetailsView from "@/components/modules/blog/blog-details-view";
import MentorDetailsView from "@/components/modules/mentor/mentor-details-view";
import { BlogItem } from "@/types/blog.types";
import { IMentorProfile } from "@/types/mentor.type";
import { id } from "date-fns/locale";

export async function generateStaticParams() {
 
    const limit = 50;
  const first = await getAllMentorsPublic({limit, page:1});

  const totalPages = first.meta.totalPages ?? 1;

  const all = [...first.data]

  for (let page = 2; page <= totalPages; page++) {
    const data = await getAllMentorsPublic({page, limit})
    all.push(...data.data);
    
  }

  return all.map((mentor) => ({id: mentor.mentorId}))
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MentorDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <MentorDetailsView id={id} />;
}
