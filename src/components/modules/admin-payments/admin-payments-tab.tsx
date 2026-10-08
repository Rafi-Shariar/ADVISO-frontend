"use client";
import React, { Suspense, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import { PaymentParams, PaymentStatus } from "@/types/payment.type";
import PaymentTableSkeletonAdmin from "./admin-payments-table-skeleton";
import PaymentsTableAdmin from "./admin-payments-table";

const paymentStatus: ["ALL" | PaymentStatus, string][] = [
  ["ALL", "All"],
  ["PAID", "Paid"],
  ["PENDING", "Pending"],
  ["FAILED", "Failed"],
  ["REFUNDED", "Refunded"],
];
const AdminPaymentTabs = () => {
  const [tab, setTab] = useState<"ALL" | PaymentStatus>("ALL");

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const [page, setPage] = useState(1);


  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleTabSwitch = (value: string) => {
    setTab(value as PaymentStatus | "ALL");
    setPage(1);
  };



  const queryParams: PaymentParams = {
    page: page,
    limit: 10,    
    ...(tab === "ALL" ? {} : { status: tab }),
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
              placeholder="Search by email..."
              className="w-full"
              onChange={(e) => handleSearch(e)}
            />
          </div>


        </div>

        {/* Tabs with Horizontal Scroll for Mobile */}
        <div className="w-full overflow-x-auto pb-1 lg:w-auto lg:pb-0">
          <Tabs value={tab} onValueChange={(value) => handleTabSwitch(value)}>
            <TabsList className="flex w-max lg:w-auto">
              {paymentStatus.map(([value, label]) => (
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
      <Suspense fallback={<PaymentTableSkeletonAdmin />}>
        <PaymentsTableAdmin {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </div>
  );
};

export default AdminPaymentTabs;
