"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Package, Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProductResponseDto } from "@/schemas/productSchema";
import { formatMarketplacePrice } from "@/lib/formatPrice";

interface ProductCardProps {
  product: ProductResponseDto;
  onDeleteRequest: (id: string, title: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDeleteRequest,
}) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-colors hover:border-accent/25">
      <div className="relative flex h-40 items-center justify-center border-b border-card-border bg-surface">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <Package size={36} className="text-muted-foreground/40" strokeWidth={1} />
        )}

        <div className="absolute right-3 top-3">
          <StatusBadge status={product.status} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-1 truncate font-semibold text-foreground">
          {product.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {product.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {product.tags?.length > 3 && (
            <span className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted-foreground">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            {formatMarketplacePrice(product.price ?? 0, product.currency)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.salesCount > 0
              ? `${product.salesCount} sales`
              : "No sales yet"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-card-border bg-surface/40 px-5 py-3">
        <Link
          href={`/products/${product.id}`}
          className="flex flex-1 items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Eye size={14} /> View
        </Link>
        <div className="h-4 w-px bg-card-border" />
        <Link
          href={`/seller/products/${product.id}/edit`}
          className="flex flex-1 items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Pencil size={14} /> Edit
        </Link>
        <div className="h-4 w-px bg-card-border" />
        <button
          onClick={() => onDeleteRequest(product.id, product.title)}
          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-danger"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
};
