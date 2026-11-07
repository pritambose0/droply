"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Package, Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProductResponseDto } from "@/schemas/productSchema";
import { formatMarketplacePrice } from "@/lib/formatPrice";

interface ProductRowProps {
  product: ProductResponseDto;
  onDeleteRequest: (id: string, title: string) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onDeleteRequest,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4 transition-colors hover:border-accent/25">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-card-border bg-surface">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <Package size={24} className="text-muted-foreground/40" strokeWidth={1.5} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-foreground">
            {product.title}
          </h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-1.5 flex gap-1.5">
          {product.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="font-bold text-foreground">
          {formatMarketplacePrice(product.price ?? 0, product.currency)}
        </div>
        <div className="text-xs text-muted-foreground">
          {product.salesCount} sales
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/products/${product.id}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
          title="View"
        >
          <Eye size={16} />
        </Link>
        <Link
          href={`/seller/products/${product.id}/edit`}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
          title="Edit"
        >
          <Pencil size={16} />
        </Link>
        <button
          onClick={() => onDeleteRequest(product.id, product.title)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-surface text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
