import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/types/model";
import Link from "next/link";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function RecentUsers({ users }: { users: User[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
        <CardDescription>User terbaru yang mendaftar</CardDescription>
        <CardAction>
          <Link
            href="/admin/users"
            className="text-xs font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {users.map((u) => (
            <li key={u.id} className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>{initials(u.name)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{u.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {u.email}
                </span>
              </div>
              <Badge
                variant={u.role === "admin" ? "default" : "secondary"}
                className="shrink-0 text-[11px]"
              >
                {u.role.toUpperCase()}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
