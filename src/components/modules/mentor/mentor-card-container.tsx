import { useSuspenseGetAllMentorsPublic } from "@/hooks/mentor.hook";
import { IMentorProfile, MentorParams } from "@/types/mentor.type";
import React, { Dispatch, SetStateAction } from "react";
import MentorCard from "./mentor-card";
import TablePagination from "@/components/ui/table-pagination";

interface Props extends MentorParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}
const MentorCardContainer = ({ handlePageChange, ...params }: Props) => {
  const { data } = useSuspenseGetAllMentorsPublic(params);

  const mentors: IMentorProfile[] = data?.data || [];

  return <>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6 items-stretch">
      {mentors.map((mentor) => (
        <MentorCard mentor={mentor} key={mentor.mentorId} />
      ))}
    </div>

     <div className="my-6">
        <TablePagination
          totalPages={data?.meta?.totalPages ?? 0}
          handlePageChange={handlePageChange}
          page={params.page ?? 0}
        />
      </div>

    
  </>;
};

export default MentorCardContainer;
