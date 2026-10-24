import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { News } from "@/types/model";
import { useQuery } from "@tanstack/react-query";

export function useGetNews() {
  const query = useQuery({
    queryKey: ["get-news"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<News[]>>("/news");
      return res.data;
    },
  });

  return { query };
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
