import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Nome de usuário é obrigatório")
    .max(20, "Nome de usuário deve ter no máximo 20 caracteres"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
