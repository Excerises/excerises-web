import { usePagination } from "@/hooks/ui/use-pagination";
import { useDebounceState } from "@/hooks/use-debounce-state";
import { api } from "@/network/api";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { Exercise } from "@/types/model";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useGetExercises() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceState(search);
  const pagination = usePagination();

  const query = useQuery({
    queryKey: ["get-exercises"],
    queryFn: async () => {
      const res = await api.client.get<
        ApiResponse<PaginatedResponse<Exercise>>
      >("/admin/exercises?limit=1000");
      return res.data;
    },
  });

  return { query, search, setSearch, debouncedSearch, pagination };
}
