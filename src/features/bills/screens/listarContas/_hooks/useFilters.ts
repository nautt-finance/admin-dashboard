import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filtersSchema, FiltersFormData } from "../_schema/filters.schema";

export const useFilters = () => {
  const form = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      termo: "",
    },
  });

  const clearFilters = () => {
    form.reset({
      termo: "",
    });
  };

  return {
    form,
    clearFilters,
  };
};
