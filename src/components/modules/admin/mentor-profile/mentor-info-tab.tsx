import Link from "next/link";
import { Sparkles, Layers, ShieldCheck, FileText, ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";

export const MentorInfoTab = ({ profile }: { profile: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Bento: Headline, Bio & Expertise (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex-1 rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-4 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Headline
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
              "{profile.headline}"
            </h2>
          </div>

          <div className="space-y-2 pt-4 border-t border-border/50">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              About & Mentorship Philosophy
            </span>
            <div className="p-4 rounded-2xl bg-muted/30 dark:bg-muted/20 border border-border/50 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {profile.bio}
            </div>
          </div>

          {/* Core Expertise Tags */}
          <div className="space-y-3 pt-3 border-t border-border/50">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="size-3.5 text-orange-500" /> Core Skills & Competencies
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.expertiseTags?.map((tag: string) => (
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

      {/* Right Bento: Documents & Links (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Documents */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-orange-500" />
              Credentials & Documents
            </span>
          </div>

          <div className="space-y-3">
            {profile.resume && (
              <Link
                href={profile.resume}
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
                    <p className="text-[11px] text-muted-foreground">Curriculum Vitae (PDF)</p>
                  </div>
                </div>
                <ExternalLink className="size-4 text-muted-foreground group-hover:text-orange-600 transition-colors" />
              </Link>
            )}

            {profile.documents?.map((doc: any, idx: number) => {
              const docUrl = doc.url || doc.fileUrl;
              if (!docUrl) return null;

              return (
                <Link
                  key={doc.publicId || idx}
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
                      <p className="text-[11px] text-muted-foreground">Verified Document File</p>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-sky-600 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* External Profiles */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block pb-3 border-b border-border/50">
            External Profiles
          </span>
          <div className="space-y-2.5">
            {profile.linkedinURL && (
              <Link
                href={profile.linkedinURL}
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

            {profile.portfolioURL && (
              <Link
                href={profile.portfolioURL}
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
  );
};