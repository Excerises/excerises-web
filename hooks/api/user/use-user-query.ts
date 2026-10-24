import { usePagination } from "@/hooks/ui/use-pagination";
import { useDebounceState } from "@/hooks/use-debounce-state";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/model";
import { useQuery } from "@tanstack/react-query";
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
