import { z } from "zod";

export const apiSchema = z.object({
  name: z.string().max(500, "El nombre debe tener máximo 500 caracteres"),
  description: z.string().max(500, "La descripción debe tener máximo 500 caracteres"),
  category: z.string().max(500, "La categoría debe tener máximo 500 caracteres"),
  endpoint: z.string().min(1, "El endpoint es requerido"),
  json: z.any(), // Puede ser objeto o string, depende de tu uso
  preview: z.string().max(500, "El preview debe tener máximo 500 caracteres"),
});

export function validateApi(input) {
  return apiSchema.safeParse(input);
}