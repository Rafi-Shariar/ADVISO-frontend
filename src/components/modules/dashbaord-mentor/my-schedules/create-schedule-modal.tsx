"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateSchedule } from "@/hooks/schedule.hook";
import {
  convertToUtcEpochIso,
  getTimeDifferenceInMinutes,
  TIME_SLOTS,
} from "@/utils/schedule.helper";

interface CreateScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormErrors {
  date?: string;
  startTime?: string;
  endTime?: string;
}

export const CreateScheduleModal = ({
  open,
  onOpenChange,
}: CreateScheduleModalProps) => {
  const { mutate: createSchedule, isPending } = useCreateSchedule();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!selectedDate) {
      newErrors.date = "Schedule date is required";
    }

    if (!startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!endTime) {
      newErrors.endTime = "End time is required";
    }

    if (startTime && endTime) {
      const diffMinutes = getTimeDifferenceInMinutes(startTime, endTime);

      if (diffMinutes <= 0) {
        newErrors.endTime = "End time must be later than start time";
      } else if (diffMinutes > 12 * 60) {
        newErrors.endTime = "Duration cannot exceed 12 hours";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    setStartTime("");
    setEndTime("");
    setErrors({});
  };

  const handleOpenChange = (state: boolean) => {
    if (!isPending) {
      if (!state) handleReset();
      onOpenChange(state);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedDate) return;

    const payload = {
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: convertToUtcEpochIso(startTime),
      endTime: convertToUtcEpochIso(endTime),
    };

    createSchedule(payload, {
      onSuccess: () => {
        toast.success("Schedule Created", {
          description: "Your mentorship slot has been published successfully.",
          position: "top-right",
        });
        handleOpenChange(false);
      },
      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create schedule slot.";

        toast.error("Creation Failed", {
          description: message,
          position: "top-right",
        });
      },
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-6 rounded-3xl border border-border/80 bg-card shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Header */}
          <DialogHeader className="space-y-1.5 text-left">
            <div className="size-11 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-1">
              <Sparkles className="size-5" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Create Mentorship Slot
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Pick your available date and time window for 1:1 mentee bookings.
            </DialogDescription>
          </DialogHeader>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* 1. Date Field */}
            <div className="space-y-1.5">
              <h1 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date <span className="text-rose-500">*</span>
              </h1>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal rounded-xl h-11 border-border/80 bg-muted/20 hover:bg-muted/40 transition-colors ${
                      errors.date ? "border-rose-500 focus:ring-rose-500" : ""
                    } ${!selectedDate ? "text-muted-foreground" : "text-foreground font-medium"}`}
                  >
                    <CalendarIcon className="mr-2 size-4 text-orange-500" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-2xl shadow-xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d);
                      if (errors.date)
                        setErrors((prev) => ({ ...prev, date: undefined }));
                    }}
                    disabled={(d) => d < today}
                  />
                </PopoverContent>
              </Popover>

              {errors.date && (
                <p className="text-[11px] font-medium text-rose-500 pl-1">
                  {errors.date}
                </p>
              )}
            </div>

            {/* 2. Modern Time Selectors */}
            <div className="grid grid-cols-2 gap-3">
              {/* Start Time */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Start Time <span className="text-rose-500">*</span>
                </h2>

                <Select
                  value={startTime}
                  onValueChange={(val) => {
                    setStartTime(val);
                    if (errors.startTime) {
                      setErrors((prev) => ({ ...prev, startTime: undefined }));
                    }
                  }}
                >
                  <SelectTrigger
                    className={`h-11 rounded-xl bg-muted/20 border-border/80 font-medium ${
                      errors.startTime ? "border-rose-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="size-3.5 text-orange-500 shrink-0" />
                      <SelectValue placeholder="Pick start" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60 rounded-xl">
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem
                        key={slot.value}
                        value={slot.value}
                        className="text-xs font-medium"
                      >
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.startTime && (
                  <p className="text-[11px] font-medium text-rose-500 pl-1">
                    {errors.startTime}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  End Time <span className="text-rose-500">*</span>
                </h2>

                <Select
                  value={endTime}
                  onValueChange={(val) => {
                    setEndTime(val);
                    if (errors.endTime) {
                      setErrors((prev) => ({ ...prev, endTime: undefined }));
                    }
                  }}
                >
                  <SelectTrigger
                    className={`h-11 rounded-xl bg-muted/20 border-border/80 font-medium ${
                      errors.endTime ? "border-rose-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="size-3.5 text-orange-500 shrink-0" />
                      <SelectValue placeholder="Pick end" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60 rounded-xl">
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem
                        key={slot.value}
                        value={slot.value}
                        className="text-xs font-medium"
                      >
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.endTime && (
                  <p className="text-[11px] font-medium text-rose-500 pl-1">
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <DialogFooter className="gap-2 sm:gap-0 pt-3 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="rounded-xl border-border bg-card"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Save Schedule"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
