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
const AdminReviewTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mentor Name</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Session Date</TableHead>
            <TableHead>Ratings</TableHead>
            <TableHead>Feedback</TableHead>
            
            <TableHead>Reviewed</TableHead>
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

export default AdminReviewTableSkeleton;
