import UserPaymentTable from "@/components/modules/dashboard-user/user-payments/user-payment-table";
import UserSessionsTable from "@/components/modules/dashboard-user/user-sessions/user-session-table";
import React from "react";

const MySessionsPage = () => {
  return (
    <div>
      Trasaction History
      <UserPaymentTable />
    </div>
  );
};

export default MySessionsPage;
