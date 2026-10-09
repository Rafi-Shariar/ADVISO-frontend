import UserSessionsTable from "@/components/modules/dashboard-user/user-sessions/user-session-table";
import React from "react";

const MySessionsPage = () => {
  return (
    <div>
    <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sessions
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage your upcoming sessions, join them directly with the meeting link, and add feedback on completion.
            </p>
          </div>
        </div>
      </header>
      <UserSessionsTable />
    </div>
  );
};

export default MySessionsPage;
