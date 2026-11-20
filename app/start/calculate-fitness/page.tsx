"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCalculateFitness } from "@/hooks/api/profile/use-profile-mutation";
import { useStartContext } from "@/context/start-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const schema = z.object({
  age: z.number().int().min(1, "Age required"),
  gender: z.enum(["male", "female"], { message: "Gender required" }),
  height: z.number().min(1, "Height required"),
  weight: z.number().min(1, "Weight required"),
  workoutFreq: z.number().int().min(0, "Workout frequency required"),
  workoutDuration: z.number().int().min(0, "Workout duration required"),
  waterIntake: z.number().min(0, "Water intake required"),
});

export default function CalculateFitnessPage() {
  const router = useRouter();
  const { setFitnessLevel } = useStartContext();
  const { mutation } = useCalculateFitness();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      age: undefined as unknown as number,
      gender: undefined as unknown as "male" | "female",
      height: undefined as unknown as number,
      weight: undefined as unknown as number,
      workoutFreq: undefined as unknown as number,
      workoutDuration: undefined as unknown as number,
      waterIntake: undefined as unknown as number,
    } as never,
    mode: "onTouched",
  });

  const height = form.watch("height");
  const weight = form.watch("weight");
  const bmi = useMemo(() => {
    if (!height || !weight) return null;

    if (height <= 0 || weight <= 0) return null;
    return weight / (height / 100) ** 2;
  }, [height, weight]);

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(
      {
        age: values.age,
        gender: values.gender,
        height: values.height,
        weight: values.weight,
        bmi: bmi ?? undefined,
        workout_freq_per_week: values.workoutFreq,
        workout_duration_per_day: values.workoutDuration,
        water_intake_daily: values.waterIntake,
      },
      {
        onSuccess: (res) => {
          setFitnessLevel(res.data.level);
          router.push("/start/recommend-exercises");
        },
      },
    );
  });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Calculate Your Fitness Level</CardTitle>
        <CardDescription>
          Enter your body metrics and workout habits so we can predict your
          fitness level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormControl
              control={form.control}
              name="age"
              label="Age"
              required
              render={({ field, fieldState }) => (
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.currentTarget.value))
                  }
                />
              )}
            />
            <FormControl
              control={form.control}
              name="gender"
              label="Gender"
              required
              render={({ field, fieldState }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={(v) => field.onChange(v ?? "")}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormControl
              control={form.control}
              name="height"
              label="Height (cm)"
              required
              render={({ field, fieldState }) => (
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.currentTarget.value))
                  }
                />
              )}
            />
            <FormControl
              control={form.control}
              name="weight"
              label="Weight (kg)"
              required
              render={({ field, fieldState }) => (
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.currentTarget.value))
                  }
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">
              BMI (auto-calculated)
            </p>
            <Input
              id="bmi"
              type="text"
              readOnly
              value={bmi ? bmi.toFixed(1) : "—"}
              className="bg-muted"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormControl
              control={form.control}
              name="workoutFreq"
              label="Workout Frequency (per week)"
              required
              render={({ field, fieldState }) => (
                <Input
                  id="freq"
                  type="number"
                  placeholder="3"
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.currentTarget.value))
                  }
                />
              )}
            />
            <FormControl
              control={form.control}
              name="workoutDuration"
              label="Workout Duration (minutes/day)"
              required
              render={({ field, fieldState }) => (
                <Input
                  id="duration"
                  type="number"
                  placeholder="45"
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.currentTarget.value))
                  }
                />
              )}
            />
          </div>

          <FormControl
            control={form.control}
            name="waterIntake"
            label="Water Intake (liters/day)"
            required
            render={({ field, fieldState }) => (
              <Input
                id="water"
                type="number"
                step="0.1"
                placeholder="2.0"
                aria-invalid={fieldState.invalid}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.currentTarget.value))}
              />
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
  );
}
