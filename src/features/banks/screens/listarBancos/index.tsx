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

const ListarBancosScreen = () => {
  const [isBankModalOpen, setBankModalOpen] = useState(false);
  const { form, clearFilters } = useFilters();

  const formValues = form.watch();

  const { banks, isLoading, error } = useBanks(formValues);

  const handleApplyFilters = (_filters: FiltersFormData) => {
    // TODO: Implementar a lógica de aplicação dos filtros
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-2">Erro</h2>
              <p className="text-muted-foreground">{error}</p>
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
                  {banks.length}{" "}
                  {banks.length === 1
                    ? "banco encontrado"
                    : "bancos encontrados"}
                </p>
              </div>
              <Button onClick={() => setBankModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Banco
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BanksTable banks={banks} isLoading={isLoading} />
          </CardContent>
        </Card>

        <BankModal open={isBankModalOpen} onOpenChange={setBankModalOpen} />
      </div>
    </div>
  );
};

export { ListarBancosScreen };
