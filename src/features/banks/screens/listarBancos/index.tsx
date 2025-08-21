"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BanksFilters } from "./_components/BanksFilters";
import { BankModal } from "./_components/BankModal";
import { useBanks } from "./_hooks/useBanks";
import { useFilters } from "./_hooks/useFilters";
import { FiltersFormData } from "./_schema/filters.schema";
import { BanksTable } from "./_components/BanksTable";
import { Bank } from "../../types";

const ListarBancosScreen = () => {
  const [isBankModalOpen, setBankModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>(undefined);
  const { form, clearFilters } = useFilters();

  const formValues = form.watch();

  const { banks, handleDeleteBank, isLoading, error } = useBanks(formValues);

  const handleApplyFilters = (_filters: FiltersFormData) => {
    // TODO: Implementar a lógica de aplicação dos filtros
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleEditBank = (bank: Bank) => {
    setSelectedBank(bank);
    setBankModalOpen(true);
  };

  const handleNewBank = () => {
    setSelectedBank(undefined);
    setBankModalOpen(true);
  };

  const handleCloseModal = (open: boolean) => {
    setBankModalOpen(open);
    if (!open) {
      setSelectedBank(undefined);
    }
  };

  const handleDeleteBankAction = async (id: string) => {
    await handleDeleteBank(id);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-2">Erro</h2>
              <p className="text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bancos</h1>
          <p className="text-muted-foreground">
            Gerencie e visualize todos os seus bancos em um só lugar
          </p>
        </div>
        <BanksFilters
          form={form}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Bancos</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {banks?.length}{" "}
                  {banks?.length === 1
                    ? "banco encontrado"
                    : "bancos encontrados"}
                </p>
              </div>
              <Button onClick={handleNewBank}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Banco
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BanksTable
              banks={banks || []}
              isLoading={isLoading}
              onEdit={handleEditBank}
              onDelete={handleDeleteBankAction}
            />
          </CardContent>
        </Card>

        <BankModal
          open={isBankModalOpen}
          bank={selectedBank}
          onOpenChange={handleCloseModal}
        />
      </div>
    </div>
  );
};

export { ListarBancosScreen };
