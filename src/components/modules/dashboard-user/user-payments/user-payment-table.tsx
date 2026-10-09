"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  formatPaidDate,
  formatScheduleDate,
  formatSlotTime,
} from "@/utils/date-time-converter";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetAllPaymentUser } from "@/hooks/payment.hook";
import { IUserPayment } from "@/types/payment.type";
import UserPayemntTableSkeleton from "./user-table-skeleton";

const UserPaymentTable = () => {
  const { data, isPending } = useGetAllPaymentUser();

  const payments: IUserPayment[] = data?.data || [];

  if (isPending) {
    return <UserPayemntTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className=" overflow-hidden bg-card shadow-2xs mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#Payment ID</TableHead>
              <TableHead>Mentor</TableHead>
              <TableHead>Session Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell>#{payment.paymentId.slice(0, 7)}</TableCell>

                <TableCell className="font-medium flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={payment.session.mentor.user.profileURL}
                      alt={payment.session.mentor.user.name}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {payment.session.mentor.user.name}
                </TableCell>

                <TableCell>
                  {formatScheduleDate(payment.session.sessionDate)}
                </TableCell>

                <TableCell>
                  {formatSlotTime(payment.session.startUTC)} -{" "}
                  {formatSlotTime(payment.session.endUTC)}
                </TableCell>

                <TableCell>{payment.status}</TableCell>

                <TableCell>
                  {payment.status === "PAID"
                    ? `${formatPaidDate(payment.paidAt)}`
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPaymentTable;
