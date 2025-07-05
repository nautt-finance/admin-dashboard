"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

const DataTable = <T,>({ data, columns, className }: DataTableProps<T>) => {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "text-left p-3 font-medium text-sm text-muted-foreground",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-muted/50">
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={cn("p-3 text-sm", column.className)}
                >
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { DataTable, type Column };
