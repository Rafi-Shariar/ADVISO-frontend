"use client";

import React, { Suspense, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
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
import { CreateScheduleModal } from "./create-schedule-modal";

const MySchedulesTab = () => {
  const [date, setDate] = useState<Date>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const queryParams: ScheduleParams = {
    ...(date ? { date: format(date, "yyyy-MM-dd") } : {}),
  };

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Action & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-6">
        {/* 1. Clean Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="h-10 px-3.5 justify-between text-left font-normal rounded-[12px] border-border/80 bg-card hover:bg-muted/40 data-[empty=true]:text-muted-foreground shadow-2xs transition-all"
            >
              <div className="flex items-center gap-2 truncate">
                <CalendarIcon className="size-4 text-orange-500 shrink-0" />
                <span className="text-xs sm:text-sm">
                  {date ? format(date, "PPP") : "Filter by date"}
                </span>
              </div>

              {date && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleClearDate}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleClearDate(e as any)
                  }
                  className="ml-2 rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-3.5" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 rounded-2xl shadow-xl"
            align="end"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>

        {/* 2. Create Schedule Action Button */}
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="h-10 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>Create Schedule</span>
        </Button>
      </div>

      {/* Schedule Table */}
      <Suspense fallback={<AdminScheduleTableSkeleton />}>
        <MyScheduleTable {...queryParams} />
      </Suspense>

      {/* Creation Modal Component */}
      <CreateScheduleModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
};

export default MySchedulesTab;
