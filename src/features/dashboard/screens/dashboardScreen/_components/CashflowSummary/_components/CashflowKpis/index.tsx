"use client";

import { KpiCard } from "@/components/ui/kpi-card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface CashflowKpisProps {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const CashflowKpis = ({
  totalIncome,
  totalExpenses,
  totalBalance,
}: CashflowKpisProps) => {
  return (
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
  );
};

export { CashflowKpis };
