"use client";
import React, { Suspense, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorApprovalTable from "./mentor-approval-table";
import MentorApprovalTableSkeleton from "./mentor-approval-table-sketon";
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

const verificationStatus: ["ALL" | MentorVerificationStatus, string][] = [
  ["ALL", "All"],
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
];
const MentorApprovalTabs = () => {
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

    setSortBy(sortOn)
    setSortOrder(sortingOrder)    
    
  }

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
    <div>
      <div className="flex flex-col gap-3 md:flex-row justify-between my-6">
        <div className="flex gap-3 items-center">
          <Input
            type="search"
            placeholder="Search by name or email..."
            className=" md:min-w-70"
            onChange={(e) => handleSearch(e)}
          />

          <div className=" flex items-center gap-2">
            <Select
              value={domain || ""}
              onValueChange={(val) => handleDomainFilter(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Professional Domain" />
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
                onClick={handleClearDomain}
                title="Clear filter"
                aria-label="Clear filter"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div>
            <Select onValueChange={(val) => handleFilter(val)}>
              <SelectTrigger className="w-full min-w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="yearOfExperience-asc">Experience - ASC</SelectItem>
                  <SelectItem value="yearOfExperience-desc">Experience - DESC</SelectItem>
                  <SelectItem value="sessionCharge-asc">Session Charge - ASC</SelectItem>
                  <SelectItem value="sessionCharge-desc">Session Charge - DESC</SelectItem>
                  <SelectItem value="averageRatings-asc">Ratting - ASC</SelectItem>
                  <SelectItem value="averageRatings-desc">Ratting - DESC</SelectItem>
                  <SelectItem value="totalSessionsCompleted-asc">Sessions - ASC</SelectItem>
                  <SelectItem value="totalSessionsCompleted-desc">Sessions - DESC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(value) => handleTabSwitch(value)}>
          <TabsList className="">
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                <span
                  className={
                    tab === value ? "text-orange-500 font-bold" : undefined
                  }
                >
                  {label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<MentorApprovalTableSkeleton />}>
        <MentorApprovalTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </div>
  );
};

export default MentorApprovalTabs;
