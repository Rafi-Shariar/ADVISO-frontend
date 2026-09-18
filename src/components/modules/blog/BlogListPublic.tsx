"use client";
import { useAllBlogsPublic } from "@/hooks";
import React from "react";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { BlogItem } from "@/types/blog.types";
import BlogCard from "./BlogCard";

const BlogListPublic = () => {
  //TODO:searching & pagination

  const { data, isPending } = useAllBlogsPublic();
  const blogs: BlogItem[] = data?.data?.data || [];

  return (
    <div className="mt-6 bg-orange-50 p-3 lg:p-6 rounded-[12px]">
      <div>
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {blogs?.map((blog) => (
              <BlogCard key={blog.blogId} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPublic;
