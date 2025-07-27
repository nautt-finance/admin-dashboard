import { useState, useEffect, useMemo } from "react";
import { mockBills } from "../_data/mockData";
import { Bill } from "@/features/bills/types";
import { FiltersFormData } from "../_schema/filters.schema";

export const useBills = (filters?: FiltersFormData) => {
  const [allBills, setAllBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBills = async () => {
      try {
        setIsLoading(true);
        // Simulando uma chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAllBills(mockBills);
      } catch (err) {
        setError("Erro ao carregar as contas");
      } finally {
        setIsLoading(false);
      }
    };

    loadBills();
  }, []);

  // Aplicar filtros de forma memoizada
  const filteredBills = useMemo(() => {
    if (!filters) return allBills;

    let filtered = [...allBills];

    // Filtro por data inicial
    if (filters.startDate) {
      filtered = filtered.filter(
        (bill) => new Date(bill.dueDate) >= new Date(filters.startDate!)
      );
    }

    // Filtro por data final
    if (filters.endDate) {
      filtered = filtered.filter(
        (bill) => new Date(bill.dueDate) <= new Date(filters.endDate!)
      );
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter((bill) =>
        bill.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    return filtered;
  }, [allBills, filters]);

  const getTotalAmount = () => {
    return filteredBills.reduce((total, bill) => total + bill.amount, 0);
  };

  const getPendingBills = () => {
    return filteredBills.filter((bill) => bill.status === "pending");
  };

  const getOverdueBills = () => {
    return filteredBills.filter((bill) => bill.status === "overdue");
  };

  const getPaidBills = () => {
    return filteredBills.filter((bill) => bill.status === "paid");
  };

  return {
    bills: filteredBills,
    isLoading,
    error,
    getTotalAmount,
    getPendingBills,
    getOverdueBills,
    getPaidBills,
  };
};
