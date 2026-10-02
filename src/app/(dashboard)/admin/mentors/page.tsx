import MentorApprovalTable from '@/components/modules/mentor-approval/mentor-approval-table';
import React from 'react';

const MentorsPageAdmin = () => {
  return (
    <div>
       <h1>All Mentors Table</h1>
       <div>
        <MentorApprovalTable/>
       </div>
    </div>
  );
};

export default MentorsPageAdmin;