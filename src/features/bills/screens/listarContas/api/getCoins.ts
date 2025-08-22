import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { Coin } from "../_types/types";

export const getCoins = async (): Promise<Coin[]> => {
  const response = await api.get(endpoints.coins.list);
  return response.data.dados;
};
