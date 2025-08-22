import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BankFormData, bankSchema } from "../_schema/bank.schema";
import { useQueryClient } from "@tanstack/react-query";
import { editBank } from "../api/editBank";
import { createBank } from "../api/createBank";

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
      createBank(data);
      reset();
      queryClient.invalidateQueries({ queryKey: ["get-banks-items"] });
      toast.success("Banco cadastrado com sucesso!", {
        description: "O banco foi adicionado à lista.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Erro ao cadastrar banco:", error);
      toast.error("Erro ao cadastrar banco", {
        description:
          "Ocorreu um erro ao tentar cadastrar o banco. Tente novamente.",
        duration: 4000,
      });
    }
  };

  const handleEditBank = async (id: string, bank: BankFormData) => {
    try {
      await editBank(id, bank);
      reset();
      queryClient.invalidateQueries({ queryKey: ["get-banks-items"] });
      toast.success("Banco editado com sucesso!", {
        description: "As informações do banco foram atualizadas.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Erro ao editar banco:", error);
      toast.error("Erro ao editar banco", {
        description:
          "Ocorreu um erro ao tentar editar o banco. Tente novamente.",
        duration: 4000,
      });
    }
  };

  return {
    formValues,
    onEdit: handleEditBank,
    onSubmit: onSubmit,
    isLoading: isSubmitting,
  };
};
