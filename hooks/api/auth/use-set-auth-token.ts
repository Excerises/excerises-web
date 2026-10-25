import { api } from "@/network/api";
import { AuthResponse } from "@/types/api";

export function useSetAuthToken() {
  const setToken = async ({ access_token, refresh_token }: AuthResponse) => {
    await api.setToken("access", access_token);
    await api.setToken("refresh", refresh_token);
  };

  return { setToken };
}
