"use client";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import useDebounce from "@/hooks/debounce.hook";
import AdminScheduleTable from "./admin-schedule-table";

const AdminScheduleTabs = () => {
  const [date, setDate] = React.useState<Date>();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput)

  const handleSearch = (e:any) => {
    setSearchInput(e.target.value)

  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between my-6">
        <div className="w-full sm:w-64 md:w-100">
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="w-full"
            onChange={(e) => handleSearch(e)}
          />
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <AdminScheduleTable/>
    </div>
  );
};

export default AdminScheduleTabs;
