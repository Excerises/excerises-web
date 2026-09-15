"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataTable from "@/components/ui/table/data-table";
import { mockUsers } from "@/mockups/users";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import { cn } from "cn";

type DetailTab = "detail" | "workout-history";

const tabs: Array<{ id: DetailTab; label: string }> = [
  { id: "detail", label: "Detail" },
  { id: "workout-history", label: "Workout History" },
];

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

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const user = mockUsers.find((u) => String(u.id) === params.id);
  const [activeTab, setActiveTab] = useState<DetailTab>("detail");

  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, WorkoutHistory>> = [
    {
      accessorKey: "workoutName",
      header: "Workout Name",
      cell: (info) => <strong>{info.row.original.workoutName}</strong>,
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
        <span className="text-muted-foreground">
          {info.row.original.date}
        </span>
      ),
    },
  ];

  if (!user) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Detail"]]}>
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            User not found.
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Detail"]]}>
      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "detail" && (
        <Card>
          <CardHeader>
            <CardTitle>User Detail</CardTitle>
            <CardDescription>
              Full account information for {user.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Name</span>
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Email</span>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Role</span>
                <div>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {user.role.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Last Login</span>
                <span className="text-sm text-muted-foreground">
                  {user.last_login ?? "-"}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Member Since</span>
                <span className="text-sm text-muted-foreground">
                  {user.created_at ?? "-"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2 pt-4">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button
              onClick={() => router.push(`/admin/users/${user.id}/edit`)}
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === "workout-history" && (
        <Card>
          <CardHeader>
            <CardTitle>Workout History</CardTitle>
            <CardDescription>
              Workout activities logged by {user.name}.
            </CardDescription>
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
      )}
    </AdminLayout>
  );
}