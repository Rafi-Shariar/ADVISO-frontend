import MySchedulesTab from "@/components/modules/dashbaord-mentor/my-schedules/my-schedule-tabs";
import { CalendarDays, Plus } from "lucide-react";
import Link from "next/link";

const MySchedulesPage = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              My Schedules
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage your upcoming sessions, set availability slots, and track
              booking requests.
            </p>
          </div>
        </div>
      </header>

      {/* Schedules Tab Content */}
      <main>
        <MySchedulesTab />
      </main>
    </div>
  );
};

export default MySchedulesPage;
