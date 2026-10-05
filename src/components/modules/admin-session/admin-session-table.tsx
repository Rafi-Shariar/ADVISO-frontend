"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSessionsAdmin } from "@/hooks/session.hook";
import { ISessionAdmin } from "@/types/session.type";
import { formatScheduleDate, formatSlotTime } from "@/utils/date-time-converter";
import AdminSessionsTableSkeleton from "./admin-session-table-skeleton";

const AdminSessionTable = () => {
  const { data, isPending, isError } = useSessionsAdmin();

  const sessions: ISessionAdmin[] = data?.data || [];

  if (isPending) {
    return <AdminSessionsTableSkeleton/>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Mentor Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Charge</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.sessionId}>
              
              <TableCell>{session.userName}</TableCell>
              <TableCell>{session.userEmail}</TableCell>
              <TableCell>{session.mentorEmail}</TableCell>
              <TableCell>{formatScheduleDate(session.date)}</TableCell>
              <TableCell>{formatSlotTime(session.startTime)} - {formatSlotTime(session.endTime)}</TableCell>
              <TableCell>$ {session.fees}</TableCell>
              <TableCell>{session.status}</TableCell>
              <TableCell>
                <Button variant={"outline"}>Show Details</Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminSessionTable;
