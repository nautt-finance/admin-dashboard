import { FiltersFormData } from "../_schema/filters.schema";
import { useBanks } from "@/features/banks/screens/listarBancos/_hooks/useBanks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getBills } from "../api/getBills";
import { useGetCoins } from "./useGetCoins";
import { useMemo } from "react";
import { toast } from "sonner";
import { deleteBills } from "../api/deleteBills";

export const useBills = (
  filters?: FiltersFormData,
  pagina?: number,
  itens_pagina: number = 20
) => {
  const { banks } = useBanks();
  const { coins: rawCoins } = useGetCoins();
  const debouncedFilters = useDebounce(filters, 500);
  const queryClient = useQueryClient();

  const {
    data: billsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-bills-items", debouncedFilters, pagina, itens_pagina],
    queryFn: () => getBills(debouncedFilters, pagina, itens_pagina),
  });

  const coins = useMemo(() => {
    if (!rawCoins) return [];
    return rawCoins.map((coin) => ({
      value: coin.id.toString(),
      label: coin.nome,
    }));
  }, [rawCoins]);

  const bankOptions = useMemo(() => {
    if (!banks) return [];
    return banks.map((bank) => ({
      value: bank.id.toString(),
      label: bank.nome,
    }));
  }, [banks]);

  const handleDeleteBills = async (id: string) => {
    try {
      await deleteBills(id);
      await queryClient.invalidateQueries({ queryKey: ["get-bills-items"] });
      toast.success("Conta excluída com sucesso!", {
        description: "A conta foi removida da lista.",
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.error("Erro ao excluir conta", {
        description:
          "Ocorreu um erro ao tentar excluir a conta. Tente novamente.",
        duration: 4000,
      });
    }
  };

  return {
    bills: billsResponse?.data,
    total: billsResponse?.total,
    currentPage: billsResponse?.current_page,
    perPage: billsResponse?.per_page,
    lastPage: billsResponse?.last_page,
    from: billsResponse?.from,
    to: billsResponse?.to,
    nextPage: billsResponse?.next_page_url,
    prevPage: billsResponse?.prev_page_url,
    itens_pagina,
    banks,
    bankOptions,
    coins,
    isLoading,
    error,
    getTotalAmount: 0,
    getPendingBills: 0,
    getOverdueBills: 0,
    getPaidBills: 0,
    handleDeleteBills,
  };
};
