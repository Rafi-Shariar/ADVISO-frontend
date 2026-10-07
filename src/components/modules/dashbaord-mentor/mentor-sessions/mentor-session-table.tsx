"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSessionsMentor } from "@/hooks/session.hook";
import { MentorSessions } from "@/types/session.type";
import {
  formatScheduleDate,
  formatSlotTime,
} from "@/utils/date-time-converter";
import { MentorSessionDetailsSheet } from "./mentor-session-details-sheet";
import { CircleArrowRight, ExternalLink, Video } from "lucide-react";

const MentorSessionsTable = () => {
  const { data, isPending } = useSessionsMentor();
  const sessions: MentorSessions[] = data?.data || [];

  // Sheet ওপেন রাখা ও সিলেক্টেড সেশনের স্টেট
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenDetails = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsSheetOpen(true);
  };

  if (isPending) {
    return (
      <div className="min-h-[250px] flex items-center justify-center">
        <p className="text-xs text-muted-foreground animate-pulse">
          Loading sessions...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className=" overflow-hidden bg-card shadow-2xs mt-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-bold text-xs uppercase">
                #Session
              </TableHead>
              <TableHead className="font-bold text-xs uppercase">
                Date
              </TableHead>
              <TableHead className="font-bold text-xs uppercase">
                Start Time
              </TableHead>
              <TableHead className="font-bold text-xs uppercase">
                End Time
              </TableHead>
              <TableHead className="font-bold text-xs uppercase">
                User
              </TableHead>
              <TableHead className="font-bold text-xs uppercase">
                Meeting
              </TableHead>
              <TableHead className="font-bold text-xs uppercase text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sessions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-28 text-center text-xs text-muted-foreground"
                >
                  No sessions booked yet.
                </TableCell>
              </TableRow>
            ) : (
              sessions.map((session) => (
                <TableRow key={session.sessionId} className="hover:bg-muted/20">
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    #{session.sessionId.slice(0, 7)}
                  </TableCell>

                  <TableCell className="text-xs font-medium text-foreground">
                    {formatScheduleDate(session.slot.schedule.date)}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {formatSlotTime(session.slot.startTime)}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {formatSlotTime(session.slot.endTime)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="relative size-6 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                        {session.user.profileURL ? (
                          <Image
                            src={session.user.profileURL}
                            alt={session.user.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center font-bold text-[10px] text-orange-600 bg-orange-50">
                            {session.user.name.slice(0, 1)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {session.user.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Join Link */}
                  <TableCell>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-lg text-xs gap-1.5 border-border/80 hover:bg-orange-500/10 hover:text-orange-600 transition-colors"
                    >
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Video className="size-3.5 text-orange-500" />
                        Join
                        <ExternalLink className="size-3 text-muted-foreground" />
                      </a>
                    </Button>
                  </TableCell>

                  {/* Details Sheet Trigger */}
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs font-semibold hover:bg-muted"
                      onClick={() => handleOpenDetails(session.sessionId)}
                    >
                      Details <CircleArrowRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Drawer / Sheet */}
      <MentorSessionDetailsSheet
        sessionId={selectedSessionId}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
};

export default MentorSessionsTable;
