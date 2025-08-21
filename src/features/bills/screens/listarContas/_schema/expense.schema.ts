import { z } from "zod";

export const expenseSchema = z.object({
  data_pagamento: z.string().min(1, "Data de pagamento é obrigatória"),
  moeda_id: z.string().min(1, "Moeda é obrigatória"),
  banco_id: z.string().min(1, "Banco é obrigatório"),
  destinatario: z.string().min(1, "Destinatário é obrigatório"),
  documento_destinatario: z
    .string()
    .min(1, "Documento do destinatário é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  observacao: z.string().optional(),
  valor: z.string().min(1, "Valor é obrigatório"),
  cotacao: z.string().min(1, "Cotação é obrigatória"),
  tipo: z.enum(["direta", "indireta"], {
    required_error: "Tipo é obrigatório",
  }),
  departamento: z.string().min(1, "Departamento é obrigatório"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
