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
import { SelectField } from "@/components/Form/SelectField";
import { DateField } from "@/components/Form/DateField";
import { useExpenseForm, ExpenseWithId } from "../../_hooks/useExpenseForm";
import { useEffect } from "react";
import { formatDateForInput } from "@/lib/formatters/dateFormatter";

interface CoinOption {
  value: string;
  label: string;
}

interface BankOption {
  value: string;
  label: string;
}

interface ExpenseModalProps {
  open: boolean;
  expense?: ExpenseWithId;
  onOpenChange: (open: boolean) => void;
  coinOptions?: CoinOption[];
  bankOptions?: BankOption[];
}

const ExpenseModal = ({
  open,
  expense,
  onOpenChange,
  coinOptions = [],
  bankOptions = [],
}: ExpenseModalProps) => {
  const { formValues, onSubmit, isLoading } = useExpenseForm(expense);

  const { handleSubmit: hookHandleSubmit, reset } = formValues;

  useEffect(() => {
    if (expense) {
      reset({
        data_pagamento: formatDateForInput(expense.data_pagamento),
        moeda_id: expense.moeda_id,
        banco_id: expense.banco_id,
        destinatario: expense.destinatario,
        documento_destinatario: expense.documento_destinatario,
        descricao: expense.descricao,
        observacao: expense.observacao,
        valor: expense.valor,
        cotacao: expense.cotacao,
        tipo: expense.tipo,
        departamento: expense.departamento,
      });
    } else {
      reset({
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
      });
    }
  }, [expense, reset]);

  const handleSubmitForm = async () => {
    await onSubmit();
    onOpenChange(false);
  };

  const tipoOptions = [
    { value: "direta", label: "Direta" },
    { value: "indireta", label: "Indireta" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {expense ? "Editar Despesa" : "Cadastrar Nova Despesa"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...formValues}>
          <form
            onSubmit={hookHandleSubmit(handleSubmitForm)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateField
                label="Data de Pagamento"
                name="data_pagamento"
                required
              />

              <SelectField
                label="Moeda"
                name="moeda_id"
                options={coinOptions}
                placeholder="Selecione a moeda"
              />

              <SelectField
                label="Banco"
                name="banco_id"
                options={bankOptions}
                placeholder="Selecione o banco"
              />

              <TextField
                label="Destinatário"
                name="destinatario"
                placeholder="Nome do destinatário"
                required
              />

              <TextField
                label="Documento do Destinatário"
                name="documento_destinatario"
                placeholder="Digite o documento"
                required
              />

              <TextField
                label="Descrição"
                name="descricao"
                placeholder="Descrição da despesa"
                required
              />

              <TextField
                label="Valor"
                name="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                required
              />

              <TextField
                label="Cotação"
                name="cotacao"
                type="number"
                step="0.01"
                placeholder="1,00"
                required
              />

              <SelectField
                label="Tipo"
                name="tipo"
                options={tipoOptions}
                placeholder="Selecione o tipo"
              />

              <TextField
                label="Departamento"
                name="departamento"
                placeholder="Nome do departamento"
                required
              />
            </div>

            <TextField
              label="Observação"
              name="observacao"
              placeholder="Observações adicionais (opcional)"
            />

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
                  ? expense
                    ? "Salvando..."
                    : "Cadastrando..."
                  : expense
                    ? "Salvar Alterações"
                    : "Cadastrar Despesa"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { ExpenseModal };
