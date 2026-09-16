"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google.provider";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        </QueryProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
