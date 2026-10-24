import { useState } from "react";

export function usePagination({
  page: basePage = 1,
  limit: baseLimit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) {
  const [page, setPage] = useState(basePage);
  const [limit, setLimit] = useState(baseLimit);

  return {
    page,
    setPage,
    limit,
    setLimit,
  };
}
