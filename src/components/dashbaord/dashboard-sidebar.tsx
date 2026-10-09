"use client";

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

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  MENTOR: mentorRoutes,
  USER: userRoutes,
};

export function DashbaordSidebar({ role }: { role: UserRole }) {
  const routes: SidebarItems = sidebarRoutes[role] || [];
  const pathname = usePathname();

  return (
    <Sidebar className="bg-orange-300">
      <SidebarHeader>
        <Logo size="md" />
      </SidebarHeader>
      
      <Separator />

      {/* Main scrollable navigation */}
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
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
                        <Link href={subItem.url}>{subItem.title}</Link>
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
  );
}