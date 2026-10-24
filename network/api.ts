import moment from "moment";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useSetAuthToken } from "@/hooks/api/auth/use-set-auth-token";
import { ApiResponse, AuthResponse } from "@/types/api";
import { asyncStorage, STORAGE_KEYS } from "@/constant/storage";

class ApiNetwork {
  client: AxiosInstance;

  constructor(baseUrl?: string) {
    if (!baseUrl) {
      baseUrl = "https://api-excerises.izzaalfiansyah.my.id";
    }

    this.client = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
    this.setInterceptor();
  }

  setInterceptor() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { setToken } = useSetAuthToken();

    function log(config: AxiosRequestConfig, status: number = 200) {
      console.log(
        `${moment().format("YYYY-MM-DD HH:mm:ss")}: [${config.method?.toUpperCase()}] ${config.url} with status ${status}`,
      );
    }

    this.client.interceptors.response.use(
      (response) => {
        log(response.config, response.status);

        return response;
      },
      async (error) => {
        if (error instanceof AxiosError) {
          log(error.config!, error.response?.status || 500);

          const config = error.config as AxiosRequestConfig & {
            _retried?: boolean;
          };
          const shouldRefresh =
            error.response?.status === 401 &&
            !(config.url || "").includes("/auth");

          if (config && !config._retried && shouldRefresh) {
            config._retried = true;
            const token = await this.getSavedRefreshToken();

            if (token) {
              const res = await api.client.post<ApiResponse<AuthResponse>>(
                "/auth/refresh",
                { refresh_token: token },
              );
              setToken(res.data.data);
              config._retried = false;
              config.headers!.Authorization = `Bearer ${res.data.data.access_token}`;

              return api.client(config);
            }
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async setToken(type: "access" | "refresh", token?: string) {
    switch (type) {
      case "access":
        this.client.defaults.headers.common["Authorization"] = token
          ? `Bearer ${token}`
          : undefined;
        break;
      case "refresh":
        if (token) {
          await asyncStorage.setItem(STORAGE_KEYS.refreshToken, token);
        } else {
          await asyncStorage.removeItem(STORAGE_KEYS.refreshToken);
        }
        break;
    }
  }

  async getSavedRefreshToken() {
    const token = await asyncStorage.getItem(STORAGE_KEYS.refreshToken);

    return token || undefined;
  }
}

export const api = new ApiNetwork();
