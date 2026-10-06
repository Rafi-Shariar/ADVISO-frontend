"use client";

import { useMentorDetailsAdmin } from "@/hooks/mentor.hook";
import { ApplicationReview } from "@/types/mentor.type";
import { 
  Briefcase, 
  ExternalLink, 
  FileText, 
  Globe, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { RejectApplicationDialog } from "./reject-application-modal";
import { ApproveApplicationDialog } from "./confirm-applicatin-modal";

const ApplicationReviewView = ({ id }: { id: string }) => {
  const [isRejectOpen, setIsRejectOpen] = useState(false);
const [isApproveOpen, setIsApproveOpen] = useState(false);

  const { data, isPending } = useMentorDetailsAdmin(id);
  const application: ApplicationReview = data?.data;

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-3">
        <div className="size-10 rounded-full border-[3px] border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="text-xs font-medium text-muted-foreground animate-pulse tracking-wide">
          Loading application dossier...
        </p>
      </div>
    );
  }

  if (!application?.user) {
    return (
      <div className="max-w-2xl mx-auto my-24 p-8 rounded-3xl border border-dashed border-border text-center space-y-3 bg-muted/10">
        <UserCheck className="size-10 mx-auto text-muted-foreground/60" />
        <h3 className="text-lg font-semibold text-foreground">Application Not Found</h3>
        <p className="text-sm text-muted-foreground">The mentor profile record might have been removed or does not exist.</p>
      </div>
    );
  }

  const { user } = application;
  const isPendingStatus = application.verificationStatus === "PENDING";
  const isApproved = application.verificationStatus === "APPROVED";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* 🌟 1. Top Executive Profile & Action Banner (Hero Card) */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-orange-500/5 p-6 sm:p-8 shadow-sm">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-orange-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar with Glow Ring */}
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

            {/* Core Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {user.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-2xs ${
                    isPendingStatus
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      : isApproved
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isPendingStatus ? "bg-amber-500 animate-ping" : isApproved ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  {application.verificationStatus}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Mail className="size-3.5 text-orange-500" />
                  {user.email}
                </span>
                <span className="inline-block size-1 rounded-full bg-border" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-orange-500" />
                  Applied {new Date(application.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Review Actions */}
          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            <button
              onClick={() => setIsRejectOpen(true)}
              type="button"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/70 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98]"
            >
              <XCircle className="size-4" />
              Reject
            </button>
            <button
              type="button"
               onClick={() => setIsApproveOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="size-4" />
              Approve Mentor
            </button>
          </div>
        </div>

        {/* 📊 Integrated Mini Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 border border-border/40">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0">
              <Clock className="size-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Experience</p>
              <p className="text-base font-bold text-foreground">{application.yearOfExperience} Years</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 border border-border/40">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
              <DollarSign className="size-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Charge / Session</p>
              <p className="text-base font-bold text-foreground">${application.sessionCharge}</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center gap-3.5 p-3 rounded-2xl bg-muted/30 border border-border/40">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 shrink-0">
              <Briefcase className="size-4" />
            </div>
            <div className="truncate">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Domain</p>
              <p className="text-base font-bold text-foreground truncate capitalize">
                {application.professionalDomain ? application.professionalDomain.toLowerCase().replace(/_/g, " ") : "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🍱 2. Balanced 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Bento: Professional Dossier (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Headline & Statement */}
          <div className="flex-1 rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-4 text-orange-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Headline & Proposition
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                "{application.headline}"
              </h2>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Detailed Statement / Bio
              </span>
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {application.bio}
              </div>
            </div>

            {/* Core Skills & Expertise */}
            <div className="space-y-3 pt-3 border-t border-border/50">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Layers className="size-3.5 text-orange-500" /> Verified Expertise
              </span>
              <div className="flex flex-wrap gap-2">
                {application.expertiseTags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl bg-muted/50 border border-border/80 text-foreground text-xs font-medium hover:border-orange-500/40 hover:bg-orange-500/5 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Bento: Verification Assets & Profiles (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Documents Section */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="size-4 text-orange-500" />
                Submitted Documents
              </span>
              <span className="text-[11px] font-medium text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">
                {(application.resume ? 1 : 0) + (application.documents?.length || 0)} Files
              </span>
            </div>

            <div className="space-y-3">
              {/* Primary Resume */}
              {application.resume && (
                <Link
                  href={application.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-between p-3.5 rounded-2xl border border-border/70 bg-muted/20 hover:bg-orange-500/5 hover:border-orange-500/40 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 group-hover:scale-105 transition-transform">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                        Candidate Resume
                      </p>
                      <p className="text-[11px] text-muted-foreground">Primary Curriculum Vitae (PDF)</p>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                </Link>
              )}

              {/* Additional Verification Documents */}
              {application.documents?.map((doc, idx) => {
                const docUrl = doc.url || doc.fileUrl;
                if (!docUrl) return null;

                return (
                  <Link
                    key={doc.publicId}
                    href={docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center justify-between p-3.5 rounded-2xl border border-border/70 bg-muted/20 hover:bg-sky-500/5 hover:border-sky-500/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 group-hover:scale-105 transition-transform">
                        <FileText className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-sky-600 transition-colors line-clamp-1">
                          {doc.title || `Credential Document #${idx + 1}`}
                        </p>
                        <p className="text-[11px] text-muted-foreground">Certificate / Identity File</p>
                      </div>
                    </div>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-sky-600 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Social Proof & External Links */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block pb-3 border-b border-border/50">
              External Profiles
            </span>
            <div className="space-y-2.5">
              {application.linkedinURL && (
                <Link
                  href={application.linkedinURL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/60 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-foreground">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0077B5]">
                      <FaLinkedin className="size-4" />
                    </div>
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              )}

              {application.portfolioURL && (
                <Link
                  href={application.portfolioURL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/60 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-foreground">
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                      <Globe className="size-4" />
                    </div>
                    <span>Personal Portfolio</span>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>

        </div>

      </div>

      <RejectApplicationDialog
  open={isRejectOpen}
  onOpenChange={setIsRejectOpen}
  applicantName={user.name}
 
/>

<ApproveApplicationDialog
  open={isApproveOpen}
  onOpenChange={setIsApproveOpen}
  applicantName={user.name}
  yearOfExperience={application.yearOfExperience}
  sessionCharge={application.sessionCharge}
  professionalDomain={application.professionalDomain}

/>

    </div>
  );
};

export default ApplicationReviewView;