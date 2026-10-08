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
import {
  usePaySchedule,
  useSessionsMentor,
  useSessionsUser,
} from "@/hooks/session.hook";
import { ISessionDetailsAdmin, MentorSessions } from "@/types/session.type";
import {
  formatScheduleDate,
  formatSlotTime,
} from "@/utils/date-time-converter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleArrowRight,
  ExternalLink,
  MoreHorizontalIcon,
  Video,
} from "lucide-react";
import UserSesionTableSkeleton from "./user-session-table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSessionDetailsSheet } from "./user-session-details-sheet";
import { toast } from "sonner";
import { CancelSessionModal } from "./user-cancle-session-modal";

const UserSessionsTable = () => {
  const { data, isPending } = useSessionsUser();
  const { mutate: PayAgain } = usePaySchedule();
  const sessions: ISessionDetailsAdmin[] = data?.data || [];

  // Sheet ওপেন রাখা ও সিলেক্টেড সেশনের স্টেট
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  const [cancelModalSession, setCancelModalSession] =
    useState<ISessionDetailsAdmin | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenDetails = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsSheetOpen(true);
  };

  const handlePayAgain = (sessionId: string) => {
    PayAgain(
      { sessionId },
      {
        onSuccess: (res: any) => {
          console.log("Pay Again Response:", res);

          // API রেসপন্স থেকে পেমেন্ট URL বের করা
          const paymentUrl =
            res?.data?.paymentURL ||
            res?.data?.bkashURL ||
            res?.data?.paymentUrl ||
            res?.paymentURL ||
            res?.bkashURL;

          if (paymentUrl) {
            toast.info("Connecting to bKash gateway...", {
              position: "top-right",
            });
            // 🚀 bKash গেটওয়েতে রিডাইরেক্ট
            window.location.href = paymentUrl;
          } else {
            toast.error("Payment gateway URL not received. Please try again.", {
              position: "top-right",
            });
          }
        },
        onError: (err: any) => {
          console.error("Pay Again Error:", err);
          const errorMsg =
            err?.response?.data?.message ||
            err?.data?.message ||
            err?.message ||
            "Failed to initialize payment.";

          toast.error("Payment Failed", {
            description: errorMsg,
            position: "top-right",
          });
        },
      },
    );
  };

  const handleOpenCancelModal = (session: any) => {
    setCancelModalSession(session);
    setIsCancelModalOpen(true);
  };

  if (isPending) {
    return <UserSesionTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className=" overflow-hidden bg-card shadow-2xs mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Sesion Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Meeting Link</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.sessionId}>
                <TableCell className="font-medium flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={session.mentor.user.profileURL}
                      alt={session.mentor.user.name}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {session.mentor.user.name}
                </TableCell>

                <TableCell>{formatScheduleDate(session.sessionDate)}</TableCell>

                <TableCell>
                  {formatSlotTime(session.startUTC)} -{" "}
                  {formatSlotTime(session.endUTC)}
                </TableCell>

                <TableCell>
                  {(() => {
                    switch (session.status) {
                      case "COMFIRMED":
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[12px] text-[10px] font-bold  tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="size-1 rounded-full bg-emerald-500" />
                            Confirmed
                          </span>
                        );
                      case "CANCELLED":
                        return (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] text-[10px] font-bold  tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            Cancelled
                          </span>
                        );
                      case "PENDING":
                      default:
                        return (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] text-[10px] font-bold  tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            Pending
                          </span>
                        );
                    }
                  })()}
                </TableCell>

                <TableCell>
                  {session.status === "CANCELLED" ||
                  session.status === "PENDING" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="h-8 rounded-[12px] text-xs gap-1.5 border-border/80 opacity-50 cursor-not-allowed"
                    >
                      <Video className="size-3.5 text-zinc-400" />
                      <span>Join</span>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-[12px] text-xs gap-1.5 border-border/80 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-600 transition-colors"
                    >
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Video className="size-3.5 text-orange-500" />
                        <span>Join</span>
                        <ExternalLink className="size-3 text-muted-foreground" />
                      </a>
                    </Button>
                  )}
                </TableCell>

                <TableCell>$ {session.sessionFees}</TableCell>

                <TableCell className="t">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleOpenDetails(session.sessionId)}
                      >
                        Session Details
                      </DropdownMenuItem>

                      {session.status === "COMFIRMED" ? (
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleOpenCancelModal(session)}
                        >
                          Cancle Session
                        </DropdownMenuItem>
                      ) : undefined}

                      {session.status === "PENDING" ? (
                        <DropdownMenuItem
                          onClick={() => handlePayAgain(session.sessionId)}
                        >
                          Pay & Confirm
                        </DropdownMenuItem>
                      ) : undefined}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserSessionDetailsSheet
        sessionId={selectedSessionId}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />

      <CancelSessionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        session={cancelModalSession}
      />
    </div>
  );
};

export default UserSessionsTable;
