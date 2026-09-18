import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import React, { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <Header />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
