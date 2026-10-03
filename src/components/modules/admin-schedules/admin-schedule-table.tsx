import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllSchedules } from "@/hooks/schedule.hook";
import { Schedules } from "@/types/schedule.type";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatScheduleDate, formatSlotTime } from "@/utils/date-time-converter";
import { ArrowUpRight, X } from "lucide-react";

const AdminScheduleTable = (...params : any) => {

    const { data } = useSuspenseGetAllSchedules(params);

    const schedules : Schedules[] = data?.data || [];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Schedule Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Schedule Created</TableHead>

            <TableHead ></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {schedules.length === 0 && <EmptyTableUI />}
          {schedules.map((schedule) => (
            <TableRow key={schedule.scheduleId}>
              <TableCell className="font-medium flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={schedule.mentor.user.profileURL} alt={schedule.mentor.user.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Link href={`/admin/${schedule.mentorId}`}>
                  <span className="hover:underline">{schedule.mentor.user.name}</span>
                </Link>
                
              </TableCell>
              <TableCell>{schedule.mentor.user.email}</TableCell>
              <TableCell>{formatScheduleDate(schedule.date)}</TableCell>
              <TableCell>{formatSlotTime(schedule.startTime) } - { formatSlotTime(schedule.endTime)}</TableCell>

              <TableCell>{formatScheduleDate(schedule.createdAt)}</TableCell>

              <TableCell className="text-right">
                <Button className="" variant={"outline"} size={"lg"}>Sessions <ArrowUpRight/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminScheduleTable;
