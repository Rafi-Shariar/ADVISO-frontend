import MentorApprovalTable from "@/components/modules/mentor-approval/mentor-approval-table";
import MentorApprovalTabs from "@/components/modules/mentor-approval/mentor-approval-tabs";
import React from "react";

const MentorsPageAdmin = () => {
  return (
    <div>
      <h1>All Mentors Table</h1>
      <div className="">
        <MentorApprovalTabs />
      </div>
    </div>
  );
};

export default MentorsPageAdmin;
