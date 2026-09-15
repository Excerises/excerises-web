"use client";

import AdminLayout from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockExercises } from "@/mockups/exercises";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];

export default function ExerciseEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const exercise = mockExercises.find((e) => String(e.id) === params.id);

  const [title, setTitle] = useState(exercise?.title ?? "");
  const [description, setDescription] = useState(
    exercise?.description ?? "",
  );
  const [bodyPart, setBodyPart] = useState(exercise?.body_part ?? "");
  const [equipment, setEquipment] = useState(exercise?.equipment ?? "");
  const [target, setTarget] = useState(exercise?.target ?? "");
  const [secondaryMuscles, setSecondaryMuscles] = useState(
    exercise?.secondary_muscles?.join(", ") ?? "",
  );
  const [instructions, setInstructions] = useState(
    exercise?.instructions?.join("\n") ?? "",
  );
  const [difficulty, setDifficulty] = useState(
    exercise?.difficulty ?? "Beginner",
  );
  const [category, setCategory] = useState(exercise?.category ?? "");
  const [saving, setSaving] = useState(false);

  if (!exercise) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Edit"]]}>
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Exercise not found.
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // TODO: replace with a real API call
    console.log("Update exercise", {
      id: exercise.id,
      title,
      description,
      body_part: bodyPart,
      equipment,
      target,
      secondary_muscles: secondaryMuscles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      instructions: instructions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      difficulty,
      category,
    });

    setSaving(false);
    router.push(`/admin/exercises/${exercise.id}`);
  };

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Edit"]]}>
      <Card>
        <CardContent className="py-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="body_part">Body Part</Label>
                <Input
                  id="body_part"
                  value={bodyPart}
                  onChange={(e) => setBodyPart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment</Label>
                <Input
                  id="equipment"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary_muscles">
                Secondary Muscles (comma separated)
              </Label>
              <Input
                id="secondary_muscles"
                value={secondaryMuscles}
                onChange={(e) => setSecondaryMuscles(e.target.value)}
                placeholder="Triceps, Shoulders"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">
                Instructions (one step per line)
              </Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={5}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs"
                >
                  {difficultyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}