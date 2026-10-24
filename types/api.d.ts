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
