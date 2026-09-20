import RoleGuard from '@/components/auth/role-guard';
import DashbaordShell from '@/components/dashbaord/dashboard-shell';
import React, { ReactNode } from 'react';

const layout = ({children} : {children : ReactNode}) => {
    return (
        <RoleGuard roles={["USER"]}>
            <DashbaordShell role="USER">{children}</DashbaordShell>
        </RoleGuard>
    );
};

export default layout;