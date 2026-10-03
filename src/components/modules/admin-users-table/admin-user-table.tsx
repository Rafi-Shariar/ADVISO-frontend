"use client";
import { useSuspenseGetAllMentorsAdmin } from "@/hooks/mentor.hook";
import { log } from "console";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Divide, MoreHorizontalIcon, ShieldAlert } from "lucide-react";
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
import { MentorParams } from "@/types/mentor.type";
ShieldAlert;
import TablePagination from "@/components/ui/table-pagination";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import EmptyTableUI from "@/components/layout/private/empty-table-ui";
import { useSuspenseGetAllUsersAdmin } from "@/hooks/user.hook";
import { UserProfileAdmin } from "@/types/user.type";
import { AdminUserAccountStatusModal } from "./account-status-modal";

interface Props extends MentorParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const AdminUsersTable = ({ handlePageChange, ...params }: Props) => {
  const [selectedUser, setSelectedUser] = useState<UserProfileAdmin | null>(
    null,
  );
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const handleOpenModal = (user: UserProfileAdmin) => {
    setSelectedUser(user);
    setOpenStatusModal(true);
  };

  const { data } = useSuspenseGetAllUsersAdmin(params);

  const users: UserProfileAdmin[] = data?.data?.data || [];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Timezone</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Role</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {users.length === 0 && <EmptyTableUI />}
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell className="font-medium flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.profileURL} alt={user.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Link href={`/admin/${user.userId}`}>
                  <span className="hover:underline">{user.name}</span>
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.timezone}</TableCell>
              <TableCell>{user.accountStatus}</TableCell>

              <TableCell>{user.role}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>User Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOpenModal(user)}>
                      Account Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <AdminUserAccountStatusModal
          open={openStatusModal}
          onOpenChange={setOpenStatusModal}
          user={selectedUser}
        />
      )}

      <div className="my-5">
        <TablePagination
          totalPages={data?.data?.meta?.totalPages ?? 0}
          handlePageChange={handlePageChange}
          page={params.page ?? 0}
        />
      </div>
    </div>
  );
};

export default AdminUsersTable;
