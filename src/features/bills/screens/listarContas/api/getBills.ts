import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { FiltersFormData } from "../_schema/filters.schema";
import { Bill } from "@/features/bills/screens/listarContas/_types/types";
import { PaginatedApiResponse } from "@/types/paginatedApi";

export const getBills = async (
  filters?: FiltersFormData,
  pagina?: number,
  itens_pagina?: number
): Promise<PaginatedApiResponse<Bill>> => {
  const params = {
    ...filters,
    pagina,
    itens_pagina,
  };
  const response = await api.get(endpoints.bills.list, { params });
  return response.data.dados;
};
