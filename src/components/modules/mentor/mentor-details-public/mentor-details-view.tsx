"use client";

import { useMentorDetails } from "@/hooks/mentor.hook";
import { IMentorDetails } from "@/types/mentor.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, MessageSquare, BookOpen, Calendar, UserX } from "lucide-react";
import { MentorHeroBanner } from "./mentor-details-hero";
import { MentorStatsStrip } from "./mentor-details-status-strip";
import { OverviewTab } from "./overview-tab";
import { SchedulesTab } from "./schdule-tab";
import { ReviewsTab } from "./review-tabs";
import { BlogsTab } from "./blogs-tab";
import { MentorBookingCard } from "./mentor-details-booking-card";



interface MentorDetailsViewProps {
  id: string;
}

const MentorDetailsView = ({ id }: MentorDetailsViewProps) => {
  const { data, isPending } = useMentorDetails(id);
  const mentor: IMentorDetails = data?.data;

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <div className="size-10 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="text-xs font-medium text-muted-foreground animate-pulse">
          Loading mentor profile...
        </p>
      </div>
    );
  }

  if (!mentor?.user) {
    return (
      <div className="max-w-xl mx-auto my-24 p-8 rounded-3xl border border-dashed border-border text-center space-y-3 bg-muted/10">
        <UserX className="size-10 mx-auto text-muted-foreground/60" />
        <h3 className="text-lg font-semibold text-foreground">Mentor Profile Unavailable</h3>
        <p className="text-sm text-muted-foreground">The mentor profile you are looking for does not exist or is inactive.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* 1. Header Banner & Profile Snapshot */}
      <MentorHeroBanner mentor={mentor} />

      {/* 2. Key Metrics Bar */}
      <MentorStatsStrip mentor={mentor} />

      {/* 3. Main Grid: Extensible Tabs & Sticky Action Column */}
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
  {/* Left Column: Modular Tabs (8 Cols) */}
  <div className="lg:col-span-8 space-y-6">
    <Tabs defaultValue="overview" className="space-y-6">
      
      {/* 🌈 Vibrant & Elevated Tabs Header Bar */}
      <div className="p-1.5 sm:p-2 rounded-[12px] bg-yellow-50 dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <TabsList className="bg-transparent h-auto p-0 flex flex-wrap sm:flex-nowrap gap-1.5 w-full">
          
          {/* 1. Overview Tab (Orange Theme) */}
          <TabsTrigger
            value="overview"
            className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-white/60 dark:hover:bg-zinc-800/60
            data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-md data-[state=active]:shadow-orange-500/10 data-[state=active]:border data-[state=active]:border-orange-500/30"
          >
            <div className="p-1 rounded-lg bg-orange-500/10 group-data-[state=active]:bg-orange-500/20">
              <Info className="size-4 text-orange-500" />
            </div>
            <span>Overview</span>
          </TabsTrigger>

          {/* 2. Schedules Tab (Emerald Theme) */}
          <TabsTrigger
            value="schedules"
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-zinc-800/60
            data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-md data-[state=active]:shadow-emerald-500/10 data-[state=active]:border data-[state=active]:border-emerald-500/30"
          >
            <div className="p-1 rounded-lg bg-emerald-500/10">
              <Calendar className="size-4 text-emerald-500" />
            </div>
            <span>Availability</span>
            <span className="ml-0.5 px-2 py-0.2 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live
            </span>
          </TabsTrigger>

          {/* 3. Reviews Tab (Amber Theme) */}
          <TabsTrigger
            value="reviews"
            className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white/60 dark:hover:bg-zinc-800/60
            data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:shadow-md data-[state=active]:shadow-amber-500/10 data-[state=active]:border data-[state=active]:border-amber-500/30"
          >
            <div className="p-1 rounded-lg bg-amber-500/10">
              <MessageSquare className="size-4 text-amber-500" />
            </div>
            <span>Reviews</span>
            <span className="ml-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              {mentor.reviews?.length ?? mentor.totalReviews ?? 0}
            </span>
          </TabsTrigger>

          {/* 4. Articles Tab (Sky Blue Theme) */}
          <TabsTrigger
            value="blogs"
            className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 text-zinc-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white/60 dark:hover:bg-zinc-800/60
            data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-sky-600 dark:data-[state=active]:text-sky-400 data-[state=active]:shadow-md data-[state=active]:shadow-sky-500/10 data-[state=active]:border data-[state=active]:border-sky-500/30"
          >
            <div className="p-1 rounded-lg bg-sky-500/10">
              <BookOpen className="size-4 text-sky-500" />
            </div>
            <span>Articles</span>
            <span className="ml-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/20">
              {mentor.blogs?.length ?? 0}
            </span>
          </TabsTrigger>

        </TabsList>
      </div>

      {/* Tab Panels */}
      <TabsContent value="overview" className="mt-0 focus-visible:outline-hidden animate-in fade-in-50 duration-300">
        <OverviewTab bio={mentor.bio} expertiseTags={mentor.expertiseTags} />
      </TabsContent>

      <TabsContent value="schedules" className="mt-0 focus-visible:outline-hidden animate-in fade-in-50 duration-300">
        <SchedulesTab timezone={mentor.user.timezone} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-0 focus-visible:outline-hidden animate-in fade-in-50 duration-300">
        <ReviewsTab
          reviews={mentor.reviews || []}
          averageRatings={mentor.averageRatings}
          totalReviews={mentor.totalReviews}
        />
      </TabsContent>

      <TabsContent value="blogs" className="mt-0 focus-visible:outline-hidden animate-in fade-in-50 duration-300">
        <BlogsTab blogs={mentor.blogs || []} />
      </TabsContent>
    </Tabs>
  </div>

  {/* Right Column: Sticky Action & Social Proof (4 Cols) */}
  <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
    <MentorBookingCard
      sessionCharge={mentor.sessionCharge}
      linkedinURL={mentor.linkedinURL}
      portfolioURL={mentor.portfolioURL}
    />
  </div>
</div>
    </div>
  );
};

export default MentorDetailsView;