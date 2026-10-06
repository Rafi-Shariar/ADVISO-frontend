import { AlertCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import ApplyAsMentorForm from "@/components/forms/apply-as-mentor-form";
import { Button } from "@/components/ui/button";

interface Props {
  reason?: string | null;
}

export const ApplicationRejectedCard = ({ reason }: Props) => {
  const [isReapplying, setIsReapplying] = useState(false);

  if (isReapplying) {
    return <ApplyAsMentorForm />;
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50/40 p-6 mt-26">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900">
            Application Rejected
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Unfortunately, your application was not approved at this time.
          </p>

          <div className="mt-4 rounded-lg border border-red-100 bg-white p-3">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Reason for Rejection:
            </span>
            <p className="mt-1 text-sm text-red-700">
              {reason || "Requirements were not fulfilled."}
            </p>
          </div>

          <Button
            onClick={() => setIsReapplying(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            <RotateCcw className="h-4 w-4" />
            Re-apply as Mentor
          </Button>
        </div>
      </div>
    </div>
  );
};
