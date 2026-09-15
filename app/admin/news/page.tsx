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
import { mockNews } from "@/mockups/news";
import { News } from "@/types/model";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<News[]>(mockNews);
  const [newsToDelete, setNewsToDelete] = useState<News | null>(null);
  const features = tableFeatures({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) =>
      [n.title, n.description ?? "", n.content, n.creator?.name ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  const handleConfirmDelete = () => {
    if (!newsToDelete) return;

    // TODO: replace with a real delete API call
    setItems((prev) => prev.filter((n) => n.id !== newsToDelete.id));
    setNewsToDelete(null);
  };

  const columns: Array<ColumnDef<typeof features, News>> = [
    {
      accessorKey: "title",
      header: "Berita",
      cell: (info) => {
        const news = info.row.original;
        return (
          <div className="flex items-center gap-3">
            {news.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={news.thumbnail}
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
        const status = info.row.original.status;
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
  ];

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["News"]]}>
      <TopFilter
        searchPlaceholder="Search news..."
        value={query}
        onSearchChange={setQuery}
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
          <DataTable
            columns={columns}
            data={filtered}
            features={features}
            tableKey="news-table"
          />
        </CardContent>
      </Card>
      <Paginator totalPage={1} />
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
