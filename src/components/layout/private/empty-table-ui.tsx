import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ShieldAlert } from "lucide-react";
const EmptyTableUI = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={9}
        className="h-16 text-center font-medium text-amber-700"
      >
        <div className="flex items-center justify-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
          <span>No information available</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableUI;
