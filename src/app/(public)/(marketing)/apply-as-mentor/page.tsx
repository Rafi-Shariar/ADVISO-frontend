"use client";

import ApplyAsMentorForm from "@/components/forms/apply-as-mentor-form";
import { ApplicationApprovedCard } from "@/components/modules/apply-as-mentor/status-approved";
import { ApplicationPendingCard } from "@/components/modules/apply-as-mentor/status-pending";
import { ApplicationRejectedCard } from "@/components/modules/apply-as-mentor/status-rejected";

import { useGetApplicationStatus } from "@/hooks/user.hook";

const ApplyAsMentorPage = () => {
  const { data, isPending } = useGetApplicationStatus();

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="loading loading-spinner text-zinc-600" />
      </div>
    );
  }

  const application = data?.data;
  const status = application?.verificationStatus;

  if (!status) {
    return <ApplyAsMentorForm />;
  }

  switch (status) {
    case "PENDING":
      return <ApplicationPendingCard />;

    case "REJECTED":
      return <ApplicationRejectedCard reason={application?.rejectionReason} />;

    case "APPROVED":
      return <ApplicationApprovedCard />;

    default:
      return <ApplyAsMentorForm />;
  }
};

export default ApplyAsMentorPage;
