"use client";

import { StartProvider } from "@/context/start-context";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
        <header className="border-b">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
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
        <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
      </div>
    </StartProvider>
  );
}
