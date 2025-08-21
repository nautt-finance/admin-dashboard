import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiltersFormData } from "../_schema/filters.schema";
import { getBanks } from "../api/getBanks";
import { useDebounce } from "@/hooks/useDebounce";
import { deleteBank } from "../api/deleteBanks";

export const useBanks = (filters?: FiltersFormData) => {
  const debouncedFilters = useDebounce(filters, 500);
  const queryClient = useQueryClient();

  const {
    data: banks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-banks-items", debouncedFilters],
    queryFn: () => getBanks(debouncedFilters),
  });

  const handleDeleteBank = async (id: string) => {
    try {
      await deleteBank(id);
      queryClient.invalidateQueries({ queryKey: ["get-banks-items"] });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    banks,
    handleDeleteBank,
    isLoading,
    error,
  };
};
