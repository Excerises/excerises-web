"use client";

import {
  Brain,
  CalendarCheck,
  Dumbbell,
  HeartPulse,
  LineChart,
  Target,
} from "lucide-react";
import { APP_NAME } from "@/constant/app";
import Hero from "@/components/home/hero";
import FeatureCard from "@/components/home/feature-card";
import StepCard from "@/components/home/step-card";
import NewsCard from "@/components/home/news-card";
import { useGetNews } from "@/hooks/api/news/use-news-query";
import { HomeLayout, HomeSection } from "@/components/home/layout";

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

export default function Home() {
  const {
    query: { data: newsData },
  } = useGetNews();

  return (
    <HomeLayout>
      <Hero />

      <HomeSection
        id="features"
        muted
        badge="Features"
        title="Everything You Need to Level Up"
        description={`From accurate ML predictions to adaptive training plans, ${APP_NAME} covers the full journey from assessment to achievement.`}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        id="how-it-works"
        badge="How It Works"
        title="From Data to Your Best Training Plan"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <StepCard key={s.step} {...s} />
          ))}
        </div>
      </HomeSection>

      {newsData && newsData.data.length > 0 && (
        <HomeSection
          id="news"
          muted
          badge="Latest News"
          title="Stay Updated on Your Fitness Journey"
          description={`Training insights, ML explainers, and product updates from the ${APP_NAME} team.`}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {newsData.data.slice(0, 4).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </HomeSection>
      )}
    </HomeLayout>
  );
}
