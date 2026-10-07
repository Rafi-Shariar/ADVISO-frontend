import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllSchedules, useSuspenseGetMentorSchedules } from "@/hooks/schedule.hook";
import { ScheduleParams, Schedules } from "@/types/schedule.type";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  formatScheduleDate,
  formatSlotTime,
} from "@/utils/date-time-converter";
import { ArrowUpRight, X } from "lucide-react";
import { AdminScheduleSheet } from "../../admin-schedules/admin-session-sheet";
import { MyScheduleSlotSheet } from "./my-schedule-slots-sheet";


const MyScheduleTable = (params: ScheduleParams) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedules | null>(
    null,
  );

  const { data } = useSuspenseGetMentorSchedules(params);
  const schedules: Schedules[] = data?.data || [];

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
              <TableCell>
                {schedule.slots.length}
              </TableCell>


              <TableCell>
                <Button
                  className=""
                  variant={"outline"}
                  size={"lg"}
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  Slots <ArrowUpRight />
                </Button>
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
