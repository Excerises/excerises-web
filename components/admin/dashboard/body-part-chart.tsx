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

export default function BodyPartChart({
  labels,
  counts,
}: {
  labels: string[];
  counts: number[];
}) {
  const { theme } = useTheme();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>By Body Part</CardTitle>
        <CardDescription>Jumlah exercise per target otot</CardDescription>
      </CardHeader>
      <CardContent>
        <ReactApexChart
          height={260}
          type="bar"
          series={[{ name: "Exercises", data: counts }]}
          options={{
            theme: { mode: theme === "dark" ? "dark" : "light" },
            chart: { background: "transparent", type: "bar", toolbar: { show: false } },
            plotOptions: {
              bar: { horizontal: true, borderRadius: 6, barHeight: "55%" },
            },
            dataLabels: { enabled: false },
            xaxis: { categories: labels },
          }}
        />
      </CardContent>
    </Card>
  );
}
