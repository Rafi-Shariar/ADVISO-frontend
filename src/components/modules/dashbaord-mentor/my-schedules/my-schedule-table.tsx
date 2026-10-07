import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteSchedule,
  useSuspenseGetAllSchedules,
  useSuspenseGetMentorSchedules,
} from "@/hooks/schedule.hook";
import { ScheduleParams, Schedules } from "@/types/schedule.type";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  formatScheduleDate,
  formatSlotTime,
} from "@/utils/date-time-converter";
import { ArrowUpRight, Delete, Loader2, Trash, X } from "lucide-react";
import { AdminScheduleSheet } from "../../admin-schedules/admin-session-sheet";
import { MyScheduleSlotSheet } from "./my-schedule-slots-sheet";
import { canDeleteSchedule } from "@/utils/delete-schedule.helpter";
import { toast } from "sonner";

const MyScheduleTable = (params: ScheduleParams) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedules | null>(
    null,
  );
  const [deletingScheduleId, setDeletingScheduleId] = useState<string | null>(
    null,
  );

  const { data } = useSuspenseGetMentorSchedules(params);
  const schedules: Schedules[] = data?.data || [];

  const { mutate: deleteSchedule, isPending } = useDeleteSchedule();

  const handleDeleteSchedule = (scheduleId: string) => {
    setDeletingScheduleId(scheduleId);

    deleteSchedule(
      { scheduleId },
      {
        onSuccess: (_res) => {
          toast.success("Schedule Deleted", {
            description: "This schedule has been deleted.",
            position: "top-right",
          });
        },

        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Delete Failed", {
            description: errorDescription,
            position: "top-right",
          });
        },

        onSettled: () => {
          setDeletingScheduleId(null);
        },
      },
    );
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Schedule Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>

            <TableHead>Created</TableHead>
            <TableHead>Total Slots</TableHead>

            <TableHead>Slots</TableHead>
            <TableHead>Delete Schedule</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {schedules.length === 0 && <EmptyTableUI />}
          {schedules.map((schedule) => (
            <TableRow key={schedule.scheduleId}>
              <TableCell>{formatScheduleDate(schedule.date)}</TableCell>
              <TableCell>{formatSlotTime(schedule.startTime)}</TableCell>
              <TableCell> {formatSlotTime(schedule.endTime)}</TableCell>

              <TableCell>{formatScheduleDate(schedule.createdAt)}</TableCell>
              <TableCell>{schedule.slots.length}</TableCell>

              <TableCell>
                <Button
                  className=""
                  variant={"ghost"}
                  size={"lg"}
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  Slots <ArrowUpRight />
                </Button>
              </TableCell>

              <TableCell>
                {canDeleteSchedule(schedule.slots) ? (
                  <Button disabled variant="ghost" size="icon">
                    <Trash className="size-4 text-muted-foreground" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={
                      isPending && deletingScheduleId === schedule.scheduleId
                    }
                    className="hover:bg-orange-500/10 text-orange-500 disabled:opacity-50"
                    onClick={() => handleDeleteSchedule(schedule.scheduleId)}
                  >
                    {isPending && deletingScheduleId === schedule.scheduleId ? (
                      <Loader2 className="size-4 animate-spin text-orange-500" />
                    ) : (
                      <Trash className="size-4 text-orange-500" />
                    )}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MyScheduleSlotSheet
        data={selectedSchedule}
        isOpen={!!selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />
    </div>
  );
};

export default MyScheduleTable;
