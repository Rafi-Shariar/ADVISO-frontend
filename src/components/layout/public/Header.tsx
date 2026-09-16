"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogIn, LogOut, LayoutDashboard } from "lucide-react";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMe, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "./ThemeToggleButton";

const routes = [
  { name: "Mentors", url: "/mentors" },
  { name: "Blogs", url: "/blogs" },
  { name: "About us", url: "/about-us" },
  { name: "Contact", url: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful.");
        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.clear();
      },
      onError: () => {
        toast.error("Something went wrong. Try again.");
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Logo size="md" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {routes.map((route) => {
            const isActive = pathname === route.url;
            return (
              <Link
                key={route.name}
                href={route.url}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400",
                  isActive
                    ? "text-orange-600 dark:text-orange-400 font-semibold"
                    : "text-muted-foreground",
                )}
              >
                {route.name}
              </Link>
            );
          })}
        </nav>

            <ThemeToggleButton/>


        {/* Auth / Action Controls */}
        <div className="flex items-center gap-3">



          {isLoading ? (
            <Skeleton className="h-10 w-24 rounded-full bg-muted" />
          ) : !user ? (
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full px-5 py-4 gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                <LogIn className="size-4" />
                <span>Login</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={user?.role === "ADMIN" ? "/admin" : "/dashboard"}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-2 border-border/80 hover:border-orange-500 hover:text-orange-600 dark:border-border dark:hover:border-orange-400 dark:hover:text-orange-400"
                >
                  <LayoutDashboard className="size-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-full gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">
                  {isLoggingOut ? "Leaving..." : "Logout"}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
