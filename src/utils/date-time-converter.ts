import { isValid , format} from "date-fns";

export function formatScheduleDate(dateString : string){

    const date = new Date(dateString)
    return isValid(date) ? format(date, "EEE do MMM, yyyy") : "Invalid Date";

}

export const formatSlotTime = (isoString?: string) => {
  if (!isoString) return "--:--";
  const date = new Date(isoString);
  return isValid(date) ? format(date, "h:mm a") : "Invalid Time";
};