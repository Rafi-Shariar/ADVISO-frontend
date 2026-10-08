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
const UserSesionTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sesion Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Meeting Link</TableHead>
            <TableHead>Mentor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserSesionTableSkeleton;
