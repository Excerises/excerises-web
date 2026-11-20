"use client";

import { Exercise } from "@/types/model";
import { createContext, ReactNode, useContext, useState } from "react";

interface StartContextValue {
  fitnessLevel: string | null;
  setFitnessLevel: (level: string) => void;
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
}

const StartContext = createContext<StartContextValue | null>(null);

export function StartProvider({ children }: { children: ReactNode }) {
  const [fitnessLevel, setFitnessLevel] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  return (
    <StartContext value={{ fitnessLevel, setFitnessLevel, exercises, setExercises }}>
      {children}
    </StartContext>
  );
}

export function useStartContext() {
  const ctx = useContext(StartContext);
  if (!ctx) throw new Error("useStartContext must be used within StartProvider");
  return ctx;
}
