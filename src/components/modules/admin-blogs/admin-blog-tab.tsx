"use client";
import React, { Suspense, useState } from "react";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";

import { BlogParams } from "@/types/blog.types";
import BlogTableSkeletonAdmin from "./admin-blog-table-skeleton";
import BlogsTableAdmin from "./admin-blog-table";

const AdminBlogTabs = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  const queryParams: BlogParams = {
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <div className="w-full">
      {/* Main Controls Header */}
      <div className="my-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search, Filter, and Sort Controls */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search Input */}
          <div className="w-full sm:w-64 md:w-72">
            <Input
              type="search"
              placeholder="Search by title, content, mentor name, mentor id..."
              className="w-full"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
      </div>

      {/* Table / Skeleton View */}
      <Suspense fallback={<BlogTableSkeletonAdmin />}>
        <BlogsTableAdmin {...queryParams} />
      </Suspense>
    </div>
  );
};

export default AdminBlogTabs;
