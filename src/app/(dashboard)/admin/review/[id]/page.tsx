
import ApplicationReviewView from "@/components/modules/review-application/review-application-view";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationReviewPage({ params }: PageProps) {
  const { id } = await params;

  return <ApplicationReviewView id={id} />;
}
