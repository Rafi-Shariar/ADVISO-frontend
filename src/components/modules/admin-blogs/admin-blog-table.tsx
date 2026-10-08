"use client";

import { ShieldAlert } from "lucide-react";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

ShieldAlert;

import EmptyTableUI from "@/components/layout/private/empty-table-ui";

import { formatScheduleDate } from "@/utils/date-time-converter";

import { useSuspenseGetAllBlogsAdmin } from "@/hooks";
import { BlogItem, BlogParams } from "@/types/blog.types";

interface Props extends BlogParams {}

const BlogsTableAdmin = ({ ...params }: Props) => {
  const { data } = useSuspenseGetAllBlogsAdmin(params);

  const blogs: BlogItem[] = data?.data || [];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {blogs.length === 0 && <EmptyTableUI />}
          {blogs.map((blog: BlogItem) => (
            <TableRow key={blog.blogId}>
              <TableCell>{blog.mentor.user.name}</TableCell>
              <TableCell>{blog.mentor.user.email}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>
                {formatScheduleDate(blog.createdAt)}
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogsTableAdmin;
