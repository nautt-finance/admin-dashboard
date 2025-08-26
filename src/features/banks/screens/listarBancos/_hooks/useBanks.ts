import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
      toast.success("Banco excluído com sucesso!", {
        description: "O banco foi removido da lista.",
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.error("Erro ao excluir banco", {
        description:
          "Ocorreu um erro ao tentar excluir o banco. Tente novamente.",
        duration: 4000,
      });
    }
  };

  return {
    banks,
    handleDeleteBank,
    isLoading,
    error,
  };
};
