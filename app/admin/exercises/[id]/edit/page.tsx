"use client";

import AdminLayout from "@/components/admin/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { mockExercises } from "@/mockups/exercises";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Dumbbell,
  Gauge,
  Layers,
  Lightbulb,
  ListOrdered,
  Loader2,
  Save,
  Type,
} from "lucide-react";
import { cn } from "cn";

const difficultyOptions = [
  {
    value: "Beginner",
    hint: "Ringan, cocok pemula",
    activeClass: "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  {
    value: "Intermediate",
    hint: "Butuh pengalaman dasar",
    activeClass: "bg-amber-500/10 text-amber-700 border-amber-500/50 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  {
    value: "Advanced",
    hint: "Intensitas tinggi",
    activeClass: "bg-rose-500/10 text-rose-700 border-rose-500/50 dark:text-rose-400",
    dotClass: "bg-rose-500",
  },
] as const;

export default function ExerciseEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const exercise = mockExercises.find((e) => String(e.id) === params.id);

  const [title, setTitle] = useState(exercise?.title ?? "");
  const [description, setDescription] = useState(exercise?.description ?? "");
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

  const secondaryPreview = useMemo(
    () =>
      secondaryMuscles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [secondaryMuscles],
  );

  const stepsPreview = useMemo(
    () =>
      instructions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    [instructions],
  );

  if (!exercise) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Edit"]]}>
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
      secondary_muscles: secondaryPreview,
      instructions: stepsPreview,
      difficulty,
      category,
    });

    await new Promise((r) => setTimeout(r, 400));
    setSaving(false);
    router.push(`/admin/exercises/${exercise.id}`);
  };

  const dirty =
    title !== (exercise.title ?? "") ||
    description !== (exercise.description ?? "") ||
    bodyPart !== (exercise.body_part ?? "") ||
    equipment !== (exercise.equipment ?? "") ||
    target !== (exercise.target ?? "") ||
    category !== (exercise.category ?? "") ||
    difficulty !== (exercise.difficulty ?? "Beginner") ||
    secondaryMuscles !== (exercise.secondary_muscles?.join(", ") ?? "") ||
    instructions !== (exercise.instructions?.join("\n") ?? "");

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["Exercise"], ["Edit"]]}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={saving || !title.trim()}>
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden pt-0">
            <div className="h-16 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent sm:h-20" />
            <CardContent className="-mt-7 pb-6 sm:-mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                  <Dumbbell className="size-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <h1 className="truncate text-xl font-semibold tracking-tight">
                    {title.trim() || exercise.title}
                  </h1>
                  <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="tabular-nums">ID: {exercise.id}</span>
                    <span aria-hidden>·</span>
                    <span>{stepsPreview.length} steps</span>
                    <span aria-hidden>·</span>
                    <span>{secondaryPreview.length} otot sekunder</span>
                    {dirty && (
                      <Badge variant="outline" className="ml-1">
                        Unsaved changes
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid items-start gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="size-4 text-muted-foreground" />
                    Basic info
                  </CardTitle>
                  <CardDescription>
                    Nama dan deskripsi yang tampil di detail exercise.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="cth. Push Up"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <Label htmlFor="description">Description</Label>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {description.length} karakter
                      </span>
                    </div>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Deskripsi singkat tentang gerakan dan manfaatnya..."
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="body_part">Body Part</Label>
                      <Input
                        id="body_part"
                        value={bodyPart}
                        onChange={(e) => setBodyPart(e.target.value)}
                        placeholder="Chest / Back / Legs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Strength / Cardio / Core"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipment">Equipment</Label>
                      <Input
                        id="equipment"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                        placeholder="Body Weight / Dumbbell / Barbell"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">Primary Target</Label>
                      <Input
                        id="target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="Pectorals / Quadriceps / Lats"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListOrdered className="size-4 text-muted-foreground" />
                    Muscles & instructions
                  </CardTitle>
                  <CardDescription>
                    Pisahkan otot dengan koma, instruksi satu langkah per baris.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="secondary_muscles">
                      Secondary Muscles
                    </Label>
                    <Input
                      id="secondary_muscles"
                      value={secondaryMuscles}
                      onChange={(e) => setSecondaryMuscles(e.target.value)}
                      placeholder="Triceps, Shoulders"
                    />
                    {secondaryPreview.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {secondaryPreview.map((m, i) => (
                          <Badge key={i} variant="outline">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Badge variant="secondary" className="tabular-nums">
                        {stepsPreview.length} steps
                      </Badge>
                    </div>
                    <Textarea
                      id="instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={6}
                      placeholder={"Tangan selebar bahu\nTurunkan badan\nDorong kembali"}
                    />
                    {stepsPreview.length > 0 && (
                      <ol className="space-y-2 rounded-xl bg-muted/60 p-3.5">
                        {stepsPreview.map((step, i) => (
                          <li key={i} className="flex gap-2.5 text-sm">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-[11px] font-bold shadow-xs ring-1 ring-foreground/10 tabular-nums">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 lg:sticky lg:top-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="size-4 text-muted-foreground" />
                    Difficulty
                  </CardTitle>
                  <CardDescription>Pilih level kesulitan.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {difficultyOptions.map((opt) => {
                    const active = difficulty === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setDifficulty(opt.value)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                          active
                            ? opt.activeClass
                            : "border-border hover:bg-muted/60",
                        )}
                      >
                        <span
                          className={cn("size-2.5 shrink-0 rounded-full", opt.dotClass)}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">
                            {opt.value}
                          </span>
                          <span className="block truncate text-xs opacity-70">
                            {opt.hint}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="size-4 text-muted-foreground" />
                    Summary
                  </CardTitle>
                  <CardDescription>Live preview sebelum disimpan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Dumbbell className="size-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {title.trim() || "-"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {[bodyPart, equipment].filter(Boolean).join(" · ") || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{difficulty.toUpperCase()}</Badge>
                    {category && <Badge variant="outline">{category}</Badge>}
                    {target && <Badge variant="outline">{target}</Badge>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex gap-2.5">
                  <Lightbulb className="size-4 shrink-0 text-muted-foreground" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Tulis instruksi dengan kalimat perintah singkat agar mudah
                    diikuti saat latihan.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || !title.trim()}
              className="ml-auto"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
