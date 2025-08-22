import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TablePagination } from "@/components/ui/table-pagination";
import { Bill, BillsTableProps } from "../../_types/types";

const BillsTable: React.FC<BillsTableProps> = ({
  bills,
  isLoading,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  from,
  to,
  total,
}) => {
  const formatCurrency = (value: string, currency: string = "BRL") => {
    const numericValue = parseFloat(value);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(numericValue);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getTipoBadge = (tipo: string) => {
    const tipoMap = {
      direta: { label: "Direta", variant: "default" as const },
      indireta: { label: "Indireta", variant: "secondary" as const },
    };

    const tipoInfo = tipoMap[tipo as keyof typeof tipoMap] || {
      label: tipo,
      variant: "outline" as const,
    };

    return <Badge variant={tipoInfo.variant}>{tipoInfo.label}</Badge>;
  };

  const columns: Column<Bill>[] = [
    {
      header: "Descrição",
      accessor: "descricao",
      className: "font-medium",
    },
    {
      header: "Destinatário",
      accessor: "destinatario",
    },
    {
      header: "Documento",
      accessor: "documento_destinatario",
      className: "text-sm text-muted-foreground",
    },
    {
      header: "Valor",
      accessor: "valor",
      render: (value: string) => (
        <span className="font-semibold text-right block">
          {formatCurrency(value)}
        </span>
      ),
      className: "text-right",
    },
    {
      header: "Valor USD",
      accessor: "valor_usd",
      render: (value: string) => (
        <span className="font-semibold text-right block text-sm text-muted-foreground">
          {formatCurrency(value, "USD")}
        </span>
      ),
      className: "text-right",
    },
    {
      header: "Data Pagamento",
      accessor: "data_pagamento",
      render: (value: string) => formatDate(value),
    },
    {
      header: "Banco",
      accessor: "banco_nautt",
      render: (value: Bill["banco_nautt"]) => value.nome,
    },
    {
      header: "Moeda",
      accessor: "moeda",
      render: (value: Bill["moeda"]) => (
        <span className="text-sm">
          {value.sigla} - {value.nome}
        </span>
      ),
    },
    {
      header: "Tipo",
      accessor: "tipo",
      render: (value: string) => getTipoBadge(value),
    },
    {
      header: "Departamento",
      accessor: "departamento",
      className: "text-sm text-muted-foreground",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-10 gap-4 p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-10 gap-4 p-4">
            {Array.from({ length: 10 }).map((_, j) => (
              <Skeleton key={j} className="h-6 w-full" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DataTable data={bills} columns={columns} className="border rounded-lg" />
      {onPageChange && totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showInfo={true}
          from={from}
          to={to}
          total={total}
        />
      )}
    </div>
  );
};

export { BillsTable };
