import React from "react";
import { Users, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export interface IUserOverview {
  totalUsers: number;
  totalMentors: number;
}

interface Props {
  users?: IUserOverview;
}

export const UserCards = ({ users }: Props) => {
  const totalRegistered = users?.totalUsers ?? 0;
  const verifiedMentors = users?.totalMentors ?? 0;

  // Students/Mentees pool calculation
  const menteesCount = Math.max(0, totalRegistered - verifiedMentors);
  const mentorRatio =
    totalRegistered > 0
      ? ((verifiedMentors / totalRegistered) * 100).toFixed(1)
      : "0";

  return (
    <div className="rounded-[12px] border border-border/70 bg-card p-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-border/40">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Platform Population
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Breakdown of registered community members and educators
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-muted/40 border border-border/60 px-3 py-1 text-[11px] font-mono text-muted-foreground">
          <ShieldCheck className="size-3.5 text-orange-500" />
          <span>{mentorRatio}% Mentor Density</span>
        </div>
      </div>

      {/* Segmented Counter Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40 pt-4">
        {/* Total Pool */}
        <div className="py-4 md:py-0 md:px-5 first:pl-0 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <Users className="size-4 stroke-[1.75]" />
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Total Accounts
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
            {totalRegistered.toLocaleString()}
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            All user identities across Adviso
          </p>
        </div>

        {/* Mentors (Instructors) */}
        <div className="py-4 md:py-0 md:px-5 space-y-2">
          <div className="flex items-center gap-2 text-orange-500/90">
            <GraduationCap className="size-4 stroke-[1.75]" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
              Verified Mentors
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
            {verifiedMentors.toLocaleString()}
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Approved educators & domain experts
          </p>
        </div>

        {/* Mentees / Students */}
        <div className="py-4 md:py-0 md:px-5 last:pr-0 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <ArrowRight className="size-4 stroke-[1.75] text-blue-500" />
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Active Learners
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
            {menteesCount.toLocaleString()}
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Mentees seeking bookings & advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
