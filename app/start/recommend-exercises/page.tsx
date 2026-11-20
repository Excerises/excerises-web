"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useRecommendExercises } from "@/hooks/api/exercise/use-exercise-mutation";
import { useStartContext } from "@/context/start-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type {
  ExerciseBodyPart,
  ExerciseCategory,
  ExerciseDifficulty,
  ExerciseEquipment,
  ExerciseTarget,
} from "@/types/api";

const bodyParts: ExerciseBodyPart[] = [
  "waist",
  "shoulders",
  "upper legs",
  "upper arms",
  "lower arms",
  "lower legs",
  "back",
  "chest",
  "neck",
  "cardio",
];

const equipments: ExerciseEquipment[] = [
  "assisted",
  "barbell",
  "rope",
  "body weight",
  "medicine ball",
  "cable",
  "leverage machine",
  "assisted (towel)",
  "stability ball",
  "dumbbell",
  "ez barbell",
  "kettlebell",
  "body weight (with resistance band)",
  "olympic barbell",
  "weighted",
  "bosu ball",
  "sled machine",
  "smith machine",
  "wheel roller",
  "trap bar",
  "band",
];

const targets: ExerciseTarget[] = [
  "abs",
  "delts",
  "glutes",
  "quads",
  "forearms",
  "biceps",
  "calves",
  "triceps",
  "hamstrings",
  "upper back",
  "pectorals",
  "lats",
  "adductors",
  "traps",
  "serratus anterior",
  "levator scapulae",
  "spine",
  "cardiovascular system",
  "abductors",
];

const categories: ExerciseCategory[] = [
  "strength",
  "cardio",
  "balance",
  "rehabilitation",
  "mobility",
  "plyometrics",
  "stretching",
];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function RecommendExercisesPage() {
  const router = useRouter();
  const { fitnessLevel, setExercises } = useStartContext();
  const { mutation } = useRecommendExercises();

  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!fitnessLevel) {
      router.replace("/start/calculate-fitness");
    }
  }, [fitnessLevel, router]);

  if (!fitnessLevel) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(
      {
        body_part: bodyPart as ExerciseBodyPart,
        equipment: equipment as ExerciseEquipment,
        target: target as ExerciseTarget,
        difficulty: fitnessLevel as ExerciseDifficulty,
        category: category as ExerciseCategory,
        top_n: 10,
      },
      {
        onSuccess: (res) => {
          setExercises(res.data.exercises);
          router.push("/start/finish");
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <span className="text-sm text-muted-foreground">
          Your Fitness Level:
        </span>
        <Badge>{capitalize(fitnessLevel)}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Exercise Recommendations</CardTitle>
          <CardDescription>
            Choose your preferences to get personalized exercise recommendations
            based on your fitness level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Target Muscle</Label>
              <Select
                value={target}
                onValueChange={(v) => setTarget(v ?? "")}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {targets.map((v) => (
                    <SelectItem key={v} value={v}>
                      {capitalize(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Body Part</Label>
                <Select
                  value={bodyPart}
                  onValueChange={(v) => setBodyPart(v ?? "")}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select body part" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyParts.map((v) => (
                      <SelectItem key={v} value={v}>
                        {capitalize(v)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Equipment</Label>
                <Select
                  value={equipment}
                  onValueChange={(v) => setEquipment(v ?? "")}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipments.map((v) => (
                      <SelectItem key={v} value={v}>
                        {capitalize(v)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v ?? "")}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((v) => (
                    <SelectItem key={v} value={v}>
                      {capitalize(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full sm:w-auto"
              >
                {mutation.isPending ? (
                  <Spinner />
                ) : (
                  <>
                    Next
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
