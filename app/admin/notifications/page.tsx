"use client";

import moment from "moment";
import { useMemo } from "react";
import AdminLayout from "@/components/admin/layout";
import TopFilter from "@/components/admin/top-filter";
import { Card, CardContent } from "@/components/ui/card";
import { Notification } from "@/types/model";
import { BellIcon } from "lucide-react";
import { useGetNotifications } from "@/hooks/api/notification/use-notification-query";
import { NoRecord } from "@/components/admin/no-record";
import { Spinner } from "@/components/ui/spinner";

function parseDate(value: string): Date {
  return new Date(value.includes("T") ? value : value.replace(" ", "T"));
}

function formatTime(createdAt: string): string {
  const date = parseDate(createdAt);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDateLabel(createdAt: string): string {
  const date = parseDate(createdAt);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${formatTime(createdAt)}`;
}

function NotificationRow({ item }: { item: Notification }) {
  const unread = !item.readed_at;

  return (
    <div className="flex items-start gap-3 py-3 first:pt-1 last:pb-1">
      <div className="relative shrink-0">
        <div
          className={
            unread
              ? "flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"
              : "flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
          }
        >
          <BellIcon className="size-4" />
        </div>
        {unread && (
          <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary ring-2 ring-background" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm ${unread ? "font-semibold" : "font-medium"}`}>
            {item.title}
          </p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {moment(item.created_at).isSame(moment(), "day")
              ? formatTime(item.created_at)
              : formatDateLabel(item.created_at)}
          </span>
        </div>
        {item.description && (
          <p className="truncate text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const {
    query: notificationsQuery,
    search,
    setSearch,
    debouncedSearch,
  } = useGetNotifications();

  const filtered = useMemo(
    () =>
      (notificationsQuery.data?.data || []).filter((n) =>
        [n.title, n.description]
          .join("")
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()),
      ),
    [notificationsQuery.data?.data],
  );

  return (
    <AdminLayout breadcrumbs={[["Notification"]]}>
      <TopFilter
        searchPlaceholder="Search notifications..."
        searchValue={search}
        onSearchChange={setSearch}
      />

      {notificationsQuery.isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : filtered.length === 0 ? (
        <NoRecord icon={BellIcon} message="No notifications yet." />
      ) : (
        <div className="flex flex-col gap-2">
          <Card>
            <CardContent className="divide-y">
              {filtered.map((notification) => (
                <NotificationRow key={notification.id} item={notification} />
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLayout>
  );
}
