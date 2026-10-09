import UsersTableTabs from "@/components/modules/admin-users-table/admin-users-table-tabs";
import React from "react";

const AdminUsersPage = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              System Users Log
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage registed users in the system, alter account status or
              delete user completely to prevent safety.
            </p>
          </div>
        </div>
      </header>
      <div>
        <UsersTableTabs />
      </div>
    </div>
  );
};

export default AdminUsersPage;
