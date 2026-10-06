import { CheckCircle2 } from "lucide-react";

export const ApplicationApprovedCard = () => {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 text-center mt-26">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900">
        You are a Verified Mentor
      </h3>
      <p className="mt-2 text-sm text-zinc-600">
        Your application has already been accepted. Head over to your mentor
        dashboard to manage sessions.
      </p>
    </div>
  );
};
