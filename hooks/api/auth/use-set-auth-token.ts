import { api } from "@/network/api";
import { LoginResponse } from "../../../../type/api/auth/login";

export function useSetAuthToken() {
  const setToken = async ({ access_token, refresh_token }: LoginResponse) => {
    await api.setToken("access", access_token);
    await api.setToken("refresh", refresh_token);
  };

  return { setToken };
}
