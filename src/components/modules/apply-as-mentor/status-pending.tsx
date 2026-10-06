import { Clock } from "lucide-react";

export const ApplicationPendingCard = () => {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-amber-200 bg-amber-50/50 p-10 text-center mt-26">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <Clock className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900">
        Application Under Review
      </h3>
      <p className="mt-2 text-sm text-zinc-600">
        Your mentor application is currently being reviewed by our team. We will
        notify you once a decision has been made.
      </p>
    </div>
  );
};
