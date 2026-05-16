"use client";

import React from "react";

interface NoResultsProps {
  onClearFilters: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({ onClearFilters }) => {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <p className="text-muted-foreground">
        No products match your filters.
      </p>
      <button
        onClick={onClearFilters}
        className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors cursor-pointer"
      >
        Clear filters
      </button>
    </div>
  );
};
