import Link from "next/link";

import { ArrowLeft, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
const BlogNotFoundCard = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="size-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
        <ShieldAlert className="size-7" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Blog Not Found</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-sm">
        The blog post you are looking for does not exist or may have been
        removed.
      </p>
      <Link href="/blogs">
        <Button className="rounded-[12px] bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <ArrowLeft className="size-4" />
          <span>Explore Other Blogs</span>
        </Button>
      </Link>
    </div>
  );
};

export default BlogNotFoundCard;
