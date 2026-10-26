import { usePagination } from "@/hooks/ui/use-pagination";
import { useDebounceState } from "@/hooks/use-debounce-state";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { News, NewsStatus } from "@/types/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export interface NewsPayload {
  title: string;
  description: string;
  content: string;
  image?: string;
  status?: NewsStatus;
}

export function useGetNews() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceState(search);
  const pagination = usePagination();

  const query = useQuery({
    queryKey: ["get-news"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<News[]>>("/news");
      return res.data;
    },
  });

  return { query, search, setSearch, debouncedSearch, pagination };
}

export function useGetNewsDetail({ newsId }: { newsId?: unknown }) {
  const query = useQuery({
    queryKey: ["get-news", newsId],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<News>>(`/news/${newsId}`);
      return res.data;
    },
    enabled: !!newsId,
  });

  return { query };
}

/**
 * Admin news detail. Prefer this over `useGetNewsDetail` inside the admin
 * area because the public endpoint increments `viewed_count` on every fetch.
 */
export function useGetAdminNewsDetail({ newsId }: { newsId?: unknown }) {
  const query = useQuery({
    queryKey: ["get-admin-news-detail", newsId],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<News>>(
        `/admin/news/${newsId}`,
      );
      return res.data;
    },
    enabled: !!newsId,
  });

  return { query };
}

export function useCreateNews() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-news"],
    mutationFn: async (req: NewsPayload) => {
      const res = await api.client.post<ApiResponse<News>>(
        "/admin/news",
        req,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-news"] });
    },
  });

  return { mutation };
}

export function useUpdateNews() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-news"],
    mutationFn: async ({
      newsId,
      req,
    }: {
      newsId: string;
      req: NewsPayload;
    }) => {
      const res = await api.client.put<ApiResponse<News>>(
        `/admin/news/${newsId}`,
        req,
      );
      return res.data;
    },
    onSuccess: (_data, { newsId }) => {
      queryClient.invalidateQueries({ queryKey: ["get-news"] });
      queryClient.invalidateQueries({
        queryKey: ["get-admin-news-detail", newsId],
      });
    },
  });

  return { mutation };
}

export function useDeleteNews() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-news"],
    mutationFn: async ({ newsId }: { newsId: string }) => {
      await api.client.delete(`/admin/news/${newsId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-news"] });
    },
  });

  return { mutation };
}
