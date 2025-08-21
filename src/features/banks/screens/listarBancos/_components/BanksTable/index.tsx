import { DataTable, Column } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bank, BankTableProps } from "../../../../types";

const BanksTable: React.FC<BankTableProps> = ({
  banks,
  isLoading,
  onEdit,
  onDelete,
}) => {
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
    {
      header: "Ações",
      accessor: "id",
      className: "w-12",
      render: (_, bank) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0" align="end">
            <div className="py-1">
              <button
                className="w-full px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center"
                onClick={() => onEdit?.(bank)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </button>
              <button
                className="w-full px-3 py-2 text-sm text-left hover:bg-accent text-destructive transition-colors flex items-center"
                onClick={() => onDelete?.(bank.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 p-4">
            {Array.from({ length: 3 }).map((_, j) => (
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
