import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";
import { BlogItemInMentorDetails } from "@/types/mentor.type";

export const BlogsTab = ({ blogs }: { blogs: BlogItemInMentorDetails[] }) => {
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <h3 className="text-base font-bold text-foreground">Authored Publications</h3>
        <span className="text-xs text-muted-foreground font-semibold">{blogs.length} Articles</span>
      </div>

      {blogs.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
          <BookOpen className="size-8 text-muted-foreground/50" />
          <span>No articles published yet by this mentor.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <Link
              key={blog.blogId}
              href={`/blogs/${blog.blogId}`}
              className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/20 overflow-hidden hover:border-orange-500/40 hover:shadow-xs transition-all"
            >
              <div className="relative w-full h-36 bg-muted overflow-hidden">
                {blog.bannerImage ? (
                  <Image
                    src={blog.bannerImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center bg-orange-500/10 text-orange-600 font-bold">
                    <BookOpen className="size-6" />
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-orange-600 transition-colors line-clamp-2">
                  {blog.title}
                </h4>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-2">
                  <Calendar className="size-3" />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
