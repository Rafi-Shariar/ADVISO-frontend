"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ShieldAlert } from "lucide-react";

import { useBlogDetails } from "@/hooks";
import { BlogItem } from "@/types/blog.types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BlogDetailsSkeleton from "@/components/modules/blog/BlogDetailsSkeleton";
import BlogNotFoundCard from "@/components/modules/blog/BlogNotFoundCard";

export default function BlogDetailsPage() {
  const params = useParams();
  const id = (params?.blogId || params?.id) as string;

  const { data: response, isPending } = useBlogDetails(id);
  const blog: BlogItem | undefined = response?.data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // লোডিং স্টেট
  if (isPending) {
    return <BlogDetailsSkeleton />;
  }

  // ব্লগ না পাওয়া গেলে ৪-০-৪ ভিউ
  if (!blog) {
    return <BlogNotFoundCard />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ১. Full Width Banner Image */}
      <div className="relative w-full h-[260px] sm:h-[420px] rounded-[12px] overflow-hidden bg-muted border border-border/60 shadow-sm">
        <Image
          src={blog.bannerImage}
          alt={blog.title}
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      {/* ২. Profile Pic with Name & Headline */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative size-11 sm:size-12 rounded-full overflow-hidden bg-muted border border-border/70 shrink-0">
            <Image
              src={blog.mentor?.user?.profileURL}
              alt={blog.mentor?.user?.name || "Mentor"}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-foreground truncate leading-tight">
              {blog.mentor?.user?.name}
            </h4>
            <p className="text-xs text-muted-foreground truncate leading-snug">
              {blog.mentor?.headline}
            </p>
          </div>
        </div>

        <Link
          href={`/mentors/${blog.mentor?.mentorId}`}
          className="shrink-0 hidden sm:inline-block"
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-[12px] border-border/70 hover:border-orange-500 hover:text-orange-500 text-xs"
          >
            View Profile
          </Button>
        </Link>
      </div>

      {/* ৩. Blog Title & Created Date (Right side) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight flex-1">
            {blog.title}
          </h1>

          {/* Date and Read Time (Right-aligned) */}
          <div className="shrink-0 flex items-center sm:flex-col sm:items-end gap-2 sm:gap-1 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-orange-500" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ৪. Blog Content Area */}
      <div className="pt-2 text-foreground/90 font-normal leading-relaxed text-sm sm:text-base tracking-normal space-y-4 whitespace-pre-line border-t border-border/30">
        {blog.content}
      </div>

      {/* ব্যাক লিঙ্ক */}
      <div className="pt-8 border-t border-border/60">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to All Blogs</span>
        </Link>
      </div>
    </article>
  );
}
