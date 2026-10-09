import FeedbackTableAdmin from "@/components/modules/admin-feedbacks/admin-feedback-table";
import React from "react";

const FeedbackPageAdmin = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Mentee Feedbacks
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Find feedbacks and suggestion from our platform users. Identify
              problems and solve them my connecting to the victim.
            </p>
          </div>
        </div>
      </header>
      <FeedbackTableAdmin />
    </div>
  );
};

export default FeedbackPageAdmin;
