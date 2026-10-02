"use client";
import React, { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorApprovalTable from "./mentor-approval-table";
import MentorApprovalTableSkeleton from "./mentor-approval-table-sketon";
import { MentorParams, MentorVerificationStatus } from "@/types/mentor.type";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";
import TablePagination from "@/components/ui/table-pagination";

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

  const queryParams: MentorParams = {
    page: 1,
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
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Tabs
          value={tab}
          onValueChange={(value) =>
            setTab(value as MentorVerificationStatus | "ALL")
          }
        >
          <TabsList>
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<MentorApprovalTableSkeleton />}>
        <MentorApprovalTable {...queryParams} />
      </Suspense>

     <div className="mt-6">
         <TablePagination></TablePagination>
     </div>
    </div>
  );
};

export default MentorApprovalTabs;
