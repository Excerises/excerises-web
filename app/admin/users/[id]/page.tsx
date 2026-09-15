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
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DataTable from "@/components/ui/table/data-table";
import { mockUsers } from "@/mockups/users";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  Clock3,
  Dumbbell,
  KeyRound,
  Mail,
  Pencil,
  ShieldCheck,
  UserRoundX,
} from "lucide-react";

type DetailTab = "detail" | "workout-history";

type WorkoutHistory = {
  id: number;
  workoutName: string;
  target: string;
  bodyPart: string;
  equipment: string;
  category: string;
  date: string;
};

// TODO: replace with real data from mockups/workout-history or an API,
// filtered by user.id
const mockWorkoutHistory: WorkoutHistory[] = [
  {
    id: 1,
    workoutName: "Bench Press",
    target: "Chest",
    bodyPart: "Upper",
    equipment: "Barbell",
    category: "Strength",
    date: "15 Sep 2026",
  },
  {
    id: 2,
    workoutName: "Squat",
    target: "Quads",
    bodyPart: "Lower",
    equipment: "Barbell",
    category: "Strength",
    date: "14 Sep 2026",
  },
  {
    id: 3,
    workoutName: "Bicep Curl",
    target: "Biceps",
    bodyPart: "Upper",
    equipment: "Dumbbell",
    category: "Strength",
    date: "13 Sep 2026",
  },
];

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
  const user = mockUsers.find((u) => String(u.id) === params.id);
  const [activeTab, setActiveTab] = useState<DetailTab>("detail");

  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, WorkoutHistory>> = [
    {
      accessorKey: "workoutName",
      header: "Workout",
      cell: (info) => (
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
            <Dumbbell className="size-4 text-muted-foreground" />
          </span>
          <strong className="font-medium">
            {info.row.original.workoutName}
          </strong>
        </div>
      ),
    },
    {
      accessorKey: "target",
      header: "Target",
      cell: (info) => (
        <span className="text-muted-foreground">
          {info.row.original.target}
        </span>
      ),
    },
    {
      accessorKey: "bodyPart",
      header: "Body Part",
      cell: (info) => (
        <span className="text-muted-foreground">
          {info.row.original.bodyPart}
        </span>
      ),
    },
    {
      accessorKey: "equipment",
      header: "Equipment",
      cell: (info) => (
        <span className="text-muted-foreground">
          {info.row.original.equipment}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) => (
        <Badge variant="secondary" className="text-xs">
          {info.row.original.category}
        </Badge>
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
  ];

  const stats = useMemo(() => {
    const categories = new Set(mockWorkoutHistory.map((w) => w.category));
    return [
      {
        icon: Activity,
        label: "Total workouts",
        value: String(mockWorkoutHistory.length),
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
        value: mockWorkoutHistory[0]?.date ?? "-",
        hint: mockWorkoutHistory[0]?.workoutName ?? "No activity yet",
      },
    ];
  }, []);

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
                {mockWorkoutHistory.length}
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
                    {mockWorkoutHistory.length} sessions
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={mockWorkoutHistory}
                  features={features}
                  tableKey="user-workout-history-table"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}