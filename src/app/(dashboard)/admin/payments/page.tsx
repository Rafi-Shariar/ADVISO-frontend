import AdminPaymentTabs from "@/components/modules/admin-payments/admin-payments-tab";
import MentorApprovalTable from "@/components/modules/mentor-approval/mentor-approval-table";
import MentorApprovalTabs from "@/components/modules/mentor-approval/mentor-approval-tabs";
import React from "react";

const PaymentsPageAdmin = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              System Finance
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Track ongoing transaction in the system. Audit failed and refunded
              trasactions and more.
            </p>
          </div>
        </div>
      </header>
      <div className="">
        <AdminPaymentTabs />
      </div>
    </div>
  );
};

export default PaymentsPageAdmin;
