import UserPaymentTable from "@/components/modules/dashboard-user/user-payments/user-payment-table";
import UserSessionsTable from "@/components/modules/dashboard-user/user-sessions/user-session-table";
import React from "react";

const MySessionsPage = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Payment History
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Track your trasaction history, identify failed payments and more.
            </p>
          </div>
        </div>
      </header>
      <UserPaymentTable />
    </div>
  );
};

export default MySessionsPage;
