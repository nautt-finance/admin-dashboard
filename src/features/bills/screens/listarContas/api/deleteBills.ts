import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export const deleteBills = async (id: string) => {
  const response = await api.delete(endpoints.bills.delete(id));
  return response.data.dados;
};
