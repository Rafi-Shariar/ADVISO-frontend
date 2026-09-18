"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFeaturedBlogs } from "@/hooks";
import { BlogItem } from "@/types/blog.types";
import { BlogCardSkeleton } from "../blog/BlogCardSkeleton";

const BANNER_IMAGE =
  "https://res.cloudinary.com/ps64ygxj/image/upload/v1788634719/blogs/foshd3gmuoooe7dsdunz.jpg";



const mockBlogs: BlogItem[] = [
  {
    blogId: "01M1SERQ7A2H75DQW2FXS6M4AS",
    title: "Next.js World: Scaling Server-Driven Applications",
    content:
      "Building scalable architectures requires a firm grasp of relational schema isolation, edge caching layers, and end-to-end type validation using Node.js, Prisma ORM, and Zod.",
    bannerImage: BANNER_IMAGE,
    createdAt: "2026-09-05T18:54:48.042Z",
    mentor: {
      mentorId: "5552f751-ce78-49e5-807c-ed77fb264bb1",
      headline: "Lead Architect & Cloud Consultant",
      user: {
        name: "Tahmid Rahman",
        profileURL:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
    },
  },
  {
    blogId: "02B2MTRP8B3J86ERX3GYT7N5BT",
    title: "Deconstructing High-Throughput Microservices",
    content:
      "A technical walkthrough on orchestrating fault-tolerant message brokers, managing distributed transactions with Saga patterns, and keeping latency strictly under 25ms.",
    bannerImage: BANNER_IMAGE,
    createdAt: "2026-09-08T11:20:15.110Z",
    mentor: {
      mentorId: "2222f751-ce78-49e5-807c-ed77fb264bb3",
      headline: "Staff Systems Engineer @ InfraCore",
      user: {
        name: "Zubair Al Mahmud",
        profileURL:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
    },
  },
  {
    blogId: "03C3NVSQ9C4K97FSY4HZS8O6CU",
    title: "Engineering Management: The First 90 Days",
    content:
      "Transitioning from an Individual Contributor to leading teams requires trading code execution for delegation frameworks, clear OKRs, and high-trust 1-on-1 feedback cadences.",
    bannerImage: BANNER_IMAGE,
    createdAt: "2026-09-11T14:42:00.820Z",
    mentor: {
      mentorId: "7772f751-ce78-49e5-807c-ed77fb264bb8",
      headline: "Senior Engineering Manager @ Enterprise",
      user: {
        name: "Sajid Imtiaz",
        profileURL:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
    },
  },
  {
    blogId: "04D4OWTR0D5L08GTZ5IAT9P7DV",
    title: "Full-Funnel Acquisition Loops for Early Stage SaaS",
    content:
      "Unpacking systematic conversion rate optimization, data instrumentation with PostHog, and programmatic SEO playbooks that reliably drive down customer acquisition costs.",
    bannerImage: BANNER_IMAGE,
    createdAt: "2026-09-14T09:15:32.450Z",
    mentor: {
      mentorId: "5552f751-ce78-49e5-807c-ed77fb264bb6",
      headline: "VP of Growth & Performance Marketing",
      user: {
        name: "Nabila Karim",
        profileURL:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
    },
  },
];

export default function BlogSection() {

  const {data, isPending} = useFeaturedBlogs()

  const blogs : BlogItem[]= data?.data || []

  console.log(blogs);
  
    
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
          {
            isPending ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              <BlogCardSkeleton/>
              <BlogCardSkeleton/>

            </div> : 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.blogId}
              href={`/blogs/${blog.blogId}`}
              className="group rounded-[12px] bg-white dark:bg-zinc-900 border border-border/70 hover:border-orange-500/50 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative select-none"
            >
              {/* Wide Aspect Banner Image */}
              <div className="relative w-full sm:w-[200px] h-[160px] sm:h-auto shrink-0 rounded-[12px] overflow-hidden bg-muted border border-border/40">
                <Image
                  src={blog.bannerImage}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-md text-white px-2 py-0.5 rounded-[8px] text-[10px] font-mono tracking-wider border border-white/10">
                  READ
                </div>
              </div>

              {/* Content & Author Strip */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3 text-orange-500" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="size-1 rounded-full bg-border" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3 text-orange-500" />5 min read
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                    {blog.content}
                  </p>
                </div>

                {/* Mentor / Author Pod */}
                <div className="pt-3 mt-4 border-t border-border/40 flex items-center gap-2.5">
                  <div className="relative size-7 rounded-full overflow-hidden bg-muted shrink-0 border border-border/60">
                    <Image
                      src={blog.mentor.user.profileURL}
                      alt={blog.mentor.user.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">
                      {blog.mentor.user.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {blog.mentor.headline}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
          }
        </div>

       
      </div>
    </section>
  );
}
