"use client";

import AdminLayout from "@/components/admin/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockExercises } from "@/mockups/exercises";
import { useParams, useRouter } from "next/navigation";

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

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const exercise = mockExercises.find((e) => String(e.id) === params.id);

  if (!exercise) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Detail"]]}>
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Exercise not found.
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Detail"]]}>
      <Card>
        <CardHeader>
          <CardTitle>{exercise.title}</CardTitle>
          {exercise.description && (
            <CardDescription>{exercise.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Category</span>
              <span className="text-sm text-muted-foreground">
                {exercise.category || "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Difficulty</span>
              <div>
                <Badge
                  variant={difficultyVariant(exercise.difficulty)}
                  className="text-xs"
                >
                  {exercise.difficulty.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Body Part</span>
              <span className="text-sm text-muted-foreground">
                {exercise.body_part || "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Equipment</span>
              <span className="text-sm text-muted-foreground">
                {exercise.equipment || "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Target</span>
              <span className="text-sm text-muted-foreground">
                {exercise.target || "-"}
              </span>
            </div>
          </div>

          {exercise.secondary_muscles?.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Secondary Muscles</span>
              <div className="flex flex-wrap gap-2">
                {exercise.secondary_muscles.map((muscle, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {exercise.instructions?.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Instructions</span>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                {exercise.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Created At</span>
              <span className="text-sm text-muted-foreground">
                {exercise.created_at ?? "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Updated At</span>
              <span className="text-sm text-muted-foreground">
                {exercise.updated_at ?? "-"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2 pt-4">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            onClick={() =>
              router.push(`/admin/exercises/${exercise.id}/edit`)
            }
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
    </AdminLayout>
  );
}