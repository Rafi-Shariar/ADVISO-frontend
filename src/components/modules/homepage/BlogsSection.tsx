"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFeaturedBlogs } from "@/hooks";
import { BlogItem } from "@/types/blog.types";
import { BlogCardSkeleton } from "../blog/BlogCardSkeleton";
import BlogCard from "../blog/BlogCard";

export default function BlogSection() {
  const { data, isPending } = useFeaturedBlogs();

  const blogs: BlogItem[] = data?.data || [];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8  dark:bg-zinc-900/50 border-y border-border/50 selection:bg-orange-500/20 selection:text-orange-600 relative overflow-hidden">
      {/* Ambient Warm Corner Glow for Visual Hierarchy */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border/50 pb-5">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
              Blogs from our expert
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Deep-dive breakdowns, industry field manuals, and engineering
              leadership perspectives.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors self-end sm:self-auto"
          >
            <span>More Blogs</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div>
          {isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.blogId} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
