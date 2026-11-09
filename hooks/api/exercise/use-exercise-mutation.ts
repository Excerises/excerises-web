import { api } from "@/network/api";
import {
  ApiResponse,
  ExerciseImportRequest,
  ExerciseImportResult,
} from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export function useImportExercise() {
  const mutation = useMutation({
    mutationKey: ["import-exercise"],
    mutationFn: async (req: ExerciseImportRequest) => {
      const formData = new FormData();
      formData.append("file", req.file);

      const res = await api.client.post<ApiResponse<ExerciseImportResult>>(
        "/admin/exercises/import",
        formData,
      );

      return res.data;
    },
  });

  return { mutation };
}
