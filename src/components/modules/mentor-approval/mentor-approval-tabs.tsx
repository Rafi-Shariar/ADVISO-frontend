import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MentorApprovalTable from "./mentor-approval-table";
import MentorApprovalTableSkeleton from "./mentor-approval-table-sketon";
const MentorApprovalTabs = () => {
  return (
    <div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
   
      </Tabs>

      <Suspense fallback= {<MentorApprovalTableSkeleton/>}>
         <MentorApprovalTable/>
      </Suspense>
    </div>
  );
};

export default MentorApprovalTabs;
