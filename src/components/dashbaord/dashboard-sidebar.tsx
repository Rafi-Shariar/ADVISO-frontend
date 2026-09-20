"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "../layout/public/Logo"
import { UserRole } from "@/types/auth.type"
import { adminRoutes, mentorRoutes, userRoutes } from "@/routes"
import { SidebarItems } from "@/types/sidebar.type"
import { usePathname } from "next/navigation"



const sidebarRoutes : Record<UserRole, SidebarItems> = {
  SUPER_ADMIN : adminRoutes,
  ADMIN : adminRoutes,
  MENTOR: mentorRoutes,
  USER: userRoutes
}

export function DashbaordSidebar({role} : {role : UserRole}) {

  const routes : SidebarItems = sidebarRoutes[role]
  const pathname = usePathname()
  return (
    <Sidebar >
      <SidebarHeader>
        <Logo/>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === pathname}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
