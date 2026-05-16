"use client";

import React from "react";

interface ProductSkeletonProps {
  viewMode: "grid" | "list";
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ viewMode }) => {
  if (viewMode === "list") {
    return (
      <div className="glass rounded-xl p-4 flex items-center gap-4 animate-pulse">
        {/* Mini thumbnail skeleton */}
        <div className="w-16 h-16 rounded-xl bg-white/5 shrink-0" />
        
        {/* Info skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded-md w-1/3" />
          <div className="h-3 bg-white/5 rounded-md w-1/2" />
          <div className="flex gap-2 mt-2">
            <div className="h-5 bg-white/5 rounded w-12" />
            <div className="h-5 bg-white/5 rounded w-12" />
          </div>
        </div>
        
        {/* Price skeleton */}
        <div className="w-16 h-8 bg-white/10 rounded-lg shrink-0" />
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      {/* Thumbnail area skeleton */}
      <div className="h-40 bg-white/5" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <div>
          <div className="h-5 bg-white/10 rounded-md w-3/4 mb-2" />
          <div className="h-3 bg-white/5 rounded-md w-full" />
          <div className="h-3 bg-white/5 rounded-md w-2/3 mt-1" />
        </div>
        
        <div className="flex gap-2">
          <div className="h-6 bg-white/5 rounded-md w-12" />
          <div className="h-6 bg-white/5 rounded-md w-12" />
          <div className="h-6 bg-white/5 rounded-md w-12" />
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-white/10 rounded-md w-16" />
          <div className="h-4 bg-white/5 rounded-md w-12" />
        </div>
      </div>
    </div>
  );
};
