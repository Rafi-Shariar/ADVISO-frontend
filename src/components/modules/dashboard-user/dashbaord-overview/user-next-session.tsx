import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, Compass, ArrowUpRight, Video } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatSlotTime } from "@/utils/date-time-converter";
import { IUserAnalytic } from "@/types/analytic.type";

interface UserNextSessionProps {
  nextSession: IUserAnalytic["nextSession"] | null;
}

export function UserNextSession({ nextSession }: UserNextSessionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Next Up Session Card */}
      <div className="lg:col-span-2 rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-2xs flex flex-col justify-between">
        <div className="space-y-1 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Upcoming Mentorship Call
            </h3>
            {nextSession && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
                Confirmed
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500">
            Real-time status of your closest upcoming 1-on-1 session.
          </p>
        </div>

        {nextSession ? (
          <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Mentor Avatar */}
              <div className="relative size-12 rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0">
                {nextSession.mentorProfileURL ? (
                  <Image
                    src={nextSession.mentorProfileURL}
                    alt={nextSession.mentorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center font-bold text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                    {nextSession.mentorName?.slice(0, 2).toUpperCase() || "ME"}
                  </div>
                )}
              </div>

              {/* Mentor Info & Session Schedule */}
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {nextSession.mentorName}
                </h4>
                {nextSession.mentorHeadline && (
                  <p className="text-[11px] text-zinc-400 line-clamp-1 max-w-[280px]">
                    {nextSession.mentorHeadline}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5 text-orange-500" />
                    {format(new Date(nextSession.date), "dd MMM, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5 text-zinc-400" />
                    {formatSlotTime(nextSession.startTime)} -{" "}
                    {formatSlotTime(nextSession.endTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Meeting Action */}
            <div className="shrink-0">
              {nextSession.meetingLink ? (
                <Button
                  asChild
                  size="sm"
                  className="rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-bold gap-2 h-9 px-4 shadow-xs"
                >
                  <a
                    href={nextSession.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Video className="size-3.5 text-orange-500" />
                    <span>Join Call</span>
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-[12px] border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                >
                  <Link href="/user/sessions">View Session</Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-10 text-center space-y-2">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              No sessions scheduled right now.
            </p>
            <p className="text-[11px] text-zinc-400 max-w-sm mx-auto">
              Find verified industry leaders to review your portfolio or roadmap
              your career trajectory.
            </p>
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-[12px] border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:text-orange-600 gap-1.5"
              >
                <Link href="/mentors">
                  <Compass className="size-3.5 text-orange-500" />
                  <span>Browse Mentors</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Trajectory Quick Hub */}
      <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-2xs flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            Trajectory Hub
          </h3>
          <p className="text-xs text-zinc-500">
            Quick links to manage your bookings and profile settings.
          </p>
        </div>

        <div className="space-y-2">
          <Link
            href="/mentors"
            className="group flex items-center justify-between p-3 rounded-[12px] bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 hover:border-orange-500/40 transition-colors"
          >
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600 transition-colors">
              Book a New Mentor
            </span>
            <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>

          <Link
            href="/user/profile-picture"
            className="group flex items-center justify-between p-3 rounded-[12px] bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 hover:border-orange-500/40 transition-colors"
          >
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600 transition-colors">
              Update Profile Photo
            </span>
            <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
