import MentorTabs from "@/components/modules/mentor/mentor-tabs";
import React from "react";

const MentorsPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6 px-2 lg:px-0">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Choose Mentors Based on your preferrence
        </h1>
      </div>

      <MentorTabs />
    </div>
  );
};

export default MentorsPage;
