import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, ExpenseFormData } from "../_schema/expense.schema";
import { endpoints } from "@/lib/endpoints";
import { api } from "@/lib/api";

export const useExpenseForm = () => {
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

  const { formState, handleSubmit, reset } = formValues;
  const { isSubmitting } = formState;

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      const formattedData = {
        ...data,
        moeda_id: Number(data.moeda_id),
        banco_id: Number(data.banco_id),
        valor: Number(data.valor),
        cotacao: Number(data.cotacao),
      };
      await api.post(endpoints.bills.create, formattedData);
      console.log("Dados da despesa:", formattedData);
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
