import React from "react";
import { UserX } from "lucide-react";

const MentorNotFound = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <UserX className="size-10 text-muted-foreground/60 mb-3" />
      <h3 className="text-base font-semibold text-foreground">
        No Mentors Found
      </h3>
      <p className="text-xs text-muted-foreground mt-1">
        Try adjusting your search or filters.
      </p>
    </div>
  );
};

export default MentorNotFound;
