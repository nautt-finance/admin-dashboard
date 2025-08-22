import { useMemo } from "react";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

interface PaginationItem {
  type: "page" | "dots";
  value: number | string;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const usePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => start + idx);
    };

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "DOTS", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, "DOTS", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);

  const items: PaginationItem[] = useMemo(() => {
    return paginationRange.map((pageNumber) => {
      if (pageNumber === "DOTS") {
        return {
          type: "dots" as const,
          value: "...",
        };
      }

      return {
        type: "page" as const,
        value: pageNumber,
        isActive: pageNumber === currentPage,
        isDisabled: false,
      };
    });
  }, [paginationRange, currentPage]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goToPrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return {
    items,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    goToPage,
    currentPage,
    totalPages,
  };
};
