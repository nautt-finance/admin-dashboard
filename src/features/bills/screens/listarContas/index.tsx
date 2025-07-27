"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BillsTable } from "./_components/BillsTable";
import { BillsKpis } from "./_components/BillsKpis";
import { BillsFilters } from "./_components/BillsFilters";
import { useBills } from "./_hooks/useBills";
import { useFilters } from "./_hooks/useFilters";
import { FiltersFormData } from "./_schema/filters.schema";

const ListarContasScreen = () => {
  const { form, clearFilters } = useFilters();

  // Observa os valores do formulário em tempo real
  const formValues = form.watch();

  const {
    bills,
    isLoading,
    error,
    getTotalAmount,
    getPendingBills,
    getOverdueBills,
    getPaidBills,
  } = useBills(formValues);

  const handleApplyFilters = (filters: FiltersFormData) => {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Contas a Pagar
          </h1>
          <p className="text-muted-foreground">
            Gerencie e visualize todas as suas contas a pagar em um só lugar
          </p>
        </div>
        <BillsFilters
          form={form}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        <BillsKpis
          totalAmount={getTotalAmount()}
          pendingCount={getPendingBills().length}
          overdueCount={getOverdueBills().length}
          paidCount={getPaidBills().length}
        />
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contas</CardTitle>
            <p className="text-sm text-muted-foreground">
              {bills.length}{" "}
              {bills.length === 1 ? "conta encontrada" : "contas encontradas"}
            </p>
          </CardHeader>
          <CardContent>
            <BillsTable bills={bills} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ListarContasScreen };
