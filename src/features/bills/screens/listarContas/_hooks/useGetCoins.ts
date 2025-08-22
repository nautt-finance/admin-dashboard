import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../api/getCoins";
import { Coin } from "../_types/types";

export const useGetCoins = () => {
  const { data: coins, isLoading } = useQuery<Coin[]>({
    queryKey: ["get-coins-items"],
    queryFn: () => getCoins(),
  });

  return {
    coins,
    isLoading,
  };
};
