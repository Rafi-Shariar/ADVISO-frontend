"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "../layout/public/Logo";
import { UserRole } from "@/types/auth.type";
import { adminRoutes, mentorRoutes, userRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.type";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "../ui/separator";
import LogoutButton from "../layout/public/logout-button";

import { useUserStore } from "@/store/useUserStore"; // User email er jonno
import { ResetPasswordModal } from "../auth/forgot-password-modal";

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  MENTOR: mentorRoutes,
  USER: userRoutes,
};

export function DashbaordSidebar({ role }: { role: UserRole }) {
  const routes: SidebarItems = sidebarRoutes[role] || [];
  const pathname = usePathname();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { user } = useUserStore();

  return (
    <>
      <Sidebar className="bg-orange-300">
        <SidebarHeader>
          <Logo size="md" />
        </SidebarHeader>

        <Separator />

        {/* Main scrollable navigation */}
        <SidebarContent>
          {routes.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel><span className="text-orange-600 font-semibold">{item.title}</span></SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => {
                    const isChangePassword = subItem.url === "/password";
                    const isActive = pathname === subItem.url;

                    return (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={
                            isActive
                              ? "!bg-orange-500 !text-white font-semibold shadow-sm hover:!bg-orange-100/80"
                              : "hover:bg-orange-200/60 transition-colors"
                          }
                        >
                          {isChangePassword ? (
                            <button
                              type="button"
                              onClick={() => setIsPasswordModalOpen(true)}
                              className="w-full text-left"
                            >
                              {subItem.title}
                            </button>
                          ) : (
                            <Link href={subItem.url}>{subItem.title}</Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Bottom Sticky Section */}
        <SidebarFooter className="border-t border-border/40 p-3">
          <LogoutButton className="hover:text-red-600" />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Password Reset Modal */}
      <ResetPasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        defaultEmail={user?.email || ""}
      />
    </>
  );
}
