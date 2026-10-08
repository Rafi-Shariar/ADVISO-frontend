import AdminPaymentTabs from "@/components/modules/admin-payments/admin-payments-tab";
import MentorApprovalTable from "@/components/modules/mentor-approval/mentor-approval-table";
import MentorApprovalTabs from "@/components/modules/mentor-approval/mentor-approval-tabs";
import React from "react";

const PaymentsPageAdmin = () => {
  return (
    <div>
      <h1>Platform Payment History</h1>
      <div className="">
        <AdminPaymentTabs/>
      </div>
    </div>
  );
};

export default PaymentsPageAdmin;
