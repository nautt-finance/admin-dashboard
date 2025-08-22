import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { FiltersFormData } from "../_schema/filters.schema";
import { Bill } from "@/features/bills/screens/listarContas/_types/types";
import { PaginatedApiResponse } from "@/types/paginatedApi";

export const getBills = async (
  filters?: FiltersFormData
): Promise<PaginatedApiResponse<Bill>> => {
  const response = await api.get(endpoints.bills.list, { params: filters });
  return response.data.dados;
};
