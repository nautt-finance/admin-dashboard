import { useState, useEffect, useMemo } from "react";
import { FiltersFormData } from "../_schema/filters.schema";
import { Bank } from "@/features/banks/types";

export const useBanks = (filters?: FiltersFormData) => {
  const [allBanks, setAllBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBills = async () => {
      try {
        setIsLoading(true);
        // Simulando uma chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        setError("Erro ao carregar as contas");
      } finally {
        setIsLoading(false);
      }
    };

    loadBills();
  }, []);

  const filteredBanks = useMemo(() => {
    if (!filters) return allBanks;

    let filtered = [...allBanks];

    if (filters.nome) {
      filtered = filtered.filter((bank) =>
        bank.nome.toLowerCase().includes(filters.nome!.toLowerCase())
      );
    }

    return filtered;
  }, [allBanks, filters]);

  return {
    banks: filteredBanks,
    isLoading,
    error,
  };
};
