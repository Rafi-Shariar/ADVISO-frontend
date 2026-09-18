"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogIn, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMe, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useUserStore } from "@/store/useUserStore";

const routes = [
  { name: "Mentors", url: "/mentors" },
  { name: "Blogs", url: "/blogs" },
  { name: "About us", url: "/about-us" },
  { name: "Contact", url: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { removeUser, setUser, user: currentUser } = useUserStore();

  const { data: user, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    const userData = user?.data;

    if (userData) {
      const stateData = {
        id: userData.userId || userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profileURL:
          userData?.profileURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            userData.name || "User"
          )}&background=ea580c&color=fff&bold=true`,
      };
      setUser(stateData);
    }
  }, [user, setUser]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful.");
        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["currentUser"] });
        queryClient.clear();
        removeUser();
      },
      onError: () => {
        toast.error("Something went wrong. Try again.");
      },
    });
  };

  const activeUser = currentUser || user?.data;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Logo size="md" />
        </div>

        {/* Center: Absolute Centered Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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
                    : "text-muted-foreground"
                )}
              >
                {route.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & User Profile / Login */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggleButton />

          {isLoading ? (
            <Skeleton className="size-9 rounded-[12px] bg-muted" />
          ) : !activeUser ? (
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full px-4 py-2 gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all dark:bg-orange-600 dark:hover:bg-orange-700 cursor-pointer"
              >
                <LogIn className="size-4" />
                <span>Login</span>
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 p-1 rounded-[12px] hover:bg-muted/80 border border-transparent hover:border-border/60 transition-all outline-none cursor-pointer select-none"
                >
                  <div className="relative size-10 rounded-full overflow-hidden bg-muted border border-border/60">
                    <Image
                      src={
                        activeUser.profileURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          activeUser.name || "User"
                        )}&background=ea580c&color=fff&bold=true`
                      }
                      alt={activeUser.name || "User"}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-[12px] p-1.5 border-border/60 shadow-lg bg-popover"
              >
                {/* User Details */}
                <DropdownMenuLabel className="font-normal px-2.5 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-xs font-bold text-foreground truncate">
                      {activeUser.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {activeUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-border/50" />

                {/* Dashboard Option */}
                <DropdownMenuItem asChild className="rounded-[8px] cursor-pointer">
                  <Link
                    href={activeUser.role === "ADMIN" ? "/admin" : "/dashboard"}
                    className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <LayoutDashboard className="size-3.5" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/50" />

                {/* Logout Option */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-[8px] cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="size-3.5" />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;