"use client"

import FeedbackCards from "@/components/modules/admin/overview/FeedbackCards";
import FinancialCards from "@/components/modules/admin/overview/FinancialCards";
import RecentActivityCards from "@/components/modules/admin/overview/RecentActivityCards";
import SessionCards from "@/components/modules/admin/overview/SessionCards";
import UserCards from "@/components/modules/admin/overview/UserCards";
import { useAdminStats } from "@/hooks/analytics.hook";


const AdminPage = () => {

    const {data, isPending} = useAdminStats()

    const analytics = data?.data || {};

    console.log(analytics);
    

    if(isPending){
        return <div>Loading</div>
    }


    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold ">Platform Performance </h1>
            </div>

            <div className="space-y-6">
                <SessionCards sessions={analytics?.sessions}/>
                <FinancialCards financials={analytics?.financials}/>
                <UserCards users={analytics?.users}/>
                <FeedbackCards feedback={analytics?.feedback}/>
                <RecentActivityCards recentActivities={analytics?.recentActivities}/>
            </div>

        </div>
    );
};

export default AdminPage;