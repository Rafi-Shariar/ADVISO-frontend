import { ShieldCheck, CalendarCheck, Star, DollarSign } from "lucide-react";
import { IMentorDetails } from "@/types/mentor.type";

export const MentorStatsStrip = ({ mentor }: { mentor: IMentorDetails }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-3xl bg-card border border-border/70 shadow-2xs">
      <div className="p-3 rounded-2xl bg-muted/30 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Experience</span>
        <span className="text-base sm:text-lg font-bold text-foreground flex items-center gap-1.5 mt-0.5">
          <ShieldCheck className="size-4 text-orange-500" />
          {mentor.yearOfExperience}+ Years
        </span>
      </div>

      <div className="p-3 rounded-2xl bg-muted/30 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Engagements</span>
        <span className="text-base sm:text-lg font-bold text-foreground flex items-center gap-1.5 mt-0.5">
          <CalendarCheck className="size-4 text-emerald-500" />
          {mentor.totalSessionsCompleted} Sessions
        </span>
      </div>

      <div className="p-3 rounded-2xl bg-muted/30 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Overall Rating</span>
        <span className="text-base sm:text-lg font-bold text-foreground flex items-center gap-1.5 mt-0.5">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          {mentor.averageRatings || "0.0"} / 5.0
        </span>
      </div>

      <div className="p-3 rounded-2xl bg-muted/30 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Session Charge</span>
        <span className="text-base sm:text-lg font-black text-orange-600 dark:text-orange-400 flex items-center gap-0.5 mt-0.5">
          <DollarSign className="size-4" />
          {mentor.sessionCharge}
          <span className="text-xs font-normal text-muted-foreground">/ session</span>
        </span>
      </div>
    </div>
  );
};