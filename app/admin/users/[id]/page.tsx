"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DataTable from "@/components/ui/table/data-table";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetUserDetail,
  useGetUserSessions,
} from "@/hooks/api/user/use-user-query";
import { AdminUserSessionExercise } from "@/types/api";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  Clock3,
  Dumbbell,
  KeyRound,
  MoreHorizontalIcon,
  Mail,
  Pencil,
  ShieldCheck,
  UserRoundX,
  XIcon,
} from "lucide-react";

type DetailTab = "detail" | "workout-history";

type WorkoutHistory = {
  id: string;
  name: string;
  sessionCount: number;
  duration: number;
  date: string;
  exercises: AdminUserSessionExercise[];
};

function displayValue(value?: string | null) {
  if (!value) return "-";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDuration(seconds?: number | null) {
  if (!seconds || seconds <= 0) return "-";
  const totalMinutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (totalMinutes > 0) return `${totalMinutes}m ${rest}s`;
  return `${rest}s`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { query: userQuery } = useGetUserDetail(params.id);
  const { query: sessionsQuery } = useGetUserSessions(params.id);
  const user = userQuery.data?.data;
  const [activeTab, setActiveTab] = useState<DetailTab>("detail");
  const [detailSession, setDetailSession] = useState<WorkoutHistory | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  function openDetail(session: WorkoutHistory) {
    setDetailSession(session);
    setDetailOpen(true);
  }

  const workoutHistory = useMemo<WorkoutHistory[]>(() => {
    const sessions = sessionsQuery.data?.data ?? [];
    const sessionCountByName = new Map<string, number>();

    sessions.forEach((session) => {
      const name = session.name ?? "Workout";
      sessionCountByName.set(name, (sessionCountByName.get(name) ?? 0) + 1);
    });

    return sessions.map((session) => {
      const name = session.name ?? "Workout";

      return {
        id: session.id,
        name,
        sessionCount: sessionCountByName.get(name) ?? 1,
        duration: session.duration ?? 0,
        date: session.created_at
          ? moment(session.created_at).format("DD MMM YYYY")
          : "-",
        exercises: session.exercises ?? [],
      };
    });
  }, [sessionsQuery.data?.data]);

  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, WorkoutHistory>> = [
    {
      accessorKey: "sessionCount",
      header: "Sessions",
      cell: (info) => (
        <span className="font-medium tabular-nums">
          {info.row.original.sessionCount} times
        </span>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: (info) => (
        <span className="text-muted-foreground tabular-nums">
          {formatDuration(info.row.original.duration)}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => (
        <span className="text-muted-foreground tabular-nums">
          {info.row.original.date}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button type="button" size="icon-xs" variant="ghost">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent className="w-auto">
            <DropdownMenuItem
              onClick={() => openDetail(info.row.original)}
            >
              Detail
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const stats = useMemo(() => {
    const categories = new Set(
      (sessionsQuery.data?.data ?? []).flatMap((session) =>
        (session.exercises ?? []).map((se) => se.exercise?.category ?? "-"),
      ),
    );
    return [
      {
        icon: Activity,
        label: "Total workouts",
        value: String(workoutHistory.length),
        hint: "Logged sessions",
      },
      {
        icon: Dumbbell,
        label: "Categories",
        value: String(categories.size),
        hint: [...categories].join(", ") || "-",
      },
      {
        icon: Clock3,
        label: "Last activity",
        value: workoutHistory[0]?.date ?? "-",
        hint: workoutHistory[0]?.name ?? "No activity yet",
      },
    ];
  }, [workoutHistory, sessionsQuery.data?.data]);

  if (userQuery.isLoading) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Detail"]]}>
        <div className="flex items-center justify-center py-24">
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Detail"]]}>
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <UserRoundX className="size-6 text-muted-foreground" />
            </span>
            <div className="space-y-1">
              <p className="font-medium">User tidak ditemukan</p>
              <p className="text-sm text-muted-foreground">
                ID yang kamu buka tidak cocok dengan data mana pun.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/users")}
            >
              <ArrowLeft className="size-4" />
              Kembali ke daftar
            </Button>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Detail"]]}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(`/admin/users/${user.id}/change-password`)
              }
            >
              <KeyRound className="size-4" />
              Change password
            </Button>
            <Button
              size="sm"
              onClick={() => router.push(`/admin/users/${user.id}/edit`)}
            >
              <Pencil className="size-4" />
              Edit user
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden pt-0">
          <div className="h-20 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent sm:h-24" />
          <CardContent className="-mt-8 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Avatar className="size-16 ring-4 ring-background">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight text-balance">
                    {user.name}
                  </h1>
                  <Badge variant={isAdmin ? "default" : "secondary"}>
                    {isAdmin ? <ShieldCheck className="size-3" /> : null}
                    {user.role.toUpperCase()}
                  </Badge>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    Member since {user.created_at ?? "-"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-3.5" />
                    Last login {user.last_login ?? "-"}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-lg bg-muted/60 px-3.5 py-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background shadow-xs ring-1 ring-foreground/10">
                    <s.icon className="size-4 text-foreground" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      {s.label}
                    </p>
                    <p className="truncate text-sm font-semibold tabular-nums">
                      {s.value}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as DetailTab)}
        >
          <TabsList variant="line" className="w-full justify-start">
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="workout-history">
              Workout history
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[11px]">
                {workoutHistory.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detail" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Account information</CardTitle>
                  <CardDescription>
                    Full account information for {user.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: user.email,
                      mono: false,
                      badge: false,
                    },
                    {
                      icon: ShieldCheck,
                      label: "Role",
                      value: user.role.toUpperCase(),
                      mono: false,
                      badge: true,
                    },
                    {
                      icon: Clock3,
                      label: "Last login",
                      value: user.last_login ?? "-",
                      mono: true,
                      badge: false,
                    },
                    {
                      icon: CalendarDays,
                      label: "Member since",
                      value: user.created_at ?? "-",
                      mono: true,
                      badge: false,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <row.icon className="size-4 text-muted-foreground" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          {row.label}
                        </p>
                        {row.badge ? (
                          <Badge
                            variant={isAdmin ? "default" : "secondary"}
                            className="mt-1 text-xs"
                          >
                            {row.value}
                          </Badge>
                        ) : (
                          <p
                            className={
                              row.mono
                                ? "truncate text-sm tabular-nums"
                                : "truncate text-sm"
                            }
                          >
                            {row.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Quick actions</CardTitle>
                  <CardDescription>
                    Manage this account in one click.
                  </CardDescription>
                </CardHeader>
                <CardContent className="gap-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                  >
                    <Pencil className="size-4" />
                    Edit profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      router.push(`/admin/users/${user.id}/change-password`)
                    }
                  >
                    <KeyRound className="size-4" />
                    Change password
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => router.push("/admin/users")}
                  >
                    <ArrowLeft className="size-4" />
                    All users
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workout-history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout history</CardTitle>
                <CardDescription>
                  Workout activities logged by {user.name}.
                </CardDescription>
                <CardAction>
                  <Badge variant="outline" className="tabular-nums">
                    {workoutHistory.length} sessions
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={workoutHistory}
                  features={features}
                  tableKey="user-workout-history-table"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {detailSession ? (
          <DialogPrimitive.Root open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Backdrop
                data-slot="workout-detail-backdrop"
                className="fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs"
              />
              <DialogPrimitive.Popup
                data-slot="workout-detail-content"
                className="fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col gap-3 overflow-hidden rounded-lg bg-popover bg-clip-padding p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none transition duration-200 ease-in-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <DialogPrimitive.Title
                      data-slot="workout-detail-title"
                      className="font-heading font-medium text-foreground"
                    >
                      {detailSession.name}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description
                      data-slot="workout-detail-description"
                      className="text-sm text-muted-foreground"
                    >
                      {detailSession.date} ·{" "}
                      {formatDuration(detailSession.duration)} ·{" "}
                      {detailSession.exercises.length} exercises
                    </DialogPrimitive.Description>
                  </div>
                  <DialogPrimitive.Close
                    render={
                      <Button type="button" variant="ghost" size="icon-sm" />
                    }
                  >
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>

                <div className="-mx-1 overflow-auto px-1">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Exercise</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Equipment</TableHead>
                        <TableHead className="text-right">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailSession.exercises.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center text-muted-foreground"
                          >
                            No exercises in this session.
                          </TableCell>
                        </TableRow>
                      ) : (
                        detailSession.exercises.map((se) => (
                          <TableRow key={se.id}>
                            <TableCell className="font-medium">
                              {displayValue(se.exercise?.name)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {displayValue(se.exercise?.body_part)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {displayValue(se.exercise?.target)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {displayValue(se.exercise?.equipment)}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground">
                              {formatDuration(se.duration)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </DialogPrimitive.Popup>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        ) : null}
      </div>
    </AdminLayout>
  );
}