export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
}

export interface AuthResponse {
  type: "bearer";
  access_token: string;
  refresh_token: string;
}
