"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
} from "./pagination";

/**
 * Returns an array of page numbers and ellipsis tokens
 * e.g., [1, 2, 3, "ellipsis-right", 8, 9, 10]
 * or    ["ellipsis-left", 3, 4, 5, "ellipsis-right", 8, 9, 10]
 */
const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1 // how many pages around the current page to show
): (number | string)[] => {
  // If the total pages is small, just show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Always show the last 3 pages on the right
  const rightBoundary = [totalPages - 2, totalPages - 1, totalPages];

  // Calculate the active window around the current page
  let startPage = Math.max(currentPage - siblingCount, 1);
  let endPage = Math.min(currentPage + siblingCount, totalPages - 3);

  // If current page is at or near the beginning (e.g. 1, 2)
  if (currentPage <= 2) {
    startPage = 1;
    endPage = 3;
  }

  const middleRange: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    middleRange.push(i);
  }

  const items: (number | string)[] = [];

  // 1. Show left ellipsis if middle range doesn't start at 1
  if (startPage > 1) {
    items.push("ellipsis-left");
  }

  // 2. Add middle pages
  items.push(...middleRange);

  // 3. Show right ellipsis if there's a gap before the right 3 pages
  if (endPage < totalPages - 3) {
    items.push("ellipsis-right");
  }

  // 4. Add the trailing 3 pages (e.g., 8, 9, 10)
  items.push(...rightBoundary);

  return items;
};

const TablePagination = () => {
  const [page, setPage] = useState(1);
  const totalPages = 7;

  const gotoPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginationRange = getPaginationRange(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => gotoPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* Dynamic Pages & Ellipses */}
        {paginationRange.map((item, index) => {
          if (typeof item === "string") {
            return (
              <PaginationItem key={`${item}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => gotoPage(item)}
                isActive={page === item}
                className={
                  page === item
                    ? "bg-orange-500 text-white cursor-pointer hover:bg-orange-600 hover:text-white"
                    : "cursor-pointer"
                }
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => gotoPage(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;