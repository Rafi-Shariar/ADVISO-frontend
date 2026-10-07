import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Briefcase, Clock, Globe, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { IMentorDetails } from "@/types/mentor.type";

export const MentorStickySidebar = ({ mentor }: { mentor: IMentorDetails }) => {
  const profileImage = mentor.user?.profileURL?.trim();

  return (
    <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-sm space-y-6">
      
      {/* 1. Portrait Image (Matches ADVISO Card Style) */}
      <div className="relative w-full aspect-square sm:aspect-[4/4.2] rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700/60">
        {profileImage ? (
          <Image
            src={profileImage}
            alt={mentor.user.name}
            fill
            priority
            className="object-cover object-top"
          />
        ) : (
          <div className="size-full flex items-center justify-center font-bold text-3xl text-zinc-400">
            {mentor.user.name?.slice(0, 2).toUpperCase() || "ME"}
          </div>
        )}

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-[12px] bg-zinc-900/85 backdrop-blur-xs text-white text-[11px] font-bold border border-zinc-800 shadow-sm">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span>{mentor.averageRatings || "5.0"}</span>
          <span className="text-zinc-400 font-normal">({mentor.totalReviews || 0})</span>
        </div>
      </div>

      {/* 2. Primary Identifiers */}
      <div className="space-y-2">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          {mentor.user.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          {mentor.headline}
        </p>
      </div>

      {/* 3. Essential Metrics Strip */}
      <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-100 dark:border-zinc-800/80">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Experience</span>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-orange-500" />
            {mentor.yearOfExperience}+ Years
          </p>
        </div>

        <div className="space-y-0.5 text-right">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Fee / Session</span>
          <p className="text-base font-black text-orange-600 dark:text-orange-500">
            ${mentor.sessionCharge}
          </p>
        </div>
      </div>

      {/* 4. Domain & Timezone Badges */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[12px] bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 capitalize">
          <Briefcase className="size-3 text-zinc-400" />
          {mentor.professionalDomain ? mentor.professionalDomain.toLowerCase().replace(/_/g, " ") : "Specialist"}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[12px] bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300">
          <Clock className="size-3 text-zinc-400" />
          {mentor.user.timezone}
        </span>
      </div>

      {/* 5. Bio / Overview */}
      <div className="space-y-2 pt-2">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
          About Mentor
        </span>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
          {mentor.bio}
        </p>
      </div>

      {/* 6. Skills & Expertise Tags */}
      {mentor.expertiseTags?.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            Expertise
          </span>
          <div className="flex flex-wrap gap-1.5">
            {mentor.expertiseTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-[12px] bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/50 dark:border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 7. Social Links */}
      {(mentor.linkedinURL || mentor.portfolioURL) && (
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          {mentor.linkedinURL && (
            <Link
              href={mentor.linkedinURL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-orange-600 transition-colors"
            >
              <FaLinkedinIn className="size-3 text-[#0077B5]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="size-3 text-zinc-400" />
            </Link>
          )}

          {mentor.portfolioURL && (
            <Link
              href={mentor.portfolioURL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-orange-600 transition-colors"
            >
              <Globe className="size-3 text-zinc-500" />
              <span>Portfolio</span>
              <ArrowUpRight className="size-3 text-zinc-400" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};