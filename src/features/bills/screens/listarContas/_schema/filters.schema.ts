import { z } from "zod";

export const filtersSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  category: z.string().optional(),
});

export type FiltersFormData = z.infer<typeof filtersSchema>;
