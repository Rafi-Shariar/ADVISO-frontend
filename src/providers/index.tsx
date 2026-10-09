"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google.provider";
import { ThemeProvider } from "./ThemeProvider";
import SmoothScrollProvider from "./smooth-scroll-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <SmoothScrollProvider>
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </SmoothScrollProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
