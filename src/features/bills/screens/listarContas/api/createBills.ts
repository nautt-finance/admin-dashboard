import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { ExpenseApiData } from "../_schema/expense.schema";
import { Bill } from "../_types/types";

export const createBills = async (bills: ExpenseApiData): Promise<Bill> => {
  const response = await api.post(endpoints.bills.create, {
    ...bills,
  });
  return response.data.dados;
};
