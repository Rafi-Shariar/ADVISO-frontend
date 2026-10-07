import Image from "next/image";
import { Clock, BriefcaseBusiness, Star } from "lucide-react";
import { IMentorDetails } from "@/types/mentor.type";
import bannerImg from "@/assets/shared/mentor-details-banner.jpg";

export const MentorHeroBanner = ({ mentor }: { mentor: IMentorDetails }) => {
  const profileImage = mentor.user?.profileURL?.trim();

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Banner with Ambient Gradient */}
        <div className="relative w-full h-44 sm:h-56 rounded-3xl overflow-hidden bg-muted border border-border/60">
          <Image
            src={bannerImg}
            alt="Mentor Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
        </div>

        {/* Profile Avatar with Elevation */}
        <div className="relative -mt-16 sm:-mt-20 px-6 flex justify-start">
          <div className="relative size-28 sm:size-36 rounded-3xl overflow-hidden border-4 border-background bg-card shadow-lg ring-1 ring-border/80">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={mentor.user.name}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="size-full flex items-center justify-center font-bold text-3xl text-orange-600 bg-orange-500/10">
                {mentor.user.name
                  ? mentor.user.name.slice(0, 2).toUpperCase()
                  : "M"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta Identifiers */}
      <div className="px-2 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {mentor.user.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed max-w-3xl">
              {mentor.headline}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground bg-muted/60 border border-border/50 px-3 py-1 rounded-xl">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {mentor.averageRatings || "0.0"} ({mentor.totalReviews || 0}{" "}
            reviews)
          </span>

          <span className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/50 px-3 py-1 rounded-xl">
            <Clock className="size-3.5 text-muted-foreground" />
            {mentor.user.timezone}
          </span>

          <span className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/50 px-3 py-1 rounded-xl font-medium text-foreground capitalize">
            <BriefcaseBusiness className="size-3.5 text-orange-500" />
            {mentor.professionalDomain?.toLowerCase().replace(/_/g, " ")}
          </span>
        </div>
      </div>
    </div>
  );
};
