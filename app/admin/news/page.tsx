"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/layout";
import Paginator from "@/components/admin/paginator";
import TopFilter from "@/components/admin/top-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/ui/table/data-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { News } from "@/types/model";
import {
  ColumnDef,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";
import { EyeIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetNews } from "@/hooks/api/news/use-news-query";
import { Spinner } from "@/components/ui/spinner";

function statusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "published":
      return "default" as const;
    case "draft":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export default function NewsPage() {
  const {
    query: newsQuery,
    search,
    setSearch,
    debouncedSearch,
    pagination,
  } = useGetNews();

  const router = useRouter();
  const [newsToDelete, setNewsToDelete] = useState<News | null>(null);
  const features = tableFeatures({
    rowPaginationFeature: rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
  });

  const filtered = useMemo(() => {
    return (newsQuery.data?.data || []).filter((n) =>
      [n.title, n.description || ""]
        .join("")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    );
  }, [newsQuery.data?.data, debouncedSearch]);

  const handleConfirmDelete = () => {
    if (!newsToDelete) return;

    // TODO: replace with a real delete API call
    setNewsToDelete(null);
  };

  const columns = useMemo<Array<ColumnDef<typeof features, News>>>(
    () => [
      {
        accessorKey: "title",
        header: "Berita",
        cell: (info) => {
          const news = info.row.original;
          return (
            <div className="flex items-center gap-3">
              {news.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={news.image}
                  alt={news.title}
                  className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-foreground/10"
                />
              ) : (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">
                  {news.title.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="flex min-w-0 flex-col">
                <strong className="truncate">{news.title}</strong>
                {news.description && (
                  <span className="truncate text-xs text-muted-foreground">
                    {news.description}
                  </span>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.row.original.status || "published";
          return (
            <Badge variant={statusVariant(status)} className="text-xs">
              {status.toUpperCase()}
            </Badge>
          );
        },
      },
      {
        accessorKey: "viewed_count",
        header: "Views",
        cell: (info) => (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground tabular-nums">
            <EyeIcon className="size-3.5" />
            {Number(info.getValue() ?? 0).toLocaleString("id-ID")}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: (info) => (
          <span className="text-muted-foreground tabular-nums">
            {String(info.getValue())}
          </span>
        ),
      },
      {
        header: "Aksi",
        accessorKey: "options",
        cell: (info) => {
          const news = info.row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button type="button" size="icon-xs" variant="ghost">
                    <MoreHorizontalIcon className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-auto">
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/news/${news.id}/edit`)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setNewsToDelete(news)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["News"]]}>
      <TopFilter
        searchPlaceholder="Search news..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => router.push("/admin/news/new")}
          >
            <PlusIcon className="size-4" />
            Tambah Berita
          </Button>
        }
      />
      <Card>
        <CardContent>
          {newsQuery.isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filtered}
              features={features}
              tableKey="news-table"
              state={{
                pagination: {
                  pageIndex: pagination.page - 1,
                  pageSize: pagination.limit,
                },
              }}
            />
          )}
        </CardContent>
      </Card>
      <Paginator
        totalPage={Math.ceil(filtered.length / pagination.limit)}
        currentPage={pagination.page}
        onCurrentPageChange={pagination.setPage}
        perPage={pagination.limit}
        onPerPageChange={pagination.setLimit}
      />
      <ConfirmDialog
        open={newsToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setNewsToDelete(null);
        }}
        title="Delete Berita?"
        description={`Are you sure you want to delete "${newsToDelete?.title ?? ""}"? This action cannot be undone.`}
        cancelText="Cancel"
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}
