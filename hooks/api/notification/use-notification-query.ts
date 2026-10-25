import { useDebounceState } from "@/hooks/use-debounce-state";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { Notification } from "@/types/model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useGetNotifications() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceState(search);

  const query = useQuery({
    queryKey: ["get-notifications"],
    queryFn: async () => {
      const res =
        await api.client.get<ApiResponse<Notification[]>>("/notifications");
      return res.data;
    },
  });

  return { query, search, setSearch, debouncedSearch };
}

export function useReadNotification() {
  const mutation = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: async ({ notificationId }: { notificationId: never }) => {
      const res = await api.client.post(
        `/notifications/${notificationId}/read`,
      );
      return res.data;
    },
  });

  return { mutation };
}

export function useDeleteNotification() {
  const mutation = useMutation({
    mutationKey: ["delete-notification"],
    mutationFn: async ({ notificationId }: { notificationId: never }) => {
      const res = await api.client.delete(`/notifications/${notificationId}`);
      return res.data;
    },
  });

  return { mutation };
}

export function useGetCountUnreadNotification() {
  const query = useQuery({
    queryKey: ["get-count-unread-notification"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<number>>(
        "/notifications/unread-count",
      );
      return res.data;
    },
  });

  return { query };
}
