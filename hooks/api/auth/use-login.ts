import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ApiResponse, AuthResponse } from "@/types/api";
import { useSetAuthToken } from "./use-set-auth-token";

const schema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginRequest = z.infer<typeof schema>;

export function useLogin() {
  const { setToken } = useSetAuthToken();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (req: LoginRequest) => {
      const res = await api.client.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        req,
      );

      await setToken(res.data.data);
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}

export function useLoginForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
}
