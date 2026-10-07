import Image from "next/image";
import { 
  Mail, 
  Calendar, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Star, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert
} from "lucide-react";

interface ProfileHeroHeaderProps {
  profile: any;
}

export const ProfileHeroHeader = ({ profile }: ProfileHeroHeaderProps) => {
  const { user } = profile;
  const isApproved = profile.verificationStatus === "APPROVED";
  const isOpen = profile.mentorshipStatus === "OPEN";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-orange-500/5 dark:to-orange-500/10 p-6 sm:p-8 shadow-xs">
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with gradient glow ring */}
          <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden ring-2 ring-orange-500/30 p-0.5 bg-gradient-to-tr from-orange-500 to-amber-400 shrink-0 shadow-md">
            <div className="relative size-full rounded-[14px] overflow-hidden bg-background">
              {user.profileURL ? (
                <Image
                  src={user.profileURL}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center font-bold text-2xl text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* User Identifiers & Status Tags */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {user.name}
              </h1>

              {/* Verification Tag */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-2xs ${
                  isApproved
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                <CheckCircle2 className="size-3.5" />
                {profile.verificationStatus}
              </span>

              {/* Mentorship Availability Tag */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium border shadow-2xs ${
                  isOpen
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                <span className={`size-1.5 rounded-full ${isOpen ? "bg-sky-500 animate-pulse" : "bg-muted-foreground"}`} />
                {profile.mentorshipStatus}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail className="size-3.5 text-orange-500" />
                {user.email}
              </span>
              <span className="inline-block size-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-orange-500" />
                Joined {new Date(profile.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Aggregate Ratings & Sessions Metric */}
        <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/60 shadow-xs">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Star className="size-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-foreground">{profile.averageRatings || "0.0"}</span>
                <span className="text-xs text-muted-foreground">/ 5.0</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{profile.totalReviews || 0} Mentee Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Integrated Mini Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 dark:bg-muted/20 border border-border/40">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 shrink-0">
            <Clock className="size-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Experience</p>
            <p className="text-base font-bold text-foreground">{profile.yearOfExperience} Years</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 dark:bg-muted/20 border border-border/40">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <DollarSign className="size-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Session Charge</p>
            <p className="text-base font-bold text-foreground">${profile.sessionCharge}</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 dark:bg-muted/20 border border-border/40">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
            <Sparkles className="size-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Completed Sessions</p>
            <p className="text-base font-bold text-foreground">{profile.totalSessionsCompleted || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 dark:bg-muted/20 border border-border/40">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
            <Briefcase className="size-4" />
          </div>
          <div className="truncate">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Domain</p>
            <p className="text-sm font-bold text-foreground truncate capitalize">
              {profile.professionalDomain?.toLowerCase().replace(/_/g, " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};