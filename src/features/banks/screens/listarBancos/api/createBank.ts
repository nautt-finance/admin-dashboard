import { Bank } from "@/features/banks/types";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { BankFormData } from "../_schema/bank.schema";

export const createBank = async (bank: BankFormData): Promise<Bank[]> => {
  const response = await api.post(endpoints.bank.create, {
    ...bank,
  });
  return response.data.dados;
};
