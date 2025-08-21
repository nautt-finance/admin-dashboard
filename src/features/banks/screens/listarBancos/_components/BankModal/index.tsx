"use client";

import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/Form/TextField";
import { useBanksForm } from "../../_hooks/useBankForm";
import { BankFormData } from "../../_schema/bank.schema";
import { Bank } from "@/features/banks/types";
import { useEffect } from "react";

interface BankModalProps {
  open: boolean;
  bank?: Bank;
  onOpenChange: (open: boolean) => void;
}

const BankModal = ({ open, bank, onOpenChange }: BankModalProps) => {
  const { formValues, onSubmit, isLoading, onEdit } = useBanksForm();

  const { handleSubmit, reset } = formValues;

  useEffect(() => {
    if (bank) {
      reset({
        nome: bank.nome,
      });
    } else {
      reset({
        nome: "",
      });
    }
  }, [bank, reset]);

  const handleSubmitForm = async (data: BankFormData) => {
    if (bank) {
      await onEdit(bank.id, data);
    } else {
      await onSubmit(data);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{bank ? "Editar Banco" : "Cadastrar Banco"}</DialogTitle>
        </DialogHeader>

        <FormProvider {...formValues}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            <div className="w-full">
              <TextField
                label="Nome"
                name="nome"
                placeholder="Nome do banco"
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? bank
                    ? "Salvando..."
                    : "Cadastrando..."
                  : bank
                    ? "Salvar Alterações"
                    : "Cadastrar Banco"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { BankModal };
