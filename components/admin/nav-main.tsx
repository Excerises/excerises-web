"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export type NavSubItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

export type NavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
};

const p = (path: string) => `/admin${path.startsWith("/") ? path : `/${path}`}`;

function isPathActive(pathname: string, url: string) {
  const href = p(url);
  if (href === "/admin/")
    return pathname === "/admin" || pathname === "/admin/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavCollapsibleItem({
  item,
  pathname,
}: {
  item: NavMainItem;
  pathname: string;
}) {
  const subActive = (sub: NavSubItem) =>
    sub.isActive ?? isPathActive(pathname, sub.url);
  const hasActiveChild = item.items?.some(subActive) ?? false;
  const buttonActive = item.isActive ?? hasActiveChild;
  const shouldOpen = buttonActive;

  const [open, setOpen] = React.useState(shouldOpen);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (shouldOpen) setOpen(true);
  }, [shouldOpen, pathname]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
      render={
        <SidebarMenuItem>
          <CollapsibleTrigger
            render={
              <SidebarMenuButton
                tooltip={item.title}
                isActive={buttonActive}
                className={buttonActive ? "" : ""}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            }
          />
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    isActive={subActive(subItem)}
                    className={subActive(subItem) ? "" : ""}
                    render={
                      <Link href={p(subItem.url)}>
                        <span>{subItem.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      }
    />
  );
}

export function NavMain({ items }: { items: NavMainItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <NavCollapsibleItem
              key={item.title}
              item={item}
              pathname={pathname}
            />
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive ?? isPathActive(pathname, item.url)}
                className={isPathActive(pathname, item.url) ? "" : ""}
                render={
                  <Link href={p(item.url)}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                }
              ></SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
