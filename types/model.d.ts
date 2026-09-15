export type UserRole = "admin" | "user";

export type Relation<T> = T;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile: Relation<UserProfile[]>;
  login_logs: Relation<UserLoginLogs[]>;
  notifications: Relation<Notification[]>;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  birth_date: string;
  height: number;
  weight: number;
  bmi: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  fitness_level: string;
  reminder_days: string[];
  reminder_time: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface UserLoginLogs {
  id: number;
  user_id: string[];
  ip_address: string;
  device: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  body_part: string;
  equipment: string;
  target: string;
  secondary_muscles: string[];
  instructions: string[];
  difficulty: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  description?: string;
  content: string;
  viewed_count: number;
  created_by_id?: number;
  creator: User;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  readed_at?: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Session {
  id: string;
  user_id: string;
  duration?: number;
  feedback?: string;
  created_at: string;
  updated_at: string;
  user: User;
  excercises: Relation<SessionExercise[]>;
}

export interface SessionExercise {
  id: string;
  session_id: string;
  exercise_id: string;
  repetition?: number;
  duration?: number;
  created_at: string;
  updated_at: string;
  exercise: Exercise;
  session: Session;
}
