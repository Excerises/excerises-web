import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Dumbbell,
  HeartPulse,
  LineChart,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/constant/app";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import FeatureCard from "@/components/home/feature-card";
import StepCard from "@/components/home/step-card";
import NewsCard from "@/components/home/news-card";
import StartTrainingToday from "@/components/home/start-training-today";
import Footer from "@/components/home/footer";

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

const steps = [
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />

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
              <FeatureCard key={f.title} {...f} />
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
            {steps.map((s) => (
              <StepCard key={s.step} {...s} />
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
              <NewsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <StartTrainingToday />
      <Footer />
    </div>
  );
}
