import { Bank } from "@/features/banks/types";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { FiltersFormData } from "../_schema/filters.schema";

export const getBills = async (filters?: FiltersFormData): Promise<Bank[]> => {
  const response = await api.get(endpoints.bills.list, { params: filters });
  return response.data.dados;
};
