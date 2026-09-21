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

export default function RegistrationChart() {
  const { theme } = useTheme();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>User Registrations</CardTitle>
        <CardDescription>Sign-ups per bulan tahun ini</CardDescription>
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
                  210, 380, 340, 520, 480, 610, 700, 880, 820, 1040, 1180, 1520,
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
                toolbar: { show: false },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: { curve: "smooth", width: 2 },
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
  );
}
