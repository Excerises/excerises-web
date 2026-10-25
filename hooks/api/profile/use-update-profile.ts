import { useMutation } from "@tanstack/react-query";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/model";

export function useUpdateProfile() {
  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (req: never) => {
      const res = await api.client.patch<ApiResponse<User>>("/profile", req);
      return res.data;
    },
  });

  return { mutation };
}
