"use client";

import AdminStatCard, {
  AdminStatCardProps,
} from "@/components/admin/dashboard/stat-card";
import AdminLayout from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DumbbellIcon, UsersIcon } from "lucide-react";
import { useTheme } from "next-themes";
import ReactApexChart from "react-apexcharts";

export default function AdminPage() {
  const { theme } = useTheme();

  const stats: AdminStatCardProps[] = [
    {
      label: "Users",
      value: "675",
      icon: UsersIcon,
    },
    {
      label: "Excercises",
      value: "2500",
      icon: DumbbellIcon,
    },
  ];

  return (
    <AdminLayout breadcrumbs={[["Dashboard"]]}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <AdminStatCard key={i} {...stat} />
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-80 overflow-hidden rounded">
            <ReactApexChart
              height={350}
              type="area"
              series={[
                {
                  name: "Sign-ups",
                  data: [
                    210, 380, 340, 520, 480, 610, 700, 880, 820, 1040, 1180,
                    1520,
                  ],
                },
              ]}
              options={{
                theme: {
                  mode: theme === "dark" ? "dark" : "light",
                },
                chart: {
                  background: "transparent",
                  height: 350,
                  type: "area",
                  zoom: {
                    enabled: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
