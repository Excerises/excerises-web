"use client";

import AdminStatCard, {
  AdminStatCardProps,
} from "@/components/admin/dashboard/stat-card";
import DifficultyDonut from "@/components/admin/dashboard/difficulty-donut";
import PopularExercises, {
  PopularExerciseItem,
} from "@/components/admin/dashboard/popular-exercises";
import RecentUsers from "@/components/admin/dashboard/recent-users";
import RegistrationChart from "@/components/admin/dashboard/registration-chart";
import AdminLayout from "@/components/admin/layout";
import { mockExercises } from "@/mockups/exercises";
import { mockUsers } from "@/mockups/users";
import {
  ActivityIcon,
  DumbbellIcon,
  LayersIcon,
  UsersIcon,
} from "lucide-react";
import { useMemo } from "react";

function parseDate(s?: string) {
  if (!s) return 0;
  return new Date(s.replace(" ", "T")).getTime() || 0;
}

export default function AdminPage() {
  const stats: AdminStatCardProps[] = useMemo(() => {
    const totalUsers = mockUsers.length;
    const totalExercises = mockExercises.length;
    const bodyParts = new Set(mockExercises.map((e) => e.body_part)).size;

    const latest = Math.max(...mockUsers.map((u) => parseDate(u.last_login)));
    const active = mockUsers.filter(
      (u) => latest - parseDate(u.last_login) <= 7 * 24 * 3600 * 1000,
    ).length;

    return [
      {
        label: "Total Users",
        value: String(totalUsers),
        icon: UsersIcon,
        trend: "+12%",
        subtitle: "vs bulan lalu",
      },
      {
        label: "Total Exercises",
        value: String(totalExercises),
        icon: DumbbellIcon,
        trend: "+4",
        subtitle: "bulan ini",
      },
      {
        label: "Body Parts",
        value: String(bodyParts),
        icon: LayersIcon,
        subtitle: "target otot ter-cover",
      },
      {
        label: "Active (7d)",
        value: String(active),
        icon: ActivityIcon,
        trend: "+8%",
        subtitle: "login 7 hari terakhir",
      },
    ];
  }, []);

  const difficulty = useMemo(() => {
    const lower = (s: string) => s.toLowerCase();
    return {
      beginner: mockExercises.filter((e) => lower(e.difficulty) === "beginner")
        .length,
      intermediate: mockExercises.filter(
        (e) => lower(e.difficulty) === "intermediate",
      ).length,
      advanced: mockExercises.filter((e) => lower(e.difficulty) === "advanced")
        .length,
    };
  }, []);

  const popular: PopularExerciseItem[] = useMemo(() => {
    const weight = (d: string) =>
      d.toLowerCase() === "advanced"
        ? 15
        : d.toLowerCase() === "intermediate"
          ? 8
          : 3;
    // TODO: ganti skor deterministik ini dengan viewed_count / completions dari API
    return [...mockExercises]
      .map((e, i) => ({
        id: e.id,
        title: e.title,
        category: e.category,
        bodyPart: e.body_part,
        difficulty: e.difficulty,
        completions: 120 - i * 7 + weight(e.difficulty),
        rating: 4.9 - (i % 5) * 0.15,
      }))
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 5);
  }, []);

  const recentUsers = useMemo(() => {
    return [...mockUsers]
      .sort((a, b) => parseDate(b.created_at) - parseDate(a.created_at))
      .slice(0, 5);
  }, []);

  return (
    <AdminLayout breadcrumbs={[["Dashboard"]]}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <AdminStatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RegistrationChart />
        </div>
        <DifficultyDonut {...difficulty} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PopularExercises items={popular} />
        </div>
        <RecentUsers users={recentUsers} />
      </div>
    </AdminLayout>
  );
}
