"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const resetScroll = () => {
      // উইন্ডো স্ক্রল থাকলে রিসেট
      window.scrollTo(0, 0);

      // আপনার টেস্ট করা সেই লজিক: DOM-এর যে ডিভটাই স্ক্রল হয়ে থাকবে, তাকে 0 করবে
      document.querySelectorAll("*").forEach((el) => {
        if (el.scrollTop > 0) {
          el.scrollTop = 0;
        }
      });
    };

    // তাৎক্ষণিক স্ক্রল
    resetScroll();

    // Next.js রাউট ট্রানজিশন ও ডেটা ফেচ সম্পন্ন হওয়ার ঠিক পরের টিক-এ নিশ্চিত করা
    const timer = setTimeout(resetScroll, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
