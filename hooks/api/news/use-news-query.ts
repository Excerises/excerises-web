import { usePagination } from "@/hooks/ui/use-pagination";
import { useDebounceState } from "@/hooks/use-debounce-state";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { News } from "@/types/model";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
