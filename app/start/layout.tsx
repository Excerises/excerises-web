"use client";

import { StartProvider } from "@/context/start-context";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/constant/app";

const steps = [
  { label: "Calculate Fitness", path: "/start/calculate-fitness" },
  { label: "Recommend Exercises", path: "/start/recommend-exercises" },
  { label: "Finish", path: "/start/finish" },
];

function StepIndicator() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((s) => pathname.startsWith(s.path));

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;

        return (
          <div key={step.path} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`h-px w-6 sm:w-10 ${done || active ? "bg-primary" : "bg-border"}`}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "border-2 border-primary text-primary"
                      : "border border-border text-muted-foreground"
                }`}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </div>
              <span
                className={`hidden text-sm sm:inline ${active ? "font-medium" : "text-muted-foreground"}`}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function StartLayout({ children }: { children: ReactNode }) {
  return (
    <StartProvider>
      <div className="min-h-screen bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]"
        />

        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Home
            </Link>
            <StepIndicator />
          </div>
        </header>

        <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="gap-1.5 rounded-full px-3 py-1.5">
              <Sparkles className="size-3.5" />
              Workout Plan Preview
            </Badge>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Build your training plan in minutes
            </h1>
            <p className="mt-3 text-muted-foreground">
              Answer a few questions — {APP_NAME} will predict your fitness level and
              recommend exercises tailored to your goals.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">{children}</div>
        </main>
      </div>
    </StartProvider>
  );
}
