"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useRecommendExercises } from "@/hooks/api/exercise/use-exercise-mutation";
import { useStartContext } from "@/context/start-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form/form-control";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const schema = z.object({
  target: z.string().min(1, "Target muscle required"),
  bodyPart: z.string().min(1, "Body part required"),
  equipment: z.string().min(1, "Equipment required"),
  category: z.string().min(1, "Category required"),
});

type FormValues = z.infer<typeof schema>;

export default function RecommendExercisesPage() {
  const router = useRouter();
  const { fitnessLevel, setExercises } = useStartContext();
  const { mutation } = useRecommendExercises();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "",
      bodyPart: "",
      equipment: "",
      category: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!fitnessLevel) {
      router.replace("/start/calculate-fitness");
    }
  }, [fitnessLevel, router]);

  if (!fitnessLevel) return null;

  function onSubmit(values: FormValues) {
    mutation.mutate(
      {
        body_part: values.bodyPart as ExerciseBodyPart,
        equipment: values.equipment as ExerciseEquipment,
        target: values.target as ExerciseTarget,
        difficulty: fitnessLevel as ExerciseDifficulty,
        category: values.category as ExerciseCategory,
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

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Get Exercise Recommendations</CardTitle>
          <CardDescription>
            Choose your preferences to get personalized exercise recommendations
            based on your fitness level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormControl
              control={form.control}
              name="target"
              label="Target Muscle"
              required
              render={({ field, fieldState }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v ?? "")}
                >
                  <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
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
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormControl
                control={form.control}
                name="bodyPart"
                label="Body Part"
                required
                render={({ field, fieldState }) => (
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v ?? "")}
                  >
                    <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
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
                )}
              />
              <FormControl
                control={form.control}
                name="equipment"
                label="Equipment"
                required
                render={({ field, fieldState }) => (
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v ?? "")}
                  >
                    <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
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
                )}
              />
            </div>

            <FormControl
              control={form.control}
              name="category"
              label="Category"
              required
              render={({ field, fieldState }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v ?? "")}
                >
                  <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
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
              )}
            />

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
