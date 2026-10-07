import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

interface BookingCardProps {
  sessionCharge: string;
  linkedinURL?: string | null;
  portfolioURL?: string | null;
}

export const MentorBookingCard = ({
  sessionCharge,
  linkedinURL,
  portfolioURL,
}: BookingCardProps) => {
  return (
    <div className="space-y-4">
      {/* Booking Action Box */}
      <div className="rounded-3xl border border-border/80 bg-gradient-to-b from-card to-card/60 p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Investment
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-foreground">${sessionCharge}</span>
            <span className="text-xs text-muted-foreground">/ 1:1 mentorship call</span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <Zap className="size-3.5 text-orange-500" />
            <span>Instant booking confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            <span>100% Satisfaction or reschedule protection</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 text-sm active:scale-[0.98] transition-all"
        >
          Book a 1:1 Session
        </Button>
      </div>

      {/* External Verified Profiles */}
      {(linkedinURL || portfolioURL) && (
        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-2xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Verified Links
          </span>
          <div className="space-y-2">
            {linkedinURL && (
              <Link
                href={linkedinURL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/60 hover:border-blue-500/40 transition-all text-xs font-medium text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <FaLinkedinIn className="size-4 text-[#0077B5]" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}

            {portfolioURL && (
              <Link
                href={portfolioURL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/60 hover:border-emerald-500/40 transition-all text-xs font-medium text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="size-4 text-emerald-500" />
                  <span>Personal Portfolio</span>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};