import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { endpoints } from "@/lib/endpoints";
import { api } from "@/lib/api";
import { BankFormData, bankSchema } from "../_schema/bank.schema";

export const useBanksForm = () => {
  const formValues = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      nome: "",
    },
  });

  const { formState, handleSubmit, reset } = formValues;
  const { isSubmitting } = formState;

  const onSubmit = async (data: BankFormData) => {
    try {
      await api.post(endpoints.bank.create, { ...data });
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar despesa:", error);
    }
  };

  return {
    formValues,
    onSubmit: handleSubmit(onSubmit),
    isLoading: isSubmitting,
  };
};
