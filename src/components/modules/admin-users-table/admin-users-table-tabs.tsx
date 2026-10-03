"use client";
import React, { Suspense, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MentorParams, MentorVerificationStatus } from "@/types/mentor.type";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROFESSION_DOMAINS } from "@/constants/professionDomain.constant";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MentorApprovalTableSkeleton from "../mentor-approval/mentor-approval-table-sketon";
import MentorApprovalTable from "../mentor-approval/mentor-approval-table";
import AdminUsersTable from "./admin-user-table";
import AdminUsersTableSkeleton from "./admin-users-table-skeleton";
import { UserAccountRole, UserAccountStatus, UserParams } from "@/types/user.type";

const verificationStatus: ["ALL" | UserAccountRole, string][] = [
  ["ALL", "All"],
  ["USER", "Users"],
  ["MENTOR", "Mentors"],
  ["ADMIN", "Admins"],
  ["SUPER_ADMIN", "Super Admin"],
];
const UsersTableTabs = () => {
  const [tab, setTab] = useState<"ALL" | UserAccountRole>("ALL");

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState("");

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleTabSwitch = (value: string) => {
    setTab(value as UserAccountRole | "ALL");
    setPage(1);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
    console.log(value);
    
    setPage(1);
  };

  const handleClearDomain = () => {
    setFilter("");
    setPage(1);
  };



  const queryParams: UserParams = {
    page: page,
    limit: 10,
    ...(tab === "ALL" ? {} : { "role": tab }),
    ...(filter === "" ? {} : {"accountStatus" : filter as UserAccountStatus}),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),

  };

  return (
    <div className="w-full">
      {/* Main Controls Header */}
      <div className="my-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search, Filter, and Sort Controls */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search Input */}
          <div className="w-full sm:w-64 md:w-72">
            <Input
              type="search"
              placeholder="Search by name or email..."
              className="w-full"
              onChange={(e) => handleSearch(e)}
            />
          </div>

          {/* Domain Select + Clear Button */}
          <div className="flex w-full items-center gap-2 sm:w-auto sm:min-w-[220px]">
            <Select
              value={filter || ""}
              onValueChange={(val) => handleFilter(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Account Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Account Status</SelectLabel>
                  
                  <SelectItem  value={"ACTIVE"}>
                        Active
                  </SelectItem>
                  <SelectItem  value={"BLOCKED"}>
                        Blocked
                  </SelectItem>
                  <SelectItem  value={"SUSPENDED"}>
                        Suspended
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {filter && (
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={handleClearDomain}
                title="Clear filter"
                aria-label="Clear filter"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

         
        </div>

        {/* Tabs with Horizontal Scroll for Mobile */}
        <div className="w-full overflow-x-auto pb-1 lg:w-auto lg:pb-0">
          <Tabs value={tab} onValueChange={(value) => handleTabSwitch(value)}>
            <TabsList className="flex w-max lg:w-auto">
              {verificationStatus.map(([value, label]) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="whitespace-nowrap"
                >
                  <span
                    className={
                      tab === value ? "font-bold text-orange-500" : undefined
                    }
                  >
                    {label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Table / Skeleton View */}
      <Suspense fallback={<AdminUsersTableSkeleton />}>
        <AdminUsersTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </div>
  );
};

export default UsersTableTabs;
