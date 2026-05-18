"use client";

import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProductResponseDto } from "@/schemas/productSchema";

interface ProductRowProps {
  product: ProductResponseDto;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4 hover:border-accent/20 transition-all group cursor-pointer">
      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-accent/20 to-purple-500/20 flex items-center justify-center shrink-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent/50"
        >
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground truncate">
            {product.title}
          </h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {product.description}
        </p>
        <div className="flex gap-1.5 mt-1.5">
          {product.tags.slice(0, 4).map((tag: any) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded bg-surface text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="font-bold text-foreground">
          {currencySymbols[product.currency]}
          {product.price?.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">
          {product.salesCount} sales
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/products/${product.id}`}
          className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title="View"
        >
          <Eye size={16} />
        </Link>
        <Link
          href={`/seller/products/${product.id}/edit`}
          className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title="Edit"
        >
          <Pencil size={16} />
        </Link>
        <button
          className="w-8 h-8 rounded-lg bg-surface hover:bg-danger/10 flex items-center justify-center text-muted-foreground hover:text-danger transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
