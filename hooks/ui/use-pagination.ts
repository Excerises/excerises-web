import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  return {
    page,
    setPage,
    limit,
    setLimit,
  };
}
