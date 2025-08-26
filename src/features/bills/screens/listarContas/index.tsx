"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BillsTable } from "./_components/BillsTable";
import { BillsFilters } from "./_components/BillsFilters";
import { ExpenseModal } from "./_components/ExpenseModal";
import { BillDetailsModal } from "./_components/BillDetailsModal";
import { useBills } from "./_hooks/useBills";
import { useFilters } from "./_hooks/useFilters";
import { FiltersFormData } from "./_schema/filters.schema";
import { Bill } from "./_types/types";
import { ExpenseWithId } from "./_hooks/useExpenseForm";
import { deleteBills } from "./api/deleteBills";

const ListarContasScreen = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBillDetailsModalOpen, setIsBillDetailsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | undefined>();
  const [editingExpense, setEditingExpense] = useState<
    ExpenseWithId | undefined
  >();
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

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
    setIsBillDetailsModalOpen(true);
  };

  const handleEditBill = (bill: Bill) => {
    const expenseWithId: ExpenseWithId = {
      id: bill.id.toString(),
      data_pagamento: bill.data_pagamento,
      moeda_id: bill.moeda_id.toString(),
      banco_id: bill.banco_id.toString(),
      destinatario: bill.destinatario,
      documento_destinatario: bill.documento_destinatario,
      descricao: bill.descricao,
      observacao: bill.observacao,
      valor: bill.valor,
      cotacao: "1",
      tipo: bill.tipo,
      departamento: bill.departamento,
    };
    setEditingExpense(expenseWithId);
    setIsExpenseModalOpen(true);
  };

  const handleDeleteBill = async (billId: number) => {
    try {
      await deleteBills(billId.toString());
      // Refresh the bills list by updating the current page state
      setCurrentPageState(currentPageState);
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  const handleCloseExpenseModal = (open: boolean) => {
    setIsExpenseModalOpen(open);
    if (!open) {
      setEditingExpense(undefined);
    }
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
              onView={handleViewBill}
              onEdit={handleEditBill}
              onDelete={handleDeleteBill}
            />
          </CardContent>
        </Card>

        <ExpenseModal
          open={isExpenseModalOpen}
          expense={editingExpense}
          onOpenChange={handleCloseExpenseModal}
          coinOptions={coins}
          bankOptions={bankOptions}
        />

        <BillDetailsModal
          open={isBillDetailsModalOpen}
          bill={selectedBill}
          onOpenChange={setIsBillDetailsModalOpen}
        />
      </div>
    </div>
  );
};

export { ListarContasScreen };
