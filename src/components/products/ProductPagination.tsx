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
    <div className="flex items-center justify-between pt-6 mt-2 border-t border-card-border/50">
      <p className="text-sm text-muted-foreground">
        Page{" "}
        <span className="font-bold text-foreground">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-bold text-foreground">
          {totalPages}
        </span>
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold uppercase tracking-wider rounded-xl border border-card-border bg-card-bg/50 text-foreground hover:bg-card-bg/80 hover:border-accent/30 disabled:opacity-50 disabled:hover:border-card-border disabled:cursor-not-allowed transition-all backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold uppercase tracking-wider rounded-xl border border-card-border bg-card-bg/50 text-foreground hover:bg-card-bg/80 hover:border-accent/30 disabled:opacity-50 disabled:hover:border-card-border disabled:cursor-not-allowed transition-all backdrop-blur-md cursor-pointer"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
