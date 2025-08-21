import { Bank } from "@/features/banks/types";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export const deleteBank = async (id: string): Promise<Bank[]> => {
  const response = await api.delete(endpoints.bank.delete(id));
  return response.data.dados;
};
