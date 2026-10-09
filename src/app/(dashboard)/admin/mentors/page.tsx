import MentorApprovalTable from "@/components/modules/mentor-approval/mentor-approval-table";
import MentorApprovalTabs from "@/components/modules/mentor-approval/mentor-approval-tabs";
import React from "react";

const MentorsPageAdmin = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Community Experts
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage our community experts, approve new applications, manage
              mentorship status and more.
            </p>
          </div>
        </div>
      </header>
      <div className="">
        <MentorApprovalTabs />
      </div>
    </div>
  );
};

export default MentorsPageAdmin;
