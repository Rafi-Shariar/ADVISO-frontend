"use client";

import { log } from "console";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IMentorProfile,
  MentorParams,
  MentorVerificationStatus,
} from "@/types/mentor.type";
ShieldAlert;
import TablePagination from "@/components/ui/table-pagination";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";
import { useSuspenseGetAllPaymentsAdmin } from "@/hooks/payment.hook";
import { IPayment } from "@/types/payment.type";
import { formatScheduleDate } from "@/utils/date-time-converter";
import { AdminPaymentDetailsSheet } from "./admin-payment-details-sheet";

interface Props extends MentorParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const PaymentsTableAdmin = ({ handlePageChange, ...params }: Props) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const { data } = useSuspenseGetAllPaymentsAdmin(params);

  const payments: IPayment[] = data?.data?.data || [];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#ID</TableHead>
            <TableHead>Mentor</TableHead>
            <TableHead>Session Date</TableHead>
            <TableHead>Fees</TableHead>
            <TableHead>$Platform</TableHead>
            <TableHead>$Mentor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.length === 0 && <EmptyTableUI />}
          {payments.map((payment: IPayment) => (
            <TableRow key={payment.paymentId}>
              <TableCell>#{payment.paymentId.slice(0, 8)}</TableCell>
              <TableCell>{payment.session.mentor.user.name}</TableCell>
              <TableCell>
                {formatScheduleDate(payment.session.sessionDate)}
              </TableCell>
              <TableCell>$ {payment.amount}</TableCell>
              <TableCell>
                {payment.status === "FAILED" || payment.status === "PENDING"
                  ? "-"
                  : `$ ${payment.platformCharge}`}
              </TableCell>
              <TableCell>
                {payment.status === "FAILED" || payment.status === "PENDING"
                  ? "-"
                  : `$ ${payment.mentorEarnings}`}
              </TableCell>
              <TableCell>{payment.status}</TableCell>

              <TableCell>
                <Button
                  variant={"link"}
                  onClick={() => setSelectedPayment(payment.paymentId)}
                >
                  details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-5">
        <TablePagination
          totalPages={data?.data?.meta?.totalPages ?? 0}
          handlePageChange={handlePageChange}
          page={params.page ?? 0}
        />
      </div>

      <AdminPaymentDetailsSheet
        paymentId={selectedPayment}
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
};

export default PaymentsTableAdmin;
