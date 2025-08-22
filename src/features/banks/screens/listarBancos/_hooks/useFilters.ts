import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filtersSchema, FiltersFormData } from "../_schema/filters.schema";
import { Bank } from "@/features/banks/types";

export const useFilters = () => {
  const form = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      nome: "",
    },
  });

  const applyFilters = (banks: Bank[], filters: FiltersFormData): Bank[] => {
    let filteredBills = [...banks];
    if (filters.nome) {
      filteredBills = filteredBills.filter((bill) =>
        bill.nome.toLowerCase().includes(filters.nome!.toLowerCase())
      );
    }

    return filteredBills;
  };

  const clearFilters = () => {
    form.reset({
      nome: "",
    });
  };

  return {
    form,
    applyFilters,
    clearFilters,
  };
};
