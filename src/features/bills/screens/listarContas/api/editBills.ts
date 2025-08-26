import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { ExpenseApiData } from "../_schema/expense.schema";
import { Bill } from "../_types/types";

export const editBills = async (
  id: string,
  bills: ExpenseApiData
): Promise<Bill> => {
  const response = await api.put(endpoints.bills.update, {
    ...bills,
    despesa_id: id,
  });
  return response.data.dados;
};
