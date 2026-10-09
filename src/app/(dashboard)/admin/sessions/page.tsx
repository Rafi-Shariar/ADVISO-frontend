import AdminSessionTable from "@/components/modules/admin-session/admin-session-table";

const AdminSessionPage = () => {
  return (
    <div>
      <div>
        <header className="border-b border-border/60 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Booked Slots
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Manage your upcoming sessions, check session status and review
                feedbacks from users.
              </p>
            </div>
          </div>
        </header>
      </div>

      <AdminSessionTable />
    </div>
  );
};

export default AdminSessionPage;
