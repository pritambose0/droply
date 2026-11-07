"use client";

import React from "react";
import { SearchX } from "lucide-react";

interface NoResultsProps {
  onClearFilters: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-card-border bg-surface/30 p-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-muted-foreground">
        <SearchX size={22} />
      </div>
      <h3 className="text-sm font-semibold text-foreground">
        No matching products
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try a different search or clear the filters.
      </p>
      <button
        onClick={onClearFilters}
        className="mt-4 cursor-pointer text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        Clear filters
      </button>
    </div>
  );
};
