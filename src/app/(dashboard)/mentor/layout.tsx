import RoleGuard from '@/components/auth/role-guard';
import React, { ReactNode } from 'react';

const MentorLayout = ({children} : {children : ReactNode}) => {
    return (
        <RoleGuard roles={["MENTOR"]}>
            {children}
        </RoleGuard>
    );
};

export default MentorLayout;