import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/network/api";
import {
  ApiResponse,
  UpdateProfileAuthRequest,
  UpdateProfileRequest,
} from "@/types/api";
import { User } from "@/types/model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (req: UpdateProfileRequest) => {
      const res = await api.client.patch<ApiResponse<User>>("/profile", req);
      await queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}

export function useUpdateProfileAuth() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-profile-auth"],
    mutationFn: async (req: UpdateProfileAuthRequest) => {
      const res = await api.client.patch<ApiResponse<User>>(
        "/profile/auth",
        req,
      );
      await queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}

export function useUpdateProfileAuthForm() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "name is required"),
        email: z.email().min(1, "email is required"),
        password: z.string(),
        password_confirmation: z.string(),
      }),
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  return form;
}
