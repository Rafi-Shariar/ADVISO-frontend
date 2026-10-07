import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, ShieldCheck, Star } from "lucide-react";
import { IMentorProfile } from "@/types/mentor.type";
interface Props {
  mentor: IMentorProfile;
}
const MentorCard = ({ mentor }: Props) => {
  const profileImage = mentor.user?.profileURL?.trim();

  return (
    <Link
      key={mentor.mentorId}
      href={`/mentors/${mentor.mentorId}`}
      className="group shrink-0 w-[200px] sm:w-[250px] snap-start rounded-[12px] bg-card border border-border/60 hover:border-orange-500/50 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 select-none"
    >
      <div>
        {/* Balanced Compact Portrait Image */}
        <div className="relative w-full aspect-square rounded-[12px] overflow-hidden bg-muted mb-3 border border-border/40">
          <Image
            src={mentor.user.profileURL}
            alt={mentor.user.name}
            fill
            sizes="250px"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />

          {/* Floating Rating Badge (Bottom Left) */}
          <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-md text-white px-2 py-0.5 rounded-[8px] text-[11px] font-semibold flex items-center gap-1 border border-white/10 shadow-sm">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span>{mentor.averageRatings}</span>
            <span className="text-[10px] text-white/70">
              ({mentor.totalReviews})
            </span>
          </div>
        </div>

        {/* Mentor Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-foreground truncate group-hover:text-orange-500 transition-colors">
            {mentor.user.name}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-1 leading-snug">
            {mentor.headline}
          </p>
        </div>
      </div>

      {/* Clean Meta Strip: Exp & Professional Domain & Pricing */}
      <div className="pt-2.5 mt-3 border-t border-border/40 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-orange-500" />
            {mentor.yearOfExperience}y exp
          </span>

          {/* অপশন ২: নিচে রাখতে চাইলে "Verified"-এর বদলে বা সাথে */}
          <span className="font-semibold text-foreground text-sm">
            <span className="text-orange-500">${mentor.sessionCharge}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/80 truncate">
          <BriefcaseBusiness className="size-3.5 text-orange-500 shrink-0" />
          <span className="truncate">{mentor.professionalDomain}</span>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
