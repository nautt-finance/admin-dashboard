import { z } from "zod";

export const bankSchema = z.object({
  nome: z
    .string({ required_error: "Nome do banco é obrigatório" })
    .min(2, "Nome do banco deve ter no mínimo 2 caracteres"),
});

export type BankFormData = z.infer<typeof bankSchema>;
