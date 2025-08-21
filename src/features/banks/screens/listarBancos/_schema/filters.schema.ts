import { z } from "zod";

export const filtersSchema = z.object({
  nome: z.string().optional(),
});

export type FiltersFormData = z.infer<typeof filtersSchema>;
