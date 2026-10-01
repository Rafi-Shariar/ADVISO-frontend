"use client";

import BlogCard from "@/components/modules/blog/BlogCard";
import BlogCardMentorDetails from "@/components/modules/blog/BlogCardMentorDetails";
import { ReviewCard } from "@/components/modules/review/ReviewCard";
import { useMentorDetails } from "@/hooks/mentor.hook";
import { IMentorDetails } from "@/types/mentor.type";
import { useParams } from "next/navigation";

const MentorDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isPending } = useMentorDetails(id);

  if (isPending) {
    return <>Loading</>;
  }

  const mentorData: IMentorDetails = data?.data || {};

  console.log(mentorData);

  return (
    <div className="max-w-7xl mx-auto my-16">
      <h1>Name : {mentorData.user.name}</h1>
      <h1>Headline: {mentorData.headline}</h1>
      <h1>{mentorData.bio}</h1>

      <div>
        <h1>Expertise: </h1>
        <div>
          {mentorData.expertiseTags.map((tag) => (
            <h1 key={tag}>{tag}</h1>
          ))}
        </div>
      </div>

      <h1>Experience : {mentorData.yearOfExperience}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mentorData.blogs.map((blog) => (
          <BlogCardMentorDetails key={blog.blogId} blog={blog} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {mentorData.reviews.map((review) => (
          <ReviewCard key={review.comment} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MentorDetailsPage;
