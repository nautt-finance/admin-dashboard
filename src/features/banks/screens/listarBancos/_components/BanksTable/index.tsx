import { DataTable, Column } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank, BankTableProps } from "../../../../types";

const BanksTable: React.FC<BankTableProps> = ({ banks, isLoading }) => {
  const columns: Column<Bank>[] = [
    {
      header: "ID",
      accessor: "id",
      className: "font-medium",
    },
    {
      header: "Nome",
      accessor: "nome",
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
    <DataTable data={banks} columns={columns} className="border rounded-lg" />
  );
};

export { BanksTable };
