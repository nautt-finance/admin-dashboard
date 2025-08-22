import { z } from "zod";

export const filtersSchema = z.object({
  termo: z.string().optional(),
});

export type FiltersFormData = z.infer<typeof filtersSchema>;
