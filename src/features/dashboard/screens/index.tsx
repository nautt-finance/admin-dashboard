"use client";

import { useTranslations } from "next-intl";
import { CashflowSummary } from "./dashboardScreen/_components/CashflowSummary";
import { RevenueExpenseChart } from "./dashboardScreen/_components/RevenueExpenseChart";
import { LiquidityIndicators } from "./dashboardScreen/_components/LiquidityIndicators";
import { DueAlerts } from "./dashboardScreen/_components/DueAlerts";
import { BankAccountStatus } from "./dashboardScreen/_components/BankAccountStatus";

const DashboardScreen: React.FC = () => {
  const t = useTranslations("DashboardPage");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        {/* Layout principal com seções */}
        <div className="space-y-8">
          {/* Fluxo de Caixa */}
          <section>
            <CashflowSummary />
          </section>

          {/* Gráficos de Receitas vs Despesas */}
          <section>
            <RevenueExpenseChart />
          </section>

          {/* Grid com duas colunas para Liquidez e Alertas */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <LiquidityIndicators />
            </div>
            <div>
              <DueAlerts />
            </div>
          </section>

          {/* Status das Contas Bancárias */}
          <section>
            <BankAccountStatus />
          </section>
        </div>
      </div>
    </div>
  );
};

export { DashboardScreen };
