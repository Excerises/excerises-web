"use client";

import AdminLayout from "@/components/admin/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockExercises } from "@/mockups/exercises";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Dumbbell,
  Gauge,
  Layers,
  LayoutGrid,
  ListOrdered,
  Pencil,
  Tag,
  Target,
  Wrench,
} from "lucide-react";
import { cn } from "cn";

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

function difficultyAccent(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-emerald-500";
    case "intermediate":
      return "bg-amber-500";
    case "advanced":
      return "bg-rose-500";
    default:
      return "bg-primary";
  }
}

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const exercise = mockExercises.find((e) => String(e.id) === params.id);

  if (!exercise) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Detail"]]}>
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Dumbbell className="size-6 text-muted-foreground" />
            </span>
            <div className="space-y-1">
              <p className="font-medium">Exercise tidak ditemukan</p>
              <p className="text-sm text-muted-foreground">
                ID yang kamu buka tidak cocok dengan data mana pun.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/exercises")}
            >
              <ArrowLeft className="size-4" />
              Kembali ke daftar
            </Button>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const steps = exercise.instructions ?? [];
  const secondary = exercise.secondary_muscles ?? [];

  const stats = [
    {
      icon: Target,
      label: "Primary target",
      value: exercise.target || "-",
      hint: exercise.body_part || "Body part",
    },
    {
      icon: Wrench,
      label: "Equipment",
      value: exercise.equipment || "-",
      hint: exercise.category || "Category",
    },
    {
      icon: ListOrdered,
      label: "Steps",
      value: `${steps.length} langkah`,
      hint:
        steps.length > 0 ? `${secondary.length} otot sekunder` : "Belum ada panduan",
    },
  ];

  const overview = [
    { icon: LayoutGrid, label: "Body part", value: exercise.body_part || "-" },
    { icon: Wrench, label: "Equipment", value: exercise.equipment || "-" },
    { icon: Target, label: "Target", value: exercise.target || "-" },
    { icon: Tag, label: "Category", value: exercise.category || "-" },
  ];

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Detail"]]}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() =>
                router.push(`/admin/exercises/${exercise.id}/edit`)
              }
            >
              <Pencil className="size-4" />
              Edit exercise
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden pt-0">
          <div className="h-20 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent sm:h-24" />
          <CardContent className="-mt-8 pb-6 sm:-mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <span
                className={cn(
                  "flex size-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-background",
                  difficultyAccent(exercise.difficulty),
                )}
              >
                <Dumbbell className="size-8" />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                    {exercise.title}
                  </h1>
                  <Badge variant={difficultyVariant(exercise.difficulty)}>
                    <Gauge className="size-3" />
                    {exercise.difficulty.toUpperCase()}
                  </Badge>
                </div>
                {exercise.description && (
                  <p className="max-w-2xl text-sm text-pretty text-muted-foreground">
                    {exercise.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-1.5">
                  {exercise.category && (
                    <Badge variant="outline">
                      <Tag className="size-3" />
                      {exercise.category}
                    </Badge>
                  )}
                  {exercise.body_part && (
                    <Badge variant="secondary">
                      <LayoutGrid className="size-3" />
                      {exercise.body_part}
                    </Badge>
                  )}
                  {exercise.equipment && (
                    <Badge variant="secondary">
                      <Wrench className="size-3" />
                      {exercise.equipment}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-xl bg-muted/60 px-3.5 py-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background shadow-xs ring-1 ring-foreground/10">
                    <s.icon className="size-4 text-foreground" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      {s.label}
                    </p>
                    <p className="truncate text-sm font-semibold">{s.value}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid items-start gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>
                  Panduan langkah demi langkah untuk {exercise.title}.
                </CardDescription>
                <CardAction>
                  <Badge variant="outline" className="tabular-nums">
                    {steps.length} steps
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                {steps.length > 0 ? (
                  <ol className="space-y-0">
                    {steps.map((step, i) => (
                      <li key={i} className="flex gap-3.5">
                        <div className="flex flex-col items-center">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums">
                            {i + 1}
                          </span>
                          {i < steps.length - 1 && (
                            <span className="w-px flex-1 bg-border" />
                          )}
                        </div>
                        <p className="pb-6 text-sm leading-relaxed last:pb-0">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="rounded-lg bg-muted/60 px-3.5 py-3 text-sm text-muted-foreground">
                    Belum ada instruksi untuk exercise ini.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Muscle focus</CardTitle>
                <CardDescription>
                  Otot utama dan pendukung yang dilatih.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-muted/60 px-3.5 py-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background shadow-xs ring-1 ring-foreground/10">
                    <Target className="size-4 text-foreground" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      Primary
                    </p>
                    <p className="truncate text-sm font-semibold">
                      {exercise.target || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    <Layers className="size-3.5" />
                    Secondary ({secondary.length})
                  </p>
                  {secondary.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {secondary.map((muscle, i) => (
                        <Badge key={i} variant="outline">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">-</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Klasifikasi exercise.</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {overview.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <row.icon className="size-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        {row.label}
                      </p>
                      <p className="truncate text-sm">{row.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Gauge className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Difficulty
                    </p>
                    <Badge
                      variant={difficultyVariant(exercise.difficulty)}
                      className="mt-1"
                    >
                      {exercise.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <CalendarDays className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Created at
                    </p>
                    <p className="truncate text-sm tabular-nums">
                      {exercise.created_at ?? "-"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Clock3 className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Updated at
                    </p>
                    <p className="truncate text-sm tabular-nums">
                      {exercise.updated_at ?? "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Kelola exercise ini.</CardDescription>
              </CardHeader>
              <CardContent className="gap-2">
                <Button
                  className="w-full justify-start"
                  onClick={() =>
                    router.push(`/admin/exercises/${exercise.id}/edit`)
                  }
                >
                  <Pencil className="size-4" />
                  Edit exercise
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push("/admin/exercises")}
                >
                  <LayoutGrid className="size-4" />
                  All exercises
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
