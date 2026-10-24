"use client";

import { useMemo, useRef, useState } from "react";
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
import { mockExercises } from "@/mockups/exercises";
import { Exercise } from "@/types/model";
import {
  ColumnDef,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";
import { DownloadIcon, MoreHorizontalIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetExercises } from "@/hooks/api/exercise/use-exercise-query";
import { capitalize } from "@/lib/format";

function difficultyVariant(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "secondary" as const;
    case "intermediate":
      return "default" as const;
    case "advanced":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

function nowString() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function ExercisesPage() {
  const router = useRouter();
  const {
    query: exercisesQuery,
    search,
    setSearch,
    debouncedSearch,
    pagination,
  } = useGetExercises();
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null,
  );
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const features = tableFeatures({
    rowPaginationFeature: rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
  });

  const filteredExercises = useMemo(() => {
    return (exercisesQuery.data?.data.data || []).filter((e) =>
      `${e.name}${e.category}${e.body_part}${e.equipment}${e.target}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    );
  }, [exercisesQuery.data?.data, debouncedSearch]);

  const handleDelete = (exercise: Exercise) => {
    setExerciseToDelete(exercise);
  };

  const handleConfirmDelete = () => {
    if (!exerciseToDelete) return;

    // TODO: replace with a real delete API call
    setExerciseToDelete(null);
  };

  const columns = useMemo<Array<ColumnDef<typeof features, Exercise>>>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <div className="flex flex-col">
            <strong>{capitalize(info.row.original.name)}</strong>
            {info.row.original.category && (
              <span className="text-muted-foreground text-xs">
                {capitalize(info.row.original.category)}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "body_part",
        header: "Body Part",
        cell: (info) => (
          <span className="text-muted-foreground">
            {capitalize(String(info.getValue()))}
          </span>
        ),
      },
      {
        accessorKey: "equipment",
        header: "Equipment",
        cell: (info) => (
          <span className="text-muted-foreground">
            {capitalize(String(info.getValue()))}
          </span>
        ),
      },
      {
        accessorKey: "target",
        header: "Target",
        cell: (info) => (
          <span className="text-muted-foreground">
            {capitalize(String(info.getValue()))}
          </span>
        ),
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: (info) => {
          const difficulty = info.row.original.difficulty;

          return (
            <Badge variant={difficultyVariant(difficulty)} className="text-xs">
              {difficulty.toUpperCase()}
            </Badge>
          );
        },
      },
      {
        header: "Aksi",
        accessorKey: "options",
        cell: (info) => {
          const exercise = info.row.original;

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
                  onClick={() => router.push(`/admin/exercises/${exercise.id}`)}
                >
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/admin/exercises/${exercise.id}/edit`)
                  }
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleDelete(exercise)}
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

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setImportNotice(null);
  }

  async function handleDownloadTemplate() {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet([
      {
        name: "Push Up",
        description: "Latihan dada dengan berat badan.",
        body_part: "Chest",
        equipment: "Body Weight",
        target: "Pectorals",
        secondary_muscles: "Triceps, Shoulders",
        instructions: "Tangan selebar bahu; Turunkan badan; Dorong kembali",
        difficulty: "Beginner",
        category: "Strength",
      },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "exercises");
    XLSX.writeFile(workbook, "template-exercises.xlsx");
  }

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"]]}>
      <TopFilter
        searchPlaceholder="Search exercises..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
            >
              <DownloadIcon className="size-4" />
              Template
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="size-4" />
              Import Excel
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        }
      />
      {importNotice && (
        <p className="text-sm text-muted-foreground">{importNotice}</p>
      )}
      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredExercises}
            features={features}
            tableKey="exercises-table"
            state={{
              pagination: {
                pageIndex: pagination.page - 1,
                pageSize: pagination.limit,
              },
            }}
          />
        </CardContent>
      </Card>
      <Paginator
        totalPage={Math.ceil(filteredExercises.length / pagination.limit)}
        currentPage={pagination.page}
        onCurrentPageChange={pagination.setPage}
        perPage={pagination.limit}
        onPerPageChange={pagination.setLimit}
      />
      <ConfirmDialog
        open={exerciseToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setExerciseToDelete(null);
        }}
        title="Delete Exercise?"
        description={`Are you sure you want to delete "${exerciseToDelete?.name ?? ""}"? This action cannot be undone.`}
        cancelText="Cancel"
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}
