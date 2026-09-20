import RoleGuard from '@/components/auth/role-guard';
import React, { ReactNode } from 'react';

const UserLayout = ({children} : {children : ReactNode}) => {
    return (
        <RoleGuard roles={["USER"]}>
            {children}
        </RoleGuard>
    );
};

export default UserLayout;