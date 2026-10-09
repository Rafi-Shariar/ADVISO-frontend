import AdminBlogTabs from "@/components/modules/admin-blogs/admin-blog-tab";
import React from "react";

const BlogsPageAdmin = () => {
  return (
    <div>
      <header className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Blogs & Articles
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage blogs & articles written my our community experts.
            </p>
          </div>
        </div>
      </header>

      <AdminBlogTabs />
    </div>
  );
};

export default BlogsPageAdmin;
