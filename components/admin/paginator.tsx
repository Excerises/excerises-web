"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export interface PaginatorProps {
  perPage?: number;
  currentPage?: number;
  onPerPageChange?: (perPage: number) => void;
  onCurrentPageChange?: (page: number) => void;
  totalPage: number;
}

const perPageOptions = [10, 20, 50, 100];

export default function Paginator({
  perPage: basePerPage = 10,
  currentPage: baseCurrentPage = 1,
  onPerPageChange,
  onCurrentPageChange,
  totalPage = 1,
}: PaginatorProps) {
  const [perPage, setPerPage] = useState(basePerPage);
  const [currentPage, setCurrentPage] = useState(baseCurrentPage);

  const canPrevPage = currentPage > 1;
  const canNextPage = currentPage < totalPage;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPerPage(basePerPage);
  }, [basePerPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(baseCurrentPage);
  }, [baseCurrentPage]);

  function onPrevPage() {
    if (!canPrevPage) return;
    setCurrentPage(currentPage - 1);
  }

  function onNextPage() {
    if (!canNextPage) return;
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="flex items-center justify-between md:flex-row flex-col">
      <div className="flex items-center gap-3">
        <span className="text-sm whitespace-nowrap">Result per page</span>
        <Select
          value={perPage}
          onValueChange={(page) => onPerPageChange?.(page || 10)}
        >
          <SelectTrigger>
            <SelectValue placeholder="per page" />
          </SelectTrigger>
          <SelectContent>
            {perPageOptions.map((perPage) => (
              <SelectItem
                key={perPage}
                value={perPage}
                label={perPage.toString()}
              >
                {perPage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={!canPrevPage ? "pointer-events-none opacity-50" : ""}
              onClick={onPrevPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={!canNextPage ? "pointer-events-none opacity-50" : ""}
              onClick={onNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
