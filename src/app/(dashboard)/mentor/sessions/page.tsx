import MentorSessionsTable from "@/components/modules/dashbaord-mentor/mentor-sessions/mentor-session-table";

const GetMentorSession = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sessions To Attend
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage your upcoming sessions, join sessions, and provide
              feedback.
            </p>
          </div>
        </div>
      </header>
      <MentorSessionsTable />
    </div>
  );
};

export default GetMentorSession;
