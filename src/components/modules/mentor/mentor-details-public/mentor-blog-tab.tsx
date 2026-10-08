import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogItemInMentorDetails } from "@/types/blog.types";


export const MentorBlogsTab = ({
  blogs,
}: {
  blogs: BlogItemInMentorDetails[];
}) => {
  return (
    <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Articles & Publications
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Read specialized technical and career essays written by this mentor.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="py-14 text-center text-xs text-zinc-400">
          No articles published yet by this mentor.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <Link
              key={blog.blogId}
              href={`/blogs/${blog.blogId}`}
              className="group flex flex-col justify-between rounded-[12px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-all p-3"
            >
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {blog.bannerImage ? (
                    <Image
                      src={blog.bannerImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center font-bold text-xs text-zinc-400">
                      ADVISO EDITORIAL
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-0.5 font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600">
                  Read <ArrowUpRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
