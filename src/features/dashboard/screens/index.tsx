"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RevenueExpenseChart } from "./dashboardScreen/_components/RevenueExpenseChart";
import { PeriodType } from "@/components/ui/period-filter";
import { mockData } from "./dashboardScreen/_components/CashflowSummary/_data/mockData";
import { CashflowKpis } from "./dashboardScreen/_components/CashflowSummary/_components/CashflowKpis";

const DashboardScreen: React.FC = () => {
  const t = useTranslations("DashboardPage");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("monthly");

  const currentData = mockData[selectedPeriod];
  const totalIncome = currentData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = currentData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background p-6 container w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <CashflowKpis
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBalance={totalBalance}
        />

        <div className="flex flex-col gap-8">
          <RevenueExpenseChart />
        </div>
      </div>
    </div>
  );
};

export { DashboardScreen };
