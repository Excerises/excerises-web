import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Apple,
  ArrowRight,
  Brain,
  CalendarCheck,
  Dumbbell,
  HeartPulse,
  LineChart,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/constant/app";
import ThemeToggler from "@/components/theme-toggler";

const features = [
  {
    icon: Brain,
    title: "ML Fitness Level Prediction",
    description:
      "Machine learning analyzes your body metrics, workout history, and activity patterns to accurately predict your current fitness level.",
  },
  {
    icon: Target,
    title: "Personalized Training Recommendations",
    description:
      "Get adaptive workout plans tailored to your fitness level, goals, and progress — updated automatically as you improve.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking & Analytics",
    description:
      "Visualize strength, endurance, and consistency trends with clear charts that show exactly how far you have come.",
  },
  {
    icon: Dumbbell,
    title: "Smart Exercise Library",
    description:
      "Explore a curated library of exercises with proper form guidance, difficulty levels, and muscle group targeting.",
  },
  {
    icon: HeartPulse,
    title: "Health & Recovery Insights",
    description:
      "Monitor workout intensity, recovery needs, and training load to stay consistent without overtraining.",
  },
  {
    icon: CalendarCheck,
    title: "Adaptive Training Schedule",
    description:
      "A flexible weekly schedule that adapts to your availability, energy, and predicted readiness score.",
  },
];

const news = [
  {
    category: "Machine Learning",
    date: "Sep 10, 2026",
    readTime: "4 min read",
    title: "How Our ML Model Predicts Your Fitness Level With 94% Accuracy",
    description:
      "A deep dive into the features, training data, and validation behind our fitness level prediction engine — and what it means for your training.",
    image: "/window.svg",
  },
  {
    category: "Training Tips",
    date: "Sep 2, 2026",
    readTime: "5 min read",
    title:
      "From Beginner to Advanced: Let Recommendations Guide Your Next Phase",
    description:
      "Learn how adaptive recommendations adjust volume and intensity as your predicted fitness level improves week over week.",
    image: "/globe.svg",
  },
];

const stats = [
  { value: "94%", label: "Prediction accuracy" },
  { value: "50K+", label: "Active athletes" },
  { value: "120+", label: "Guided exercises" },
  { value: "4.9", label: "Average app rating" },
];

function StoreButtons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="#download"
        className={`flex items-center gap-3 rounded-xl px-5 py-3 transition-transform hover:-translate-y-0.5 ${
          dark
            ? "bg-white text-zinc-950 hover:bg-zinc-100"
            : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        }`}
      >
        <Play className="size-7 fill-current" />
        <span className="text-left leading-tight">
          <span className="block text-[11px] uppercase opacity-70">
            Get it on
          </span>
          <span className="block text-base font-semibold">Google Play</span>
        </span>
      </Link>
      <Link
        href="#download"
        className={`flex items-center gap-3 rounded-xl px-5 py-3 transition-transform hover:-translate-y-0.5 ${
          dark
            ? "border border-white/30 bg-transparent text-white hover:bg-white/10"
            : "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
        }`}
      >
        <Apple className="size-7 fill-current" />
        <span className="text-left leading-tight">
          <span className="block text-[11px] uppercase opacity-70">
            Download on the
          </span>
          <span className="block text-base font-semibold">App Store</span>
        </span>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative block size-9 overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt={APP_NAME}
                fill
                className="object-cover"
              />
            </span>
            <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <Link
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#news"
              className="transition-colors hover:text-foreground"
            >
              News
            </Link>
            <Link
              href="#download"
              className="transition-colors hover:text-foreground"
            >
              Download
            </Link>
          </nav>
          <ThemeToggler />
        </div>
      </header>

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
                <Activity className="size-4 text-primary" /> No equipment
                required
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="size-4 text-primary" /> Adapts as you
                grow
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

      <section id="features" className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="rounded-full">
              Features
            </Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything You Need to Level Up
            </h2>
            <p className="mt-3 text-muted-foreground">
              From accurate ML predictions to adaptive training plans,{" "}
              {APP_NAME} covers the full journey from assessment to achievement.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-3">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {f.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="rounded-full">
              How It Works
            </Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From Data to Your Best Training Plan
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Assess Your Fitness",
                description:
                  "Complete a quick assessment and connect your activity data so the ML model can predict your baseline fitness level.",
              },
              {
                step: "02",
                title: "Get ML Predictions",
                description:
                  "Our model evaluates strength, endurance, and consistency to score your fitness level with transparent insights.",
              },
              {
                step: "03",
                title: "Train With Recommendations",
                description:
                  "Follow a personalized plan that adapts every week based on your progress and updated predictions.",
              },
            ].map((s) => (
              <Card key={s.step}>
                <CardHeader>
                  <span className="text-4xl font-extrabold text-primary/25">
                    {s.step}
                  </span>
                  <CardTitle className="mt-1">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {s.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Badge variant="secondary" className="rounded-full">
                Latest News
              </Badge>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Stay Updated on Your Fitness Journey
              </h2>
              <p className="mt-3 text-muted-foreground">
                Training insights, ML explainers, and product updates from the{" "}
                {APP_NAME} team.
              </p>
            </div>
            <Button render={<Link href="/news" />} className="w-fit shrink-0">
              View All News <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {news.map((item) => (
              <Card key={item.title} className="overflow-hidden pt-0">
                <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-emerald-900/20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-8 opacity-80"
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge className="rounded-full">{item.category}</Badge>
                    <span className="text-muted-foreground">{item.date}</span>
                    <span className="text-muted-foreground">
                      • {item.readTime}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl leading-snug">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    render={<Link href="/news" />}
                    className="px-0"
                  >
                    Read More <ArrowRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-center text-white sm:px-12 lg:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_45%,transparent),transparent)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <Badge className="rounded-full bg-white/10 text-white hover:bg-white/15">
                Free Download
              </Badge>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start Training Smarter Today
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/70">
                Download {APP_NAME} on Google Play or the App Store, predict
                your fitness level in minutes, and get your first personalized
                training plan.
              </p>
              <div className="mt-8 flex justify-center">
                <StoreButtons dark />
              </div>
              <p className="mt-5 text-xs text-white/50">
                Available on Android and iOS • Free plan included • No credit
                card required
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <span className="relative block size-7 overflow-hidden rounded-lg">
              <Image
                src="/logo.png"
                alt={APP_NAME}
                fill
                className="object-cover"
              />
            </span>
            {APP_NAME}
          </span>
          <nav className="flex items-center gap-5">
            <Link href="#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="#news" className="hover:text-foreground">
              News
            </Link>
            <Link href="#download" className="hover:text-foreground">
              Download
            </Link>
          </nav>
          <p>© 2026 {APP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
