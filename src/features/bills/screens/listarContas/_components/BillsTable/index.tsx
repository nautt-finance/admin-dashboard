import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bill, BillsTableProps } from "../../../../types";
import { billStatusConfig } from "../../_data/mockData";

const BillsTable: React.FC<BillsTableProps> = ({ bills, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const columns: Column<Bill>[] = [
    {
      header: "Descrição",
      accessor: "description",
      className: "font-medium",
    },
    {
      header: "Fornecedor",
      accessor: "supplier",
    },
    {
      header: "Valor",
      accessor: "amount",
      render: (value: number) => (
        <span className="font-semibold text-right block">
          {formatCurrency(value)}
        </span>
      ),
      className: "text-right",
    },
    {
      header: "Vencimento",
      accessor: "dueDate",
      render: (value: string) => formatDate(value),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: Bill["status"]) => (
        <Badge variant={billStatusConfig[value].variant}>
          {billStatusConfig[value].label}
        </Badge>
      ),
    },
    {
      header: "Categoria",
      accessor: "category",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 p-4">
            {Array.from({ length: 6 }).map((_, j) => (
              <Skeleton key={j} className="h-6 w-full" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <DataTable data={bills} columns={columns} className="border rounded-lg" />
  );
};

export { BillsTable };
