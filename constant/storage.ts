export const asyncStorage = {
  async setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  },
  async getItem(key: string) {
    return localStorage.getItem(key);
  },
  async removeItem(key: string) {
    return localStorage.removeItem(key);
  },
};

export const STORAGE_KEYS = {
  hasOpenedApp: "has_opened_app",
  refreshToken: "refresh_token",
} as const;
