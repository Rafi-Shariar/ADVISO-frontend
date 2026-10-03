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

const verificationStatus: ["ALL" | MentorVerificationStatus, string][] = [
  ["ALL", "All"],
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
];
const UsersTableTabs = () => {
  const [tab, setTab] = useState<"ALL" | MentorVerificationStatus>("ALL");

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const [page, setPage] = useState(1);

  const [domain, setDomain] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleTabSwitch = (value: string) => {
    setTab(value as MentorVerificationStatus | "ALL");
    setPage(1);
  };

  const handleDomainFilter = (value: string) => {
    setDomain(value);
    setPage(1);
  };

  const handleClearDomain = () => {
    setDomain("");
    setPage(1);
  };

  const handleFilter = (value: string) => {
    const parts = value.split("-");
    const sortOn = parts[0];
    const sortingOrder = parts[1];

    setSortBy(sortOn);
    setSortOrder(sortingOrder);
  };

  const queryParams: MentorParams = {
    page: page,
    limit: 10,
    ...(domain === "" ? {} : { professionalDomain: domain }),
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(sortBy ? { sortBy: sortBy } : {}),
    ...(sortOrder ? { sortOrder: sortOrder } : {}),
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
              value={domain || ""}
              onValueChange={(val) => handleDomainFilter(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Your Domain</SelectLabel>
                  {Object.entries(PROFESSION_DOMAINS).map(
                    ([key, domainName]) => (
                      <SelectItem key={key} value={key}>
                        {domainName}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {domain && (
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

          {/* Sort Select */}
          <div className="w-full sm:w-44">
            <Select onValueChange={(val) => handleFilter(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="yearOfExperience-asc">
                    Experience - ASC
                  </SelectItem>
                  <SelectItem value="yearOfExperience-desc">
                    Experience - DESC
                  </SelectItem>
                  <SelectItem value="sessionCharge-asc">
                    Session Charge - ASC
                  </SelectItem>
                  <SelectItem value="sessionCharge-desc">
                    Session Charge - DESC
                  </SelectItem>
                  <SelectItem value="averageRatings-asc">
                    Rating - ASC
                  </SelectItem>
                  <SelectItem value="averageRatings-desc">
                    Rating - DESC
                  </SelectItem>
                  <SelectItem value="totalSessionsCompleted-asc">
                    Sessions - ASC
                  </SelectItem>
                  <SelectItem value="totalSessionsCompleted-desc">
                    Sessions - DESC
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
      <Suspense fallback={<MentorApprovalTableSkeleton />}>
        <AdminUsersTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </div>
  );
};

export default UsersTableTabs;
