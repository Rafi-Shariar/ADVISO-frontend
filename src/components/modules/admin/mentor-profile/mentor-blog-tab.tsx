import Image from "next/image";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

interface Blog {
  blogId: string;
  title: string;
  bannerImage: string | null;
  content: string;
  createdAt: string;
}

export const MentorBlogsTab = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="space-y-6">
      {blogs.length === 0 ? (
        <div className="rounded-3xl border border-border/70 bg-card p-12 text-center space-y-2">
          <BookOpen className="size-8 mx-auto text-muted-foreground/60" />
          <h4 className="text-base font-semibold text-foreground">
            No Published Articles
          </h4>
          <p className="text-sm text-muted-foreground">
            This mentor hasn't authored any publications on the platform.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.blogId}
              className="group rounded-3xl border border-border/70 bg-card overflow-hidden shadow-xs hover:border-orange-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Banner Image */}
                <div className="relative w-full h-48 bg-muted overflow-hidden">
                  {blog.bannerImage ? (
                    <Image
                      src={blog.bannerImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-orange-500/10 text-orange-600 font-bold">
                      <BookOpen className="size-8" />
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5 text-orange-500" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                </div>
              </div>

              {/* Bottom footer link */}
              <div className="px-6 pb-6 pt-2 border-t border-border/40 mt-auto flex items-center justify-between">
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  Read Full Publication <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
