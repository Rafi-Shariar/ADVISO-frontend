"use client";
import { useGetAllMentorsAdmin } from "@/hooks/mentor.hook";
import { log } from "console";
import React from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMentorProfile } from "@/types/mentor.type";

const MentorApprovalTable = () => {
  const { data, isPending } = useGetAllMentorsAdmin();

  const mentors: IMentorProfile[] = data?.data || [];

  if (isPending) {
    return <h1>Loading mentors....</h1>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Professional Domain</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Charge</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Rattings</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors.map((mentor) => (
            <TableRow key={mentor.mentorId}>
              <TableCell className="font-medium">{mentor.user.name}</TableCell>
              <TableCell>{mentor.user.email}</TableCell>
              <TableCell>{mentor.professionalDomain}</TableCell>
              <TableCell>{mentor.yearOfExperience}</TableCell>
              <TableCell>${mentor.sessionCharge}</TableCell>
              <TableCell>{mentor.totalSessionsCompleted}</TableCell>
              <TableCell>{mentor.averageRatings}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Show Details</DropdownMenuItem>
                    <DropdownMenuItem>Mentorship Status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MentorApprovalTable;
