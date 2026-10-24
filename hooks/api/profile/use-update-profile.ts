import { useMutation } from "@tanstack/react-query";
import { UpdateProfileRequest } from "../../../../type/api/profile/update-profile";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { User } from "../../../../type/entity";

export function useUpdateProfile() {
  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (req: UpdateProfileRequest) => {
      const res = await api.client.patch<ApiResponse<User>>("/profile", req);
      return res.data;
    },
  });

  return { mutation };
}
