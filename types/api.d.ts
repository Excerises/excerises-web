import { Exercise, User } from "./model";

export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
}

export interface AuthResponse {
  type: "bearer";
  access_token: string;
  refresh_token: string;
}

export interface ProfileProgressResponse {
  streaks: number;
  workouts: number;
  minutes: number;
  weeklyDurations: number[];
}

export interface PaginatedResponse<T> {
  data: T[];
  next_cursor?: string;
  has_more?: boolean;
  limit: number;
}


export interface DashboardStat {
  total_users: number;
  total_exercises: number;
  total_body_parts: number;
  exercise_level_distribution: {
    labels: string[];
    dataset: number[];
  };
}

export interface DashboardUserRegistrations {
  dataset: number[];
  recent_users: User[];
}

export type DashboardPopularExercise = Exercise & {
  usage_percentage: number;
};

export interface SessionExerciseBrief {
  id: string;
  name: string;
  body_part?: string | null;
  equipment?: string | null;
  target?: string | null;
  difficulty?: string | null;
  category?: string | null;
}

export interface AdminUserSessionExercise {
  id: number;
  exercise_id: string;
  repetition?: number | null;
  duration?: number | null;
  exercise?: SessionExerciseBrief | null;
}

export interface AdminUserSession {
  id: string;
  name?: string | null;
  duration: number;
  feedback?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  exercises?: AdminUserSessionExercise[];
}
