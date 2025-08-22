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
import { useExpenseForm } from "../../_hooks/useExpenseForm";

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
  onOpenChange: (open: boolean) => void;
  coinOptions?: CoinOption[];
  bankOptions?: BankOption[];
}

const ExpenseModal = ({
  open,
  onOpenChange,
  coinOptions = [],
  bankOptions = [],
}: ExpenseModalProps) => {
  const { formValues, onSubmit, isLoading } = useExpenseForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          <DialogTitle>Cadastrar Nova Despesa</DialogTitle>
        </DialogHeader>

        <FormProvider {...formValues}>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                {isLoading ? "Cadastrando..." : "Cadastrar Despesa"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { ExpenseModal };
