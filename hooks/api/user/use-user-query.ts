import { usePagination } from "@/hooks/ui/use-pagination";
import { useDebounceState } from "@/hooks/use-debounce-state";
import { api } from "@/network/api";
import { AdminUserSession, ApiResponse } from "@/types/api";
import { User } from "@/types/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useGetUsers() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounceState(search);
  const pagination = usePagination();

  const query = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const res =
        await api.client.get<ApiResponse<Array<User>>>("/admin/users");
      return res.data;
    },
  });

  return { query, debounceSearch, search, setSearch, pagination };
}

export function useGetUserDetail(userId?: string) {
  const query = useQuery({
    queryKey: ["get-user-detail", userId],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<User>>(
        `/admin/users/${userId}`,
      );
      return res.data;
    },
    enabled: !!userId,
  });

  return { query };
}

export function useGetUserSessions(userId?: string) {
  const query = useQuery({
    queryKey: ["get-user-sessions", userId],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<AdminUserSession[]>>(
        `/admin/users/${userId}/sessions`,
      );
      return res.data;
    },
    enabled: !!userId,
  });

  return { query };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async ({
      userId,
      req,
    }: {
      userId: string;
      req: { name?: string; email?: string };
    }) => {
      const res = await api.client.put<ApiResponse<User>>(
        `/admin/users/${userId}`,
        req,
      );
      return res.data;
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      queryClient.invalidateQueries({ queryKey: ["get-user-detail", userId] });
    },
  });

  return { mutation };
}

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-user-password"],
    mutationFn: async ({
      userId,
      password,
    }: {
      userId: string;
      password: string;
    }) => {
      const res = await api.client.put<ApiResponse<User>>(
        `/admin/users/${userId}/auth`,
        { password },
      );
      return res.data;
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["get-user-detail", userId] });
    },
  });

  return { mutation };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async ({ userId }: { userId: string }) => {
      await api.client.delete(`/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
    },
  });

  return { mutation };
}
