"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Bill {
  id: string;
  recipient: string;
  description: string;
  amount: number;
  dueDate: Date;
  status: "pending" | "paid" | "overdue";
  category: string;
  frequency: "once" | "monthly" | "quarterly" | "yearly";
  observations?: string;
}

interface DueAlertsProps {
  className?: string;
}

const DueAlerts = ({ className }: DueAlertsProps) => {
  const [sortBy, setSortBy] = useState<"dueDate" | "amount">("dueDate");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "overdue"
  >("all");

  // Dados mock - em produção viriam de uma API
  const bills: Bill[] = [
    {
      id: "1",
      recipient: "Fornecedor ABC",
      description: "Material de escritório",
      amount: 2500.0,
      dueDate: new Date("2024-12-20"),
      status: "pending",
      category: "Operacional",
      frequency: "monthly",
      observations: "Pagamento recorrente",
    },
    {
      id: "2",
      recipient: "Energia SP",
      description: "Conta de luz",
      amount: 1200.0,
      dueDate: new Date("2024-12-18"),
      status: "overdue",
      category: "Utilidades",
      frequency: "monthly",
    },
    {
      id: "3",
      recipient: "Locadora XYZ",
      description: "Aluguel do escritório",
      amount: 8000.0,
      dueDate: new Date("2024-12-22"),
      status: "pending",
      category: "Imobiliário",
      frequency: "monthly",
    },
    {
      id: "4",
      recipient: "Banco Central",
      description: "Empréstimo empresarial",
      amount: 15000.0,
      dueDate: new Date("2024-12-25"),
      status: "pending",
      category: "Financeiro",
      frequency: "monthly",
    },
    {
      id: "5",
      recipient: "Consultoria Tech",
      description: "Serviços de TI",
      amount: 5000.0,
      dueDate: new Date("2024-12-15"),
      status: "overdue",
      category: "Serviços",
      frequency: "once",
    },
  ];

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string, daysUntilDue: number) => {
    if (status === "paid") {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Pago
        </Badge>
      );
    }
    if (status === "overdue" || daysUntilDue < 0) {
      return <Badge variant="destructive">Vencido</Badge>;
    }
    if (daysUntilDue <= 3) {
      return <Badge variant="destructive">Urgente</Badge>;
    }
    if (daysUntilDue <= 7) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Atenção
        </Badge>
      );
    }
    return <Badge variant="outline">Pendente</Badge>;
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "once":
        return "Uma vez";
      case "monthly":
        return "Mensal";
      case "quarterly":
        return "Trimestral";
      case "yearly":
        return "Anual";
      default:
        return frequency;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const filteredBills = bills.filter((bill) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "overdue")
      return bill.status === "overdue" || getDaysUntilDue(bill.dueDate) < 0;
    return bill.status === filterStatus;
  });

  const sortedBills = [...filteredBills].sort((a, b) => {
    if (sortBy === "dueDate") {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    return b.amount - a.amount;
  });

  const columns: Column<Bill>[] = [
    {
      header: "Destinatário",
      accessor: "recipient",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.description}</div>
        </div>
      ),
    },
    {
      header: "Valor",
      accessor: "amount",
      render: (value) => (
        <div className="font-medium">{formatCurrency(value)}</div>
      ),
    },
    {
      header: "Vencimento",
      accessor: "dueDate",
      render: (value, row) => {
        const daysUntilDue = getDaysUntilDue(value);
        return (
          <div>
            <div className="font-medium">{formatDate(value)}</div>
            <div
              className={cn(
                "text-sm",
                daysUntilDue < 0
                  ? "text-red-600"
                  : daysUntilDue <= 3
                    ? "text-red-600"
                    : daysUntilDue <= 7
                      ? "text-yellow-600"
                      : "text-muted-foreground"
              )}
            >
              {daysUntilDue < 0
                ? `${Math.abs(daysUntilDue)} dias em atraso`
                : daysUntilDue === 0
                  ? "Vence hoje"
                  : `${daysUntilDue} dias`}
            </div>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      render: (value, row) =>
        getStatusBadge(value, getDaysUntilDue(row.dueDate)),
    },
    {
      header: "Frequência",
      accessor: "frequency",
      render: (value) => (
        <div className="text-sm">{getFrequencyText(value)}</div>
      ),
    },
    {
      header: "Categoria",
      accessor: "category",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
  ];

  const totalPending = sortedBills
    .filter((bill) => bill.status === "pending")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalOverdue = sortedBills
    .filter(
      (bill) => bill.status === "overdue" || getDaysUntilDue(bill.dueDate) < 0
    )
    .reduce((sum, bill) => sum + bill.amount, 0);

  const urgentCount = sortedBills.filter(
    (bill) => getDaysUntilDue(bill.dueDate) <= 3 && bill.status !== "paid"
  ).length;

  return (
    <div className={className}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Alertas de Vencimento</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>

        {/* Resumo dos alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contas Urgentes</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-100">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pendente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(totalPending)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vencido</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalOverdue)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabela de contas a pagar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Contas a Pagar</h3>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                Todas
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pendentes
              </Button>
              <Button
                variant={filterStatus === "overdue" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("overdue")}
              >
                Vencidas
              </Button>
              <Button
                variant={sortBy === "dueDate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("dueDate")}
              >
                Por Data
              </Button>
              <Button
                variant={sortBy === "amount" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("amount")}
              >
                Por Valor
              </Button>
            </div>
          </div>

          <DataTable data={sortedBills} columns={columns} className="mb-4" />

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Mostrando {sortedBills.length} de {bills.length} contas
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { DueAlerts };
