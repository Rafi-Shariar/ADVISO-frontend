"use client";
import React, { Suspense, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorApprovalTable from "./mentor-approval-table";
import MentorApprovalTableSkeleton from "./mentor-approval-table-sketon";
import { MentorParams, MentorVerificationStatus } from "@/types/mentor.type";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";


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

   const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
   }

   const handleTabSwitch = (value : string) => {
    setTab(value as MentorVerificationStatus | "ALL")
    setPage(1);
   }



  const queryParams: MentorParams = {
    page: page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row justify-between my-6">
        <div>
          <Input
            type="search"
            placeholder="Search by name or email..."
            className=" md:min-w-lg"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <Tabs
          value={tab}
          onValueChange={(value) => handleTabSwitch(value)
          }
        >
          <TabsList className="">
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                <span className={tab === value ? "text-orange-500 font-bold" : undefined}>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<MentorApprovalTableSkeleton />}>
        <MentorApprovalTable {...queryParams}  handlePageChange={setPage}/>
      </Suspense>

    
    </div>
  );
};

export default MentorApprovalTabs;
