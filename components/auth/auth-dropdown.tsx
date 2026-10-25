/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ComponentRenderFn, HTMLProps, MenuTriggerState } from "@base-ui/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { BadgeCheck, Bell, LogOut, Monitor } from "lucide-react";
import ConfirmDialog from "../ui/confirm-dialog";

export type AuthDropdownProps = {
  renderTrigger?:
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | ComponentRenderFn<HTMLProps, MenuTriggerState>
    | undefined;
};

export function AuthDropdown({ renderTrigger }: AuthDropdownProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const avatarFallback = user?.name.slice(0, 2).toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            renderTrigger || (
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            )
          }
        />
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {user?.role == "admin" && (
              <DropdownMenuItem render={<Link href="/admin"></Link>}>
                <Monitor />
                Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem render={<Link href="/admin/account"></Link>}>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href="/admin/notifications"></Link>}
            >
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Log out?"
        description="Are you sure you want to log out?"
        cancelText="Cancel"
        confirmText="Log out"
        confirmVariant="destructive"
        onConfirm={() => {}}
      />
    </>
  );
}
