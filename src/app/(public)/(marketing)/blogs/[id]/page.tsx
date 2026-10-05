import { getAllBlogsPublic } from "@/api";
import BlogDetailsView from "@/components/modules/blog/blog-details-view";
import { BlogItem } from "@/types/blog.types";


export async function generateStaticParams() {
  const data = await getAllBlogsPublic();

  const blogs: BlogItem[] = data?.data?.data || [];

  return (blogs || []).map((blog: BlogItem) => ({
    id: blog.blogId,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <BlogDetailsView id={id} />;
}