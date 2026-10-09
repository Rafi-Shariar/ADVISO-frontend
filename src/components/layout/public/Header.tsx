"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LogIn,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Menu,
  Sparkles,
  ArrowRight,
} from "lucide-react";

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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            userData.name || "User",
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
        setMobileMenuOpen(false);
      },
      onError: () => {
        toast.error("Something went wrong. Try again.");
      },
    });
  };

  const activeUser = currentUser || user?.data;

  const dashboardRoute = currentUser
    ? currentUser.role === "USER"
      ? "/user"
      : currentUser.role === "MENTOR"
        ? "/mentor"
        : "/admin"
    : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* Left: Mobile Slider Trigger & Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-foreground hover:bg-muted/80"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              {/* 75% Width Slide-over Drawer */}
              <SheetContent
                side="left"
                className="w-[75vw] max-w-[320px] p-0 flex flex-col justify-between border-r border-border/60 bg-background/95 backdrop-blur-2xl"
              >
                {/* Top Half: Logo & Navlinks */}
                <div className="flex flex-col overflow-y-auto">
                  <SheetHeader className="p-5 border-b border-border/40 text-left">
                    <SheetTitle>
                      <Logo size="md" />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="p-4 space-y-1">
                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Navigation
                    </p>

                    {routes.map((route) => {
                      const isActive = pathname === route.url;
                      return (
                        <Link
                          key={route.name}
                          href={route.url}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                            isActive
                              ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold"
                              : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                          )}
                        >
                          <span>{route.name}</span>
                          {isActive && (
                            <span className="size-1.5 rounded-full bg-orange-500" />
                          )}
                        </Link>
                      );
                    })}

                    {currentUser && currentUser.role === "USER" && (
                      <div className="pt-3">
                        <Link
                          href="/apply-as-mentor"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            variant="outline"
                            className=" justify-between rounded-[12px] border-orange-500/40 p-4 text-orange-600 hover:bg-orange-500 hover:text-white dark:text-orange-400 text-xs font-bold px-3.5"
                          >
                            <span className="flex items-center gap-2">
                              Become a mentor
                            </span>
                            <ArrowRight className="size-3.5" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Half: User Info, Dashboard & Auth Actions */}
                <div className="p-4 border-t border-border/40 bg-muted/20 space-y-3">
                  {isLoading ? (
                    <div className="flex items-center gap-3 p-2">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-32" />
                      </div>
                    </div>
                  ) : activeUser ? (
                    <div className="space-y-3">
                      {/* User Profile Tile */}
                      <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-card border border-border/60 shadow-xs">
                        <div className="relative size-10 rounded-full overflow-hidden bg-muted border border-border/60 shrink-0">
                          <Image
                            src={
                              activeUser.profileURL ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                activeUser.name || "User",
                              )}&background=ea580c&color=fff&bold=true`
                            }
                            alt={activeUser.name || "User"}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-foreground truncate">
                            {activeUser.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {activeUser.email}
                          </p>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="space-y-1.5">
                        <Link
                          href={dashboardRoute}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start rounded-xl gap-2 text-xs font-medium border-border/60 py-6"
                          >
                            <LayoutDashboard className="size-3.5 text-orange-500" />
                            <span>Go to Dashboard</span>
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full justify-start rounded-xl gap-2 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive py-6"
                        >
                          <LogOut className="size-3.5" />
                          <span>
                            {isLoggingOut ? "Logging out..." : "Log out"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20 gap-2">
                        <LogIn className="size-4" />
                        <span>Sign In</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Logo size="md" />
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-md shadow-xs">
          {routes.map((route) => {
            const isActive = pathname === route.url;
            return (
              <Link
                key={route.name}
                href={route.url}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {route.name}
              </Link>
            );
          })}

          {currentUser && currentUser.role === "USER" && (
            <Link href="/apply-as-mentor">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 rounded-full px-3 ml-1"
              >
                Become a mentor
              </Button>
            </Link>
          )}
        </nav>

        {/* Right: Theme Toggle & Desktop Auth/Profile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggleButton />

          {isLoading ? (
            <Skeleton className="size-9 rounded-full bg-muted" />
          ) : !activeUser ? (
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full px-4 h-9 gap-1.5 bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all font-semibold text-xs cursor-pointer"
              >
                <LogIn className="size-3.5" />
                <span>Login</span>
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-orange-500/30 transition-all outline-none cursor-pointer select-none"
                >
                  <div className="relative size-9 rounded-full overflow-hidden bg-muted border border-border/80 shadow-xs">
                    <Image
                      src={
                        activeUser.profileURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          activeUser.name || "User",
                        )}&background=ea580c&color=fff&bold=true`
                      }
                      alt={activeUser.name || "User"}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <ChevronDown className="size-3 text-muted-foreground hidden sm:block" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl p-1.5 border-border/60 shadow-xl bg-popover"
              >
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

                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link
                    href={dashboardRoute}
                    className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <LayoutDashboard className="size-3.5" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/50" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-xl cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
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
