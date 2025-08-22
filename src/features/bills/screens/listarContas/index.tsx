"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BillsTable } from "./_components/BillsTable";
import { BillsFilters } from "./_components/BillsFilters";
import { ExpenseModal } from "./_components/ExpenseModal";
import { useBills } from "./_hooks/useBills";
import { useFilters } from "./_hooks/useFilters";
import { FiltersFormData } from "./_schema/filters.schema";

const ListarContasScreen = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage] = useState(20);
  const { form, clearFilters } = useFilters();

  const formValues = form.watch();

  const {
    bills,
    coins,
    bankOptions,
    isLoading,
    error,
    total,
    currentPage,
    lastPage,
    from,
    to,
  } = useBills(formValues, currentPageState, itemsPerPage);

  useEffect(() => {
    setCurrentPageState(1);
  }, [formValues]);

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
              <p className="text-muted-foreground">
                {error.message || "Erro ao carregar as contas"}
              </p>
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Contas</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {bills?.length}{" "}
                  {bills?.length === 1
                    ? "conta encontrada"
                    : "contas encontradas"}
                </p>
              </div>
              <Button onClick={() => setIsExpenseModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Despesa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BillsTable
              bills={bills || []}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={(page) => {
                setCurrentPageState(page);
              }}
              from={from}
              to={to}
              total={total}
            />
          </CardContent>
        </Card>

        <ExpenseModal
          open={isExpenseModalOpen}
          onOpenChange={setIsExpenseModalOpen}
          coinOptions={coins}
          bankOptions={bankOptions}
        />
      </div>
    </div>
  );
};

export { ListarContasScreen };
