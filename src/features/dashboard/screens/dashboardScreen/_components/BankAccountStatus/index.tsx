"use client";

import { Card } from "@/components/ui/card";
import {
  AccountStatus,
  type AccountType,
  type AccountStatusType,
} from "@/components/ui/account-status";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Plus, RefreshCw } from "lucide-react";

interface Account {
  id: string;
  name: string;
  type: AccountType;
  status: AccountStatusType;
  balance: number;
  lastSync: Date;
  institution: string;
  accountNumber?: string;
}

interface BankAccountStatusProps {
  className?: string;
}

const BankAccountStatus = ({ className }: BankAccountStatusProps) => {
  // Dados mock - em produção viriam de uma API
  const accounts: Account[] = [
    // Bancos
    {
      id: "1",
      name: "BTG Pactual",
      type: "bank",
      status: "connected",
      balance: 125000.0,
      lastSync: new Date("2024-12-17T10:30:00"),
      institution: "BTG Pactual",
      accountNumber: "****1234",
    },
    {
      id: "2",
      name: "Trace Bank",
      type: "bank",
      status: "connected",
      balance: 85000.0,
      lastSync: new Date("2024-12-17T09:45:00"),
      institution: "Trace Bank",
      accountNumber: "****5678",
    },
    {
      id: "3",
      name: "Itaú Empresarial",
      type: "bank",
      status: "disconnected",
      balance: 0,
      lastSync: new Date("2024-12-15T14:20:00"),
      institution: "Itaú",
      accountNumber: "****9012",
    },
    // Corretoras
    {
      id: "4",
      name: "Bybit",
      type: "broker",
      status: "connected",
      balance: 45000.0,
      lastSync: new Date("2024-12-17T11:15:00"),
      institution: "Bybit",
      accountNumber: "****crypto1",
    },
    {
      id: "5",
      name: "Bitso",
      type: "broker",
      status: "connected",
      balance: 32000.0,
      lastSync: new Date("2024-12-17T10:55:00"),
      institution: "Bitso",
      accountNumber: "****crypto2",
    },
    {
      id: "6",
      name: "Vita",
      type: "broker",
      status: "error",
      balance: 0,
      lastSync: new Date("2024-12-16T16:30:00"),
      institution: "Vita",
      accountNumber: "****crypto3",
    },
    {
      id: "7",
      name: "XP Investimentos",
      type: "broker",
      status: "connected",
      balance: 78000.0,
      lastSync: new Date("2024-12-17T11:00:00"),
      institution: "XP Investimentos",
      accountNumber: "****invest1",
    },
    {
      id: "8",
      name: "Rico Investimentos",
      type: "broker",
      status: "disconnected",
      balance: 0,
      lastSync: new Date("2024-12-14T13:45:00"),
      institution: "Rico",
      accountNumber: "****invest2",
    },
  ];

  const banks = accounts.filter((account) => account.type === "bank");
  const brokers = accounts.filter((account) => account.type === "broker");

  const connectedAccounts = accounts.filter(
    (account) => account.status === "connected"
  );
  const totalBalance = connectedAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  const getStatusCount = (status: AccountStatusType) => {
    return accounts.filter((account) => account.status === status).length;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Status das Contas</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta
            </Button>
          </div>
        </div>

        {/* Resumo geral */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Contas</p>
                <p className="text-2xl font-bold">{accounts.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conectadas</p>
                <p className="text-2xl font-bold text-green-600">
                  {getStatusCount("connected")}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-100">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Desconectadas</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {getStatusCount("disconnected")}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalBalance)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contas Bancárias */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Bancos</h3>
            <Badge variant="outline">
              {banks.length} {banks.length === 1 ? "banco" : "bancos"}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banks.map((account) => (
              <AccountStatus
                key={account.id}
                name={account.name}
                type={account.type}
                status={account.status}
                balance={account.balance}
                lastSync={account.lastSync}
              />
            ))}
          </div>
        </Card>

        {/* Corretoras */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Corretoras</h3>
            <Badge variant="outline">
              {brokers.length}{" "}
              {brokers.length === 1 ? "corretora" : "corretoras"}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brokers.map((account) => (
              <AccountStatus
                key={account.id}
                name={account.name}
                type={account.type}
                status={account.status}
                balance={account.balance}
                lastSync={account.lastSync}
              />
            ))}
          </div>
        </Card>

        {/* Resumo por status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resumo por Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {getStatusCount("connected")}
              </div>
              <div className="text-sm text-muted-foreground">
                Contas Conectadas
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Sincronização automática ativa
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {getStatusCount("disconnected")}
              </div>
              <div className="text-sm text-muted-foreground">
                Contas Desconectadas
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Requerem reautorização
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {getStatusCount("error")}
              </div>
              <div className="text-sm text-muted-foreground">Com Erro</div>
              <div className="text-xs text-muted-foreground mt-1">
                Necessitam intervenção manual
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { BankAccountStatus };
