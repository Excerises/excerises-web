"use client";

import AdminStatCard, {
  AdminStatCardProps,
} from "@/components/admin/dashboard/stat-card";
import DifficultyDonut from "@/components/admin/dashboard/difficulty-donut";
import PopularExercises from "@/components/admin/dashboard/popular-exercises";
import RecentUsers from "@/components/admin/dashboard/recent-users";
import RegistrationChart from "@/components/admin/dashboard/registration-chart";
import AdminLayout from "@/components/admin/layout";
import { DumbbellIcon, LayersIcon, UsersIcon } from "lucide-react";
import { useMemo } from "react";
import {
  useGetDashboardPopularExercises,
  useGetDashboardStat,
  useGetDashboardUserRegistrations,
} from "@/hooks/api/dashboard/use-dashboard-query";
import { DashboardPopularExercise } from "@/types/api";

export default function AdminPage() {
  const { query: statQuery } = useGetDashboardStat();
  const { query: userQuery } = useGetDashboardUserRegistrations();
  const { query: exerciseQuery } = useGetDashboardPopularExercises();

  const stats: AdminStatCardProps[] = useMemo(() => {
    if (!statQuery.data) {
      return [];
    }

    const { total_users, total_exercises, total_body_parts } =
      statQuery.data!.data;

    return [
      {
        label: "Total Users",
        value: String(total_users),
        icon: UsersIcon,
      },
      {
        label: "Total Exercises",
        value: String(total_exercises),
        icon: DumbbellIcon,
      },
      {
        label: "Body Parts",
        value: String(total_body_parts),
        icon: LayersIcon,
      },
    ];
  }, [statQuery.data]);

  const difficulty = useMemo(() => {
    return {
      beginner:
        statQuery.data?.data.exercise_level_distribution.dataset[0] || 0,
      intermediate:
        statQuery.data?.data.exercise_level_distribution.dataset[1] || 0,
      advanced:
        statQuery.data?.data.exercise_level_distribution.dataset[2] || 0,
    };
  }, [statQuery.data]);

  const popular: DashboardPopularExercise[] = useMemo(() => {
    return exerciseQuery.data?.data || [];
  }, [exerciseQuery.data]);

  const recentUsers = useMemo(() => {
    return userQuery.data?.data.recent_users || [];
  }, [userQuery.data]);

  return (
    <AdminLayout breadcrumbs={[["Dashboard"]]}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <AdminStatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RegistrationChart
            dataset={
              userQuery.data?.data.dataset || [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ]
            }
          />
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
