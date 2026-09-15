"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlameIcon } from "lucide-react";
import Link from "next/link";

export interface PopularExerciseItem {
  id: string;
  title: string;
  category?: string;
  bodyPart: string;
  difficulty: string;
  completions: number;
  rating: number;
}

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

export default function PopularExercises({
  items,
}: {
  items: PopularExerciseItem[];
}) {
  const max = Math.max(...items.map((i) => i.completions), 1);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FlameIcon className="size-4 text-orange-500" />
          <CardTitle>Exercise Terpopuler</CardTitle>
        </div>
        <CardDescription>
          Berdasarkan total completions minggu ini
          {/* TODO: ganti dengan viewed_count / completions dari API */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {items.map((ex, idx) => (
            <li key={ex.id} className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-semibold text-muted-foreground">
                {idx + 1}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/admin/exercises/${ex.id}`}
                    className="truncate text-sm font-medium hover:underline"
                  >
                    {ex.title}
                  </Link>
                  <Badge
                    variant={difficultyVariant(ex.difficulty)}
                    className="shrink-0 text-[11px]"
                  >
                    {ex.difficulty.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">
                    {ex.category ?? "-"} • {ex.bodyPart}
                  </span>
                  <span className="ml-auto shrink-0">
                    ★ {ex.rating.toFixed(1)} • {ex.completions}x
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(ex.completions / max) * 100}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
