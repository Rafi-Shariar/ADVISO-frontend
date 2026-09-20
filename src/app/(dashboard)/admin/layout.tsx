import RoleGuard from '@/components/auth/role-guard';
import DashbaordShell from '@/components/dashbaord/dashboard-shell';
import React, { ReactNode } from 'react';

const layout = ({children} : {children : ReactNode}) => {
    return (
        <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
            <DashbaordShell role="ADMIN">{children}</DashbaordShell>
        </RoleGuard>
    );
};

export default layout;