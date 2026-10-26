import { api } from "@/network/api";
import {
  ApiResponse,
  DashboardPopularExercise,
  DashboardStat,
  DashboardUserRegistrations,
} from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export function useGetDashboardStat() {
  const query = useQuery({
    queryKey: ["get-dashboard-stat"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<DashboardStat>>(
        "/admin/dashboard/stat",
      );
      return res.data;
    },
  });

  return { query };
}

export function useGetDashboardUserRegistrations() {
  const query = useQuery({
    queryKey: ["get-dashboard-user-registrations"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<DashboardUserRegistrations>>(
        "/admin/dashboard/user-registrations",
      );
      return res.data;
    },
  });

  return { query };
}

export function useGetDashboardPopularExercises() {
  const query = useQuery({
    queryKey: ["get-dashboard-popular-exercises"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<DashboardPopularExercise[]>>(
        "/admin/dashboard/popular-exercises",
      );
      return res.data;
    },
  });

  return { query };
}
