import React from 'react';
import { MentorCardSkeleton } from './MentorCardSkeleton';

const MentorPageSkeleton = () => {
    return (
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6 items-stretch">
      {[1,2,3,4,5].map((mentor) => (
        <MentorCardSkeleton key={mentor} />
      ))}
    </div>
    );
};

export default MentorPageSkeleton;