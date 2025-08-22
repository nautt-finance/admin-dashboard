import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./pagination";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  showInfo?: boolean;
  from?: number;
  to?: number;
  total?: number;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  showInfo = false,
  from,
  to,
  total,
}: TablePaginationProps) => {
  const { items, canGoPrevious, canGoNext, goToPrevious, goToNext, goToPage } =
    usePagination({
      currentPage,
      totalPages,
      onPageChange,
      siblingCount,
    });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {showInfo && from && to && total && (
        <div className="text-sm text-muted-foreground">
          Mostrando {from} a {to} de {total} resultados
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPrevious();
              }}
              className={cn(!canGoPrevious && "pointer-events-none opacity-50")}
            />
          </PaginationItem>

          {items.map((item, index) => {
            if (item.type === "dots") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={item.isActive}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(item.value as number);
                  }}
                >
                  {item.value}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToNext();
              }}
              className={cn(!canGoNext && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { TablePagination };
