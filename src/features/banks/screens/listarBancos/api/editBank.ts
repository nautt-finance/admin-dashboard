import { Bank } from "@/features/banks/types";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { BankFormData } from "../_schema/bank.schema";

export const editBank = async (
  id: string,
  bank: BankFormData
): Promise<Bank[]> => {
  const response = await api.put(endpoints.bank.update(id), { ...bank });
  return response.data.dados;
};
