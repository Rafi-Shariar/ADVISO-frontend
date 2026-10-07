"use client";
import { useSuspenseGetAllMentorsAdmin } from "@/hooks/mentor.hook";
import { log } from "console";
import React, { Dispatch, SetStateAction } from "react";
import {
  CircleX,
  Divide,
  FileUser,
  MoreHorizontalIcon,
  PenOff,
  ShieldAlert,
  User,
  UserRoundX,
} from "lucide-react";
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
ShieldAlert;
import TablePagination from "@/components/ui/table-pagination";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";

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
            <TableHead>Mentorship Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mentors.length === 0 && <EmptyTableUI />}
          {mentors.map((mentor: IMentorProfile) => (
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
              <TableCell>
                {mentor.mentorshipStatus === "OPEN" ? (
                  <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 text-xs">
                    Open
                  </Badge>
                ) : (
                  <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs">
                    Blocked
                  </Badge>
                )}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    {mentor.verificationStatus === "APPROVED" ? (
                      <>
                        <DropdownMenuItem>
                          <User /> Mentor Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {" "}
                          <PenOff />
                          {mentor.mentorshipStatus === "OPEN"
                            ? "Block "
                            : "Open "}{" "}
                          Mentorship Status
                        </DropdownMenuItem>
                      </>
                    ) : mentor.verificationStatus === "PENDING" ? (
                      <DropdownMenuItem>
                        <FileUser />
                       <Link href={`/admin/review/${mentor.mentorId}`}> Review Application</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        {" "}
                        <UserRoundX />
                        <Link href={`/admin/review/${mentor.mentorId}`}>Rejected Profile</Link>
                      </DropdownMenuItem>
                    )}
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
