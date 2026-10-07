import { Sparkles, CheckCircle2 } from "lucide-react";

interface OverviewTabProps {
  bio: string;
  expertiseTags: string[];
}

export const OverviewTab = ({ bio, expertiseTags }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Sparkles className="size-4 text-orange-500" /> Mentorship Statement &
          Bio
        </h2>
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          {bio}
        </div>
      </div>

      {expertiseTags?.length > 0 && (
        <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-foreground">
            Core Competencies & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {expertiseTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20 flex items-center gap-1.5"
              >
                <CheckCircle2 className="size-3 text-orange-500" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
