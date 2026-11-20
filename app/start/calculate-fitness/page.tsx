"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCalculateFitness } from "@/hooks/api/profile/use-profile-mutation";
import { useStartContext } from "@/context/start-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function CalculateFitnessPage() {
  const router = useRouter();
  const { setFitnessLevel } = useStartContext();
  const { mutation } = useCalculateFitness();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutFreq, setWorkoutFreq] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const bmi = h > 0 && w > 0 ? w / (h / 100) ** 2 : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(
      {
        age: parseInt(age),
        gender,
        height: parseFloat(height),
        weight: parseFloat(weight),
        bmi: bmi ?? undefined,
        workout_freq_per_week: parseInt(workoutFreq),
        workout_duration_per_day: parseInt(workoutDuration),
        water_intake_daily: parseFloat(waterIntake),
      },
      {
        onSuccess: (res) => {
          setFitnessLevel(res.data.level);
          router.push("/start/recommend-exercises");
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Your Fitness Level</CardTitle>
        <CardDescription>
          Enter your body metrics and workout habits so we can predict your
          fitness level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v ?? "")} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bmi">BMI (auto-calculated)</Label>
            <Input
              id="bmi"
              type="text"
              readOnly
              value={bmi ? bmi.toFixed(1) : "—"}
              className="bg-muted"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="freq">Workout Frequency (per week)</Label>
              <Input
                id="freq"
                type="number"
                placeholder="3"
                required
                value={workoutFreq}
                onChange={(e) => setWorkoutFreq(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Workout Duration (minutes/day)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="45"
                required
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="water">Water Intake (liters/day)</Label>
            <Input
              id="water"
              type="number"
              step="0.1"
              placeholder="2.0"
              required
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
            />
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
  );
}
