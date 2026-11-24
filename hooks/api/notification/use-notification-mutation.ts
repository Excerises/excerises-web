import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSendAdminNotification() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["send-admin-notification"],
    mutationFn: async (req: {
      user_id: string;
      title: string;
      description: string;
    }) => {
      const res = await api.client.post<ApiResponse<unknown>>(
        "/admin/notifications",
        req,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });

  return { mutation };
}
