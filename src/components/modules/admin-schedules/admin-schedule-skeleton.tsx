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
const AdminScheduleTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mentor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Schedule Time</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Schedule Created</TableHead>
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
                <Skeleton className="h-6 w-20"></Skeleton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminScheduleTableSkeleton;
