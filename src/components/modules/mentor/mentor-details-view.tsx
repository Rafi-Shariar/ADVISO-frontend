"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  BriefcaseBusiness, 
  ShieldCheck, 
  Globe, 
 
  CalendarCheck, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

import { useMentorDetails } from "@/hooks/mentor.hook";
import { IMentorDetails } from "@/types/mentor.type";
import { Button } from "@/components/ui/button";
import bannerImg from "@/assets/shared/mentor-details-banner.jpg";
import { FaLinkedinIn } from "react-icons/fa";

const MentorDetailsView = ({ id }: { id: string }) => {
  const { data, isPending } = useMentorDetails(id);
  const mentor: IMentorDetails = data?.data;

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 flex justify-center items-center">
        <div className="size-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!mentor?.user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Mentor profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner & Centered Profile Image */}
      <div className="relative">
        <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-muted border border-border/50">
          <Image
            src={bannerImg}
            alt="Mentor Banner"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative -mt-30 sm:-mt-44 flex justify-center">
          <div className="relative size-44 sm:size-64 rounded-full overflow-hidden border-4 border-background bg-muted shadow-lg">
            <Image
              src={mentor.user.profileURL}
              alt={mentor.user.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {mentor.user.name}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {mentor.headline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-semibold text-foreground bg-muted px-2.5 py-1 rounded-md">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {mentor.averageRatings ?? "0"} ({mentor.totalReviews ?? 0} reviews)
          </span>

          <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md">
            <Clock className="size-3.5" />
            {mentor.user.timezone}
          </span>

          <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md">
            <BriefcaseBusiness className="size-3.5 text-orange-500" />
            {mentor.professionalDomain?.replace(/_/g, " ")}
          </span>
        </div>

      </div>

      {/* Key Stats & Pricing Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
        <div className="flex items-center justify-between sm:justify-center sm:flex-col gap-1 sm:border-r border-border/50">
          <span className="text-xs text-muted-foreground">Experience</span>
          <span className="text-lg font-bold flex items-center gap-1">
            <ShieldCheck className="size-4 text-orange-500" />
            {mentor.yearOfExperience}+ Years
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-center sm:flex-col gap-1 sm:border-r border-border/50">
          <span className="text-xs text-muted-foreground">Sessions Completed</span>
          <span className="text-lg font-bold flex items-center gap-1">
            <CalendarCheck className="size-4 text-orange-500" />
            {mentor.totalSessionsCompleted}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-center sm:flex-col gap-1">
          <span className="text-xs text-muted-foreground">Session Fee</span>
          <span className="text-xl sm:text-2xl font-black text-orange-500">
            ${mentor.sessionCharge}
            <span className="text-xs font-normal text-muted-foreground ml-1">/session</span>
          </span>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-3 p-6 rounded-2xl bg-card border border-border/60">
        <h2 className="text-base font-bold text-foreground">About Me</h2>
        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
          {mentor.bio}
        </p>
      </div>

      {/* Expertise Tags */}
      {mentor.expertiseTags?.length > 0 && (
        <div className="space-y-3 p-6 rounded-2xl bg-card border border-border/60">
          <h2 className="text-base font-bold text-foreground">Areas of Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {mentor.expertiseTags.map((tag, idx) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground flex items-center gap-1.5"
              >
                <CheckCircle2 className="size-3 text-orange-500" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Student Reviews ({mentor.reviews?.length ?? 0})
          </h2>
        </div>
        {mentor.reviews?.length === 0 && (
          <p className="text-xs text-muted-foreground">No reviews yet.</p>
        )}
      </section>

      {/* Blogs Section */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Articles by {mentor.user.name} ({mentor.blogs?.length ?? 0})
          </h2>
        </div>
        {mentor.blogs?.length === 0 && (
          <p className="text-xs text-muted-foreground">No published blogs yet.</p>
        )}
      </section>
    </div>
  );
};

export default MentorDetailsView;