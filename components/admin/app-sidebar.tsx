"use client";

import * as React from "react";
import { Bell, DatabaseIcon, LayoutIcon, Settings2, User } from "lucide-react";

import { NavMain, type NavMainItem } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "../logo";
import { APP_NAME } from "@/constant/app";

const data: {
  user: { name: string; email: string; avatar: string };
  navMain: NavMainItem[];
} = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      icon: LayoutIcon,
      title: "Dashboard",
      url: "/",
    },
    {
      title: "Master Data",
      url: "/",
      icon: DatabaseIcon,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Exercises",
          url: "/exercises",
        },
        {
          title: "News",
          url: "/news",
        },
      ],
    },
    // {
    //   title: "Assistant",
    //   url: "/assistant",
    //   icon: Bot,
    // },
    {
      title: "Notification",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
      ],
    },
    {
      title: "Account",
      url: "/account",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 py-3">
          <div className="size-6 relative">
            <Logo />
          </div>
          <div className="text-xl font-semibold text-primary truncate min-w-0">
            {APP_NAME}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
