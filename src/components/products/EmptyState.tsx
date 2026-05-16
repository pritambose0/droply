"use client";

import React from "react";
import Link from "next/link";
import { Box } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="glass rounded-3xl p-16 text-center border-dashed border-2 border-card-border">
      <div className="w-20 h-20 rounded-3xl bg-accent/5 flex items-center justify-center mx-auto mb-6 animate-float">
        <Box size={40} className="text-accent/30" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">
        No products yet
      </h3>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
        Start your creator journey by uploading your first digital masterpiece.
        It only takes a minute!
      </p>
      <Link
        href="/seller/products/new"
        className="inline-flex items-center gap-2.5 px-8 py-3 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-xl shadow-accent/20"
      >
        Upload First Product
      </Link>
    </div>
  );
};
