"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
const PaymentTableSkeletonAdmin = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#ID</TableHead>
            <TableHead>Mentor</TableHead>
            <TableHead>Session Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Fees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Platform Charge</TableHead>
            <TableHead>Mentor Earning</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((mentor) => (
            <TableRow key={mentor}>
              <TableCell>
                <Skeleton className="h-6 w-20"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-10"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-10"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-10"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-10"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-10"></Skeleton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTableSkeletonAdmin;
