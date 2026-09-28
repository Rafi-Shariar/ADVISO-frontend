import { BlogItem, BlogItemInMentorDetails } from "@/types/blog.types";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: BlogItemInMentorDetails;
}

const BlogCardMentorDetails = ({ blog }: BlogCardProps) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link
      key={blog.blogId}
      href={`/blogs/${blog.blogId}`}
      className="group rounded-[12px] bg-white dark:bg-zinc-900 border border-border/70 hover:border-orange-500/50 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative select-none"
    >
      {/* Wide Aspect Banner Image */}
      <div className="relative w-full sm:w-[200px] h-[160px] sm:h-auto shrink-0 rounded-[12px] overflow-hidden bg-muted border border-border/40">
        <Image
          src={blog.bannerImage}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-md text-white px-2 py-0.5 rounded-[8px] text-[10px] font-mono tracking-wider border border-white/10">
          READ
        </div>
      </div>

      {/* Content & Author Strip */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3 text-orange-500" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="size-1 rounded-full bg-border" />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3 text-orange-500" />5 min read
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
            {blog.title}
          </h3>

         
        </div>

       
      </div>
    </Link>
  );
};

export default BlogCardMentorDetails;
