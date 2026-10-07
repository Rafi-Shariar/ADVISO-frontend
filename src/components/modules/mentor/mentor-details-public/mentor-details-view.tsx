"use client";

import { useMentorDetails } from "@/hooks/mentor.hook";
import { IMentorDetails } from "@/types/mentor.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MessageSquare, BookOpen, UserX, Loader2 } from "lucide-react";
import { MentorStickySidebar } from "./mentor-sticky-sidebar";
import { BookScheduleTab } from "./book-schedule-tab";
import { MentorReviewsTab } from "./mentor-review-tab";
import { MentorBlogsTab } from "./mentor-blog-tab";



interface MentorDetailsViewProps {
  id: string;
}

const MentorDetailsView = ({ id }: MentorDetailsViewProps) => {
  const { data, isPending } = useMentorDetails(id);
  const mentor: IMentorDetails = data?.data;

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <Loader2 className="size-8 text-orange-500 animate-spin" />
        <p className="text-xs font-medium text-muted-foreground tracking-wide">
          Loading mentor dossier...
        </p>
      </div>
    );
  }

  if (!mentor?.user) {
    return (
      <div className="max-w-xl mx-auto my-28 p-10 rounded-[12px] border border-zinc-200 dark:border-zinc-800 text-center space-y-3 bg-zinc-50/50 dark:bg-zinc-900/30">
        <UserX className="size-10 mx-auto text-zinc-400" />
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Mentor Not Found
        </h3>
        <p className="text-xs text-zinc-500">
          The requested mentor profile could not be found or has been deactivated.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 2-Column Split: Sticky Details on Left, Tabs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* 👈 Left Column: Sticky Profile Dossier (4.5 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
          <MentorStickySidebar mentor={mentor} />
        </div>

        {/* 👉 Right Column: Interactive Content Tabs (7.5 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <Tabs defaultValue="schedule" className="space-y-6">
            
            {/* Minimal & Sharp Tabs Header (ADVISO Style) */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <TabsList className="bg-transparent h-auto p-0 flex gap-2 sm:gap-3 w-full justify-start overflow-x-auto">
                
                {/* 1. Book a Schedule */}
                <TabsTrigger
                  value="schedule"
                  className="rounded-[12px] px-4 py-2.5 text-xs sm:text-sm font-bold border border-transparent transition-all
                  data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900
                  data-[state=inactive]:bg-zinc-100 dark:data-[state=inactive]:bg-zinc-800/60 data-[state=inactive]:text-zinc-600 dark:data-[state=inactive]:text-zinc-400 hover:text-zinc-900 gap-2"
                >
                  <CalendarDays className="size-4 text-orange-500" />
                  <span>Book a Schedule</span>
                </TabsTrigger>

                {/* 2. Reviews */}
                <TabsTrigger
                  value="reviews"
                  className="rounded-[12px] px-4 py-2.5 text-xs sm:text-sm font-bold border border-transparent transition-all
                  data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900
                  data-[state=inactive]:bg-zinc-100 dark:data-[state=inactive]:bg-zinc-800/60 data-[state=inactive]:text-zinc-600 dark:data-[state=inactive]:text-zinc-400 hover:text-zinc-900 gap-2"
                >
                  <MessageSquare className="size-4 text-orange-500" />
                  <span>Reviews ({mentor.reviews?.length ?? mentor.totalReviews ?? 0})</span>
                </TabsTrigger>

                {/* 3. Blogs */}
                <TabsTrigger
                  value="blogs"
                  className="rounded-[12px] px-4 py-2.5 text-xs sm:text-sm font-bold border border-transparent transition-all
                  data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900
                  data-[state=inactive]:bg-zinc-100 dark:data-[state=inactive]:bg-zinc-800/60 data-[state=inactive]:text-zinc-600 dark:data-[state=inactive]:text-zinc-400 hover:text-zinc-900 gap-2"
                >
                  <BookOpen className="size-4 text-orange-500" />
                  <span>Blogs ({mentor.blogs?.length ?? 0})</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Book a Schedule Slot */}
            <TabsContent value="schedule" className="mt-0 focus-visible:outline-none">
              <BookScheduleTab mentorId={id} timezone={mentor.user.timezone} />
            </TabsContent>

            {/* Tab 2: Reviews */}
            <TabsContent value="reviews" className="mt-0 focus-visible:outline-none">
              <MentorReviewsTab
                reviews={mentor.reviews || []}
                averageRatings={mentor.averageRatings}
                totalReviews={mentor.totalReviews}
              />
            </TabsContent>

            {/* Tab 3: Blogs */}
            <TabsContent value="blogs" className="mt-0 focus-visible:outline-none">
              <MentorBlogsTab blogs={mentor.blogs || []} />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default MentorDetailsView;