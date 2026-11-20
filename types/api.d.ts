import { Exercise, User } from "./model";

export type ExerciseBodyPart =
  | "waist"
  | "shoulders"
  | "upper legs"
  | "upper arms"
  | "lower arms"
  | "lower legs"
  | "back"
  | "chest"
  | "neck"
  | "cardio";

export type ExerciseEquipment =
  | "assisted"
  | "barbell"
  | "rope"
  | "body weight"
  | "medicine ball"
  | "cable"
  | "leverage machine"
  | "assisted (towel)"
  | "stability ball"
  | "dumbbell"
  | "ez barbell"
  | "kettlebell"
  | "body weight (with resistance band)"
  | "olympic barbell"
  | "weighted"
  | "bosu ball"
  | "sled machine"
  | "smith machine"
  | "wheel roller"
  | "trap bar"
  | "band";

export type ExerciseTarget =
  | "abs"
  | "delts"
  | "glutes"
  | "quads"
  | "forearms"
  | "biceps"
  | "calves"
  | "triceps"
  | "hamstrings"
  | "upper back"
  | "pectorals"
  | "lats"
  | "adductors"
  | "traps"
  | "serratus anterior"
  | "levator scapulae"
  | "spine"
  | "cardiovascular system"
  | "abductors";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export type ExerciseCategory =
  | "strength"
  | "cardio"
  | "balance"
  | "rehabilitation"
  | "mobility"
  | "plyometrics"
  | "stretching";

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

export interface CalculateFitnessRequest {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi?: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  water_intake_daily: number;
}

export interface CalculateFitnessResponse {
  level: string;
}

export interface UpdateProfileRequest extends Omit<
  CalculateFitnessRequest,
  "age"
> {
  birth_date: string;
  reminder_days: number[];
  reminder_time: string;
}

export interface UpdateProfileAuthRequest {
  email?: string;
  name?: string;
  password?: string;
}

export interface ExerciseImportRequest {
  file: File;
}

export interface ExerciseImportResult {
  success: boolean;
  message: string;
  imported_count: number;
  skipped_count: number;
}

export interface CalculateFitnessRequest {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi?: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  water_intake_daily: number;
}

export interface CalculateFitnessResponse {
  level: string;
}

export interface RecommendExercisesRequest {
  body_part: ExerciseBodyPart;
  equipment: ExerciseEquipment;
  target: ExerciseTarget;
  difficulty: ExerciseDifficulty;
  category: ExerciseCategory;
  top_n?: number;
}

export interface RecommendExercisesResponse {
  total: number;
  exercises: Exercise[];
}
