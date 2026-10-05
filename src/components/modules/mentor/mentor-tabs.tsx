"use client";
import React, { Suspense, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MentorParams, MentorVerificationStatus } from "@/types/mentor.type";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";
import {
  ArrowDownWideNarrow,
  Briefcase,
  DollarSign,
  Check,
} from "lucide-react";
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
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MentorCardContainer from "./mentor-card-container";
import MentorApprovalTableSkeleton from "../mentor-approval/mentor-approval-table-sketon";
import { Separator } from "radix-ui";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import MentorPageSkeleton from "./mentor-page-skeleton";

const MentorTabs = () => {
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
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(sortBy ? { sortBy: sortBy } : {}),
    ...(sortOrder ? { sortOrder: sortOrder } : {}),
  };

  return (
    <div className="w-full">
      {/* Main Controls Header */}
      <div className="my-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search, Filter, and Sort Controls */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center justify-between">
          {/* Search Input */}
          <div className="flex gap-6">
            <div className="w-full sm:w-64 md:w-92">
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
          </div>

          {/* Sort Select */}
          <div className="w-full sm:w-54">
            <Select onValueChange={(val) => handleFilter(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Experience</SelectLabel>
                  <SelectItem value="yearOfExperience-asc">
                    <Briefcase className="size-3.5 " />{" "}
                    <span>Most to Least</span>
                  </SelectItem>
                  <SelectItem value="yearOfExperience-desc">
                    <Briefcase className="size-3.5 text-muted-foreground" />
                    <span>Least to Most</span>
                  </SelectItem>
                  <DropdownMenuSeparator className="my-1.5" />
                   <SelectLabel>Session Charge</SelectLabel>
                  <SelectItem value="sessionCharge-asc">
                    <DollarSign className="size-3.5 " />
                    <span>Low to High</span>
                  </SelectItem>
                  <SelectItem value="sessionCharge-desc">
                    <DollarSign className="size-3.5 text-muted-foreground" />
                    <span>High to Low</span>
                  </SelectItem>
                   <DropdownMenuSeparator className="my-1.5" />
                  <SelectLabel>Ratings</SelectLabel>
                  <SelectItem value="averageRatings-desc">
                    <Star className="size-3.5 " />
                    <span>Top Rated First </span>
                  </SelectItem>
                   <SelectItem value="averageRatings-asc">
                    <Star className="size-3.5" />
                    <span>Moderate Rated First</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table / Skeleton View */}
      <Suspense fallback={<MentorPageSkeleton />}>
        <MentorCardContainer {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </div>
  );
};

export default MentorTabs;
