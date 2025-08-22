import { FiltersFormData } from "../_schema/filters.schema";
import { useBanks } from "@/features/banks/screens/listarBancos/_hooks/useBanks";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getBills } from "../api/getBills";
import { useGetCoins } from "./useGetCoins";
import { useMemo } from "react";

export const useBills = (filters?: FiltersFormData) => {
  const { banks } = useBanks();
  const { coins: rawCoins } = useGetCoins();
  const debouncedFilters = useDebounce(filters, 500);

  const {
    data: bills,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-bills-items", debouncedFilters],
    queryFn: () => getBills(debouncedFilters),
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

  return {
    bills,
    banks,
    bankOptions,
    coins,
    isLoading,
    error,
    getTotalAmount: 0,
    getPendingBills: 0,
    getOverdueBills: 0,
    getPaidBills: 0,
  };
};
