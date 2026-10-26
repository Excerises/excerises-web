import { AxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getError(error: any) {
  let message: string = error;

  if (error instanceof AxiosError) {
    message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data;
  }

  return message || "Something went wrong.";
}
