import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseSchema,
  ExpenseFormData,
  ExpenseApiData,
} from "../_schema/expense.schema";
import { editBills } from "../api/editBills";
import { createBills } from "../api/createBills";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ExpenseWithId extends ExpenseFormData {
  id: string;
}

export const useExpenseForm = (currentExpense?: ExpenseWithId) => {
  const formValues = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      data_pagamento: "",
      moeda_id: "1",
      banco_id: "1",
      destinatario: "",
      documento_destinatario: "",
      descricao: "",
      observacao: "",
      valor: "1",
      cotacao: "1",
      tipo: "direta" as const,
      departamento: "",
    },
  });
  const queryClient = useQueryClient();
  const { formState, handleSubmit, reset } = formValues;
  const { isSubmitting } = formState;

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      const formattedData: ExpenseApiData = {
        ...data,
        moeda_id: Number(data.moeda_id),
        banco_id: Number(data.banco_id),
        valor: Number(data.valor),
        cotacao: Number(data.cotacao),
      };

      if (currentExpense) {
        await editBills(currentExpense.id, formattedData);
      } else {
        await createBills(formattedData);
      }
      await queryClient.invalidateQueries({ queryKey: ["get-bills-items"] });
      toast.success("Despesa salva com sucesso!", {
        description: "A despesa foi salva com sucesso.",
        duration: 3000,
      });
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
