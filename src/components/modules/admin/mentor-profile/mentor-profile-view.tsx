"use client";

import { useMentorDetailsAdmin } from "@/hooks/mentor.hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserCheck, Info, Star, BookOpen } from "lucide-react";
import { ProfileHeroHeader } from "./mentor-profile-header";
import { MentorInfoTab } from "./mentor-info-tab";
import { MentorReviewsTab } from "./mentor-review-tab";
import { MentorBlogsTab } from "./mentor-blog-tab";

interface MentorProfileViewProps {
  id: string;
}

const MentorProfileView = ({ id }: MentorProfileViewProps) => {
  const { data, isPending } = useMentorDetailsAdmin(id);
  const profile = data?.data;

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-3">
        <div className="size-10 rounded-full border-[3px] border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="text-xs font-medium text-muted-foreground animate-pulse tracking-wide">
          Fetching mentor dossier...
        </p>
      </div>
    );
  }

  if (!profile || !profile.user) {
    return (
      <div className="max-w-2xl mx-auto my-24 p-8 rounded-3xl border border-dashed border-border text-center space-y-3 bg-muted/10">
        <UserCheck className="size-10 mx-auto text-muted-foreground/60" />
        <h3 className="text-lg font-semibold text-foreground">Mentor Not Found</h3>
        <p className="text-sm text-muted-foreground">The mentor profile does not exist or may have been deactivated.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* 🌟 1. Top Executive Profile & Stats Header */}
      <ProfileHeroHeader profile={profile} />

      {/* 📑 2. Modern Tabs Navigation */}
      <Tabs defaultValue="info" className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/50 h-auto gap-1">
            <TabsTrigger
              value="info"
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
            >
              <Info className="size-3.5 text-orange-500" />
              <span>Overview & Dossier</span>
            </TabsTrigger>

            <TabsTrigger
              value="reviews"
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
            >
              <Star className="size-3.5 text-amber-500" />
              <span>Reviews ({profile.reviews?.length ?? profile.totalReviews ?? 0})</span>
            </TabsTrigger>

            <TabsTrigger
              value="blogs"
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
            >
              <BookOpen className="size-3.5 text-sky-500" />
              <span>Articles & Blogs ({profile.blogs?.length ?? 0})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Info */}
        <TabsContent value="info" className="mt-0 focus-visible:outline-hidden">
          <MentorInfoTab profile={profile} />
        </TabsContent>

        {/* Tab 2: Reviews */}
        <TabsContent value="reviews" className="mt-0 focus-visible:outline-hidden">
          <MentorReviewsTab
            reviews={profile.reviews || []}
            averageRatings={profile.averageRatings}
            totalReviews={profile.totalReviews}
            totalSessions={profile.totalSessionsCompleted}
          />
        </TabsContent>

        {/* Tab 3: Blogs */}
        <TabsContent value="blogs" className="mt-0 focus-visible:outline-hidden">
          <MentorBlogsTab blogs={profile.blogs || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorProfileView;