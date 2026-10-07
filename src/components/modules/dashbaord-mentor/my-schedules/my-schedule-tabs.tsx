"use client";

import React, { Suspense, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScheduleParams } from "@/types/schedule.type";


import MyScheduleTable from "./my-schedule-table";
import AdminScheduleTableSkeleton from "../../admin-schedules/admin-schedule-skeleton";

const MySchedulesTab = () => {
  const [date, setDate] = useState<Date>();

  const queryParams: ScheduleParams = {
    ...(date ? { date: format(date, "yyyy-MM-dd") } : {}),
  };

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-end my-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="w-[230px] justify-between text-left font-normal rounded-xl border-border/70 bg-card hover:bg-muted/50 data-[empty=true]:text-muted-foreground shadow-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <CalendarIcon className="size-4 text-orange-500 shrink-0" />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </div>

              {date && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleClearDate}
                  onKeyDown={(e) => e.key === "Enter" && handleClearDate(e as any)}
                  className="rounded-full p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-3.5" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Suspense fallback={<AdminScheduleTableSkeleton />}>
        <MyScheduleTable {...queryParams} />
      </Suspense>
    </div>
  );
};

export default MySchedulesTab;