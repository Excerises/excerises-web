import { api } from "@/network/api";
import { ApiResponse, ProfileProgressResponse } from "@/types/api";
import { User } from "@/types/model";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile() {
  const query = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<User>>("/profile");

      return res.data;
    },
    retry: false,
  });

  return { query };
}

export function useGetProfileProgress() {
  const query = useQuery({
    queryKey: ["get-profile-progress"],
    queryFn: async () => {
      const res =
        await api.client.get<ApiResponse<ProfileProgressResponse>>(
          "/profile/progress",
        );
      return res.data;
    },
  });

  return { query };
}
