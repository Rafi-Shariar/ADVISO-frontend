"use client";
import { useSuspenseGetAllMentorsAdmin } from "@/hooks/mentor.hook";
import { log } from "console";
import React, { Dispatch, SetStateAction } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IMentorProfile,
  MentorParams,
  MentorVerificationStatus,
} from "@/types/mentor.type";
import TablePagination from "@/components/ui/table-pagination";
import Link from "next/link";

interface Props extends MentorParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const MentorApprovalTable = ({ handlePageChange, ...params }: Props) => {
  const { data } = useSuspenseGetAllMentorsAdmin(params);

  const mentors: IMentorProfile[] = data?.data || [];

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
              <TableCell className="font-medium flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={mentor.user.profileURL}
                    alt={mentor.user.name}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Link href={`/admin/${mentor.mentorId}`}>
                  <span className="hover:underline">{mentor.user.name}</span>
                </Link>
              </TableCell>
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
                    <DropdownMenuItem>Mentor Profile</DropdownMenuItem>
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

      <div className="my-5">
        <TablePagination
          totalPages={data?.meta?.totalPages ?? 0}
          handlePageChange={handlePageChange}
          page={params.page ?? 0}
        />
      </div>
    </div>
  );
};

export default MentorApprovalTable;
