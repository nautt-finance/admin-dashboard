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

interface BankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BankModal = ({ open, onOpenChange }: BankModalProps) => {
  const { formValues, onSubmit, isLoading } = useBanksForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Banco</DialogTitle>
        </DialogHeader>

        <FormProvider {...formValues}>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                {isLoading ? "Cadastrando..." : "Cadastrar Banco"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { BankModal };
