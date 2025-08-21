import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { endpoints } from "@/lib/endpoints";
import { api } from "@/lib/api";
import { BankFormData, bankSchema } from "../_schema/bank.schema";
import { useQueryClient } from "@tanstack/react-query";

export const useBanksForm = () => {
  const queryClient = useQueryClient();
  const formValues = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      nome: "",
    },
  });

  const { formState, reset } = formValues;
  const { isSubmitting } = formState;

  const onSubmit = async (data: BankFormData) => {
    try {
      await api.post(endpoints.bank.create, { ...data });
      reset();
      queryClient.invalidateQueries({ queryKey: ["get-banks-items"] });
    } catch (error) {
      console.error("Erro ao cadastrar despesa:", error);
    }
  };

  const handleEditBank = async (id: string, bank: BankFormData) => {
    try {
      await api.put(endpoints.bank.update(id), { ...bank });
      reset();
      queryClient.invalidateQueries({ queryKey: ["get-banks-items"] });
    } catch (error) {
      console.error("Erro ao editar banco:", error);
    }
  };

  return {
    formValues,
    onEdit: handleEditBank,
    onSubmit: onSubmit,
    isLoading: isSubmitting,
  };
};
