import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Schedules } from "@/types/schedule.type";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";

import { formatSlotTime } from "@/utils/date-time-converter";

interface Props {
  data: Schedules | null;
  onClose: () => void;
  isOpen: boolean;
}

export function MyScheduleSlotSheet({ data, onClose, isOpen }: Props) {
  if (!data) return null;

  const user = data.mentor?.user;
  const slots = data.slots || [];
  const bookedSlotsCount = slots.filter((s) => s.isBooked).length;
  const availableSlotsCount = slots.length - bookedSlotsCount;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-2xl w-full overflow-y-auto p-6 space-y-3">
        <SheetHeader className="space-y-1">
          <SheetTitle className="text-xl font-bold tracking-tight">
            Schedule Details
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            View mentor schedule metadata and all individual session slots.
          </SheetDescription>
        </SheetHeader>

        {/* ১. Schedule Information Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl border bg-muted/30">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Schedule Date
              </p>
              <p className="text-xs font-semibold">
                {data.date
                  ? format(new Date(data.date), "dd MMM, yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border bg-muted/30">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Created At
              </p>
              <p className="text-xs font-semibold">
                {data.createdAt
                  ? format(new Date(data.createdAt), "dd MMM, yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* ৩. Slots Grid Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Session Slots ({slots.length})
            </h3>
            {/* Quick Status Legend */}
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Booked ({bookedSlotsCount})
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Available ({availableSlotsCount})
              </span>
            </div>
          </div>

          {slots.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground border rounded-xl border-dashed">
              No session slots available for this schedule.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {slots.map((slot) => {
                const isBooked = slot.isBooked;

                return (
                  <div
                    key={slot.slotId}
                    className={`relative flex flex-col justify-between p-3 rounded-lg border text-center transition-all ${
                      isBooked
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-950 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-200"
                        : "bg-amber-50/70 border-amber-200 text-amber-950 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-200"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 text-[11px] font-semibold tracking-tight">
                      <span>{formatSlotTime(slot.startTime)}</span>
                      <span>-</span>
                      <span>{formatSlotTime(slot.endTime)}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          isBooked
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300"
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Booked
                          </>
                        ) : (
                          <>
                            <CircleDashed className="h-3 w-3" /> Available
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
