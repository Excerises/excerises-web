"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/layout";
import TopFilter from "@/components/admin/top-filter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockNotifications } from "@/mockups/notifications";
import { Notification } from "@/types/model";
import { BellIcon } from "lucide-react";

type GroupKey = "today" | "yesterday" | "older";

const GROUP_META: Record<GroupKey, { title: string }> = {
  today: { title: "Hari Ini" },
  yesterday: { title: "Kemarin" },
  older: { title: "Lebih Lama" },
};

function parseDate(value: string): Date {
  // Mendukung "YYYY-MM-DD HH:mm:ss" (mockup) dan ISO string
  return new Date(value.includes("T") ? value : value.replace(" ", "T"));
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function getGroupKey(createdAt: string, now: Date): GroupKey {
  const date = parseDate(createdAt);
  const todayStart = startOfDay(now).getTime();
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

  const time = startOfDay(date).getTime();
  if (time >= todayStart) return "today";
  if (time >= yesterdayStart) return "yesterday";
  return "older";
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

function NotificationRow({
  item,
  group,
}: {
  item: Notification;
  group: GroupKey;
}) {
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
            {group === "older"
              ? formatDateLabel(item.created_at)
              : formatTime(item.created_at)}
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
  const [query, setQuery] = useState("");
  const now = useMemo(() => new Date(), []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Sort: data baru di atas
    const sorted = [...mockNotifications].sort(
      (a, b) =>
        parseDate(b.created_at).getTime() - parseDate(a.created_at).getTime(),
    );

    const filtered = q
      ? sorted.filter((item) =>
          [item.title, item.description ?? "", item.user?.name ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
      : sorted;

    const result: Record<GroupKey, Notification[]> = {
      today: [],
      yesterday: [],
      older: [],
    };
    for (const item of filtered) {
      result[getGroupKey(item.created_at, now)].push(item);
    }
    return result;
  }, [query, now]);

  const total =
    groups.today.length + groups.yesterday.length + groups.older.length;
  const order: GroupKey[] = ["today", "yesterday", "older"];

  return (
    <AdminLayout breadcrumbs={[["Notification"]]}>
      <TopFilter
        searchPlaceholder="Search notifications..."
        value={query}
        onSearchChange={setQuery}
      />

      {total === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <BellIcon className="size-4" />
            </div>
            <p className="text-sm font-medium">Tidak ada notifikasi</p>
            <p className="text-xs text-muted-foreground">
              {query
                ? "Coba kata kunci lain."
                : "Semua notifikasi akan muncul di sini."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {order.map((key) =>
            groups[key].length > 0 ? (
              <section key={key} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold">
                    {GROUP_META[key].title}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {groups[key].length}
                  </Badge>
                </div>
                <Card>
                  <CardContent className="divide-y">
                    {groups[key].map((item) => (
                      <NotificationRow key={item.id} item={item} group={key} />
                    ))}
                  </CardContent>
                </Card>
              </section>
            ) : null,
          )}
        </div>
      )}
    </AdminLayout>
  );
}
