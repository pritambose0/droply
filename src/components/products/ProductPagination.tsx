"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-2 flex items-center justify-between border-t border-card-border pt-6">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold text-foreground">{currentPage}</span>{" "}
        of <span className="font-semibold text-foreground">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-card-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-card-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
