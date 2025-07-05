"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PeriodFilter, type PeriodType } from "@/components/ui/period-filter";
import { KpiCard } from "@/components/ui/kpi-card";
import { BarChart } from "@/components/charts";
import { ChartConfig } from "@/components/ui/chart";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface CashflowData {
  period: string;
  income: number;
  expenses: number;
  balance: number;
}

interface CashflowSummaryProps {
  className?: string;
}

const CashflowSummary = ({ className }: CashflowSummaryProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("monthly");

  // Dados mock - em produção viriam de uma API
  const mockData: Record<PeriodType, CashflowData[]> = {
    daily: [
      { period: "Seg", income: 15000, expenses: 8000, balance: 7000 },
      { period: "Ter", income: 12000, expenses: 6000, balance: 6000 },
      { period: "Qua", income: 18000, expenses: 9000, balance: 9000 },
      { period: "Qui", income: 16000, expenses: 7000, balance: 9000 },
      { period: "Sex", income: 22000, expenses: 10000, balance: 12000 },
      { period: "Sáb", income: 8000, expenses: 4000, balance: 4000 },
      { period: "Dom", income: 5000, expenses: 2000, balance: 3000 },
    ],
    weekly: [
      { period: "Sem 1", income: 45000, expenses: 25000, balance: 20000 },
      { period: "Sem 2", income: 52000, expenses: 28000, balance: 24000 },
      { period: "Sem 3", income: 48000, expenses: 26000, balance: 22000 },
      { period: "Sem 4", income: 55000, expenses: 30000, balance: 25000 },
    ],
    monthly: [
      { period: "Jan", income: 120000, expenses: 80000, balance: 40000 },
      { period: "Fev", income: 135000, expenses: 85000, balance: 50000 },
      { period: "Mar", income: 142000, expenses: 88000, balance: 54000 },
      { period: "Abr", income: 155000, expenses: 92000, balance: 63000 },
      { period: "Mai", income: 148000, expenses: 90000, balance: 58000 },
      { period: "Jun", income: 162000, expenses: 95000, balance: 67000 },
    ],
    yearly: [
      { period: "2021", income: 1200000, expenses: 800000, balance: 400000 },
      { period: "2022", income: 1450000, expenses: 950000, balance: 500000 },
      { period: "2023", income: 1680000, expenses: 1100000, balance: 580000 },
      { period: "2024", income: 1850000, expenses: 1200000, balance: 650000 },
    ],
  };

  const currentData = mockData[selectedPeriod];
  const totalIncome = currentData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = currentData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );
  const totalBalance = totalIncome - totalExpenses;

  const chartConfig: ChartConfig = {
    income: {
      label: "Receitas",
      color: "#10b981",
    },
    expenses: {
      label: "Despesas",
      color: "#ef4444",
    },
    balance: {
      label: "Saldo",
      color: "#3b82f6",
    },
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Fluxo de Caixa</h2>
          <PeriodFilter
            selected={selectedPeriod}
            onSelect={setSelectedPeriod}
          />
        </div>

        {/* KPIs do Fluxo de Caixa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard
            title="Total de Receitas"
            value={totalIncome}
            format="currency"
            icon={TrendingUp}
            change={12.5}
            changeType="increase"
          />
          <KpiCard
            title="Total de Despesas"
            value={totalExpenses}
            format="currency"
            icon={TrendingDown}
            change={-5.2}
            changeType="decrease"
          />
          <KpiCard
            title="Saldo Líquido"
            value={totalBalance}
            format="currency"
            icon={DollarSign}
            change={8.7}
            changeType="increase"
          />
        </div>

        {/* Gráfico do Fluxo de Caixa */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Resumo do Fluxo de Caixa -{" "}
            {selectedPeriod === "daily"
              ? "Diário"
              : selectedPeriod === "weekly"
                ? "Semanal"
                : selectedPeriod === "monthly"
                  ? "Mensal"
                  : "Anual"}
          </h3>
          <BarChart
            data={currentData}
            config={chartConfig}
            xAxisKey="period"
            yAxisKeys={["income", "expenses", "balance"]}
            className="h-80"
          />
        </Card>
      </div>
    </div>
  );
};

export { CashflowSummary };
