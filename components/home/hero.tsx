import { Activity, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { APP_NAME } from "@/constant/app";
import StoreButtons from "./store-buttons";

const stats = [
  { value: "94%", label: "Prediction accuracy" },
  { value: "50K+", label: "Active athletes" },
  { value: "120+", label: "Guided exercises" },
  { value: "4.9", label: "Average app rating" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div>
          <Badge className="mb-5 gap-1.5 rounded-full px-3 py-1.5">
            <Sparkles className="size-3.5" />
            ML-Powered Fitness Coaching
          </Badge>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Know Your Fitness Level. Train Smarter.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {APP_NAME} uses machine learning to predict your fitness level and
            generate personalized training recommendations — so every workout
            moves you forward, safely and efficiently.
          </p>
          <div className="mt-8">
            <StoreButtons />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> Free to start
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="size-4 text-primary" /> No equipment required
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="size-4 text-primary" /> Adapts as you grow
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="py-5 text-center">
              <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
