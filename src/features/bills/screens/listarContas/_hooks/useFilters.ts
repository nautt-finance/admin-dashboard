import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filtersSchema, FiltersFormData } from "../_schema/filters.schema";
import { Bill } from "@/features/bills/types";

export const useFilters = () => {
  const form = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      category: "",
    },
  });

  const applyFilters = (bills: Bill[], filters: FiltersFormData): Bill[] => {
    let filteredBills = [...bills];

    // Filtro por data inicial
    if (filters.startDate) {
      filteredBills = filteredBills.filter(
        (bill) => new Date(bill.dueDate) >= new Date(filters.startDate!)
      );
    }

    // Filtro por data final
    if (filters.endDate) {
      filteredBills = filteredBills.filter(
        (bill) => new Date(bill.dueDate) <= new Date(filters.endDate!)
      );
    }

    // Filtro por categoria
    if (filters.category) {
      filteredBills = filteredBills.filter((bill) =>
        bill.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    return filteredBills;
  };

  const clearFilters = () => {
    form.reset({
      startDate: "",
      endDate: "",
      category: "",
    });
  };

  return {
    form,
    applyFilters,
    clearFilters,
  };
};
