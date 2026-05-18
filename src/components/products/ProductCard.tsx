"use client";

import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProductResponseDto } from "@/schemas/productSchema";

interface ProductCardProps {
  product: ProductResponseDto;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const gradients = [
    "from-violet-600/20 to-indigo-600/20",
    "from-rose-600/20 to-pink-600/20",
    "from-emerald-600/20 to-teal-600/20",
    "from-amber-600/20 to-orange-600/20",
    "from-sky-600/20 to-cyan-600/20",
    "from-fuchsia-600/20 to-purple-600/20",
  ];

  // Use a simple hash of the ID to keep the same gradient for the same product
  const idHash = product.id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradient = gradients[idHash % gradients.length];

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 cursor-pointer">
      <div
        className={`relative h-40 bg-linear-to-br ${gradient} flex items-center justify-center`}
      >
        {product.thumbnailUrl ? (
          <img
            src={product.thumbnailUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/30"
          >
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        )}

        <div className="absolute top-3 right-3">
          <StatusBadge status={product.status} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags?.slice(0, 3).map((tag: any) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-surface text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {product.tags?.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-surface text-xs text-muted">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold gradient-text">
            {currencySymbols[product.currency]}
            {product.price?.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.salesCount > 0
              ? `${product.salesCount} sales`
              : "No sales yet"}
          </span>
        </div>
      </div>

      {/* Action Bar (Always visible for mobile & desktop UX) */}
      <div className="px-5 py-3 border-t border-card-border/50 bg-surface/30 flex items-center justify-between">
        <Link
          href={`/products/${product.id}`}
          className="flex flex-1 justify-center items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Eye size={14} /> View
        </Link>
        <div className="w-px h-4 bg-card-border/50" />
        <Link
          href={`/seller/products/${product.id}/edit`}
          className="flex flex-1 justify-center items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil size={14} /> Edit
        </Link>
        <div className="w-px h-4 bg-card-border/50" />
        <button className="flex flex-1 justify-center items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-danger transition-colors">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
};
