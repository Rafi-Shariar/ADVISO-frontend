import AdminScheduleTabs from "@/components/modules/admin-schedules/admin-schedule-tabs";
import React from "react";

const SchedulePage = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Mentor Schedules
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Audit schedules set by our experts, track current status of the
              schedule and more.
            </p>
          </div>
        </div>
      </header>
      <div>
        <AdminScheduleTabs />
      </div>
    </div>
  );
};

export default SchedulePage;
