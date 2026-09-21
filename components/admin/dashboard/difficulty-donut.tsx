"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import ReactApexChart from "react-apexcharts";

export default function DifficultyDonut({
  beginner,
  intermediate,
  advanced,
}: {
  beginner: number;
  intermediate: number;
  advanced: number;
}) {
  const { theme } = useTheme();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>By Difficulty</CardTitle>
        <CardDescription>Distribusi level kesulitan exercise</CardDescription>
      </CardHeader>
      <CardContent>
        <ReactApexChart
          height={260}
          type="donut"
          series={[beginner, intermediate, advanced]}
          options={{
            theme: { mode: theme === "dark" ? "dark" : "light" },
            chart: { background: "transparent", type: "donut" },
            labels: ["Beginner", "Intermediate", "Advanced"],
            legend: { position: "bottom" },
            dataLabels: { enabled: false },
            plotOptions: {
              pie: { donut: { size: "68%" } },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
