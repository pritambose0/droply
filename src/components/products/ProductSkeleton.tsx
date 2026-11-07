"use client";

import React from "react";

interface ProductSkeletonProps {
  viewMode: "grid" | "list";
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ viewMode }) => {
  if (viewMode === "list") {
    return (
      <div className="flex animate-pulse items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4">
        <div className="h-16 w-16 shrink-0 rounded-xl bg-surface" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded-md bg-surface" />
          <div className="h-3 w-1/2 rounded-md bg-surface" />
          <div className="mt-2 flex gap-2">
            <div className="h-5 w-12 rounded bg-surface" />
            <div className="h-5 w-12 rounded bg-surface" />
          </div>
        </div>

        <div className="h-8 w-16 shrink-0 rounded-lg bg-surface" />
      </div>
    );
  }

  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-card-border bg-card-bg">
      <div className="h-40 border-b border-card-border bg-surface" />

      <div className="space-y-4 p-5">
        <div>
          <div className="mb-2 h-5 w-3/4 rounded-md bg-surface" />
          <div className="h-3 w-full rounded-md bg-surface" />
          <div className="mt-1 h-3 w-2/3 rounded-md bg-surface" />
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-12 rounded-md bg-surface" />
          <div className="h-6 w-12 rounded-md bg-surface" />
          <div className="h-6 w-12 rounded-md bg-surface" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 rounded-md bg-surface" />
          <div className="h-4 w-12 rounded-md bg-surface" />
        </div>
      </div>
    </div>
  );
};
