import BlogListPublic from "@/components/modules/blog/BlogListPublic";
import React from "react";

const BlogsPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-16 px-2">
      {/* header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground ">
          Explore <span className="text-orange-500">thoughts</span> of the
          industry <span className="text-orange-500">experts</span>.
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground font-normal">
          See what our mentors say about the industry. Find there thoughts,
          experience & suggestions.
        </p>
      </div>

      <div>
        <BlogListPublic />
      </div>
    </div>
  );
};

export default BlogsPage;
