import RoleGuard from '@/components/auth/role-guard';
import DashbaordShell from '@/components/dashbaord/dashboard-shell';
import React, { ReactNode } from 'react';

const layout = ({children} : {children : ReactNode}) => {
    return (
        <RoleGuard roles={["MENTOR"]}>
            <DashbaordShell role="MENTOR">{children}</DashbaordShell>
        </RoleGuard>
    );
};

export default layout;