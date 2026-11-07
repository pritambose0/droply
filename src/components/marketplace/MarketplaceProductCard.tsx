"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, ShoppingBag, Tag } from "lucide-react";
import type { MarketplaceProduct } from "@/types/marketplace";
import { formatMarketplacePrice } from "@/lib/formatPrice";

export function MarketplaceProductCard({
  product,
}: {
  product: MarketplaceProduct;
}) {
  const priceLabel = formatMarketplacePrice(product.price, product.currency);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-colors hover:border-accent/25">
      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b border-card-border bg-surface">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Package
            size={48}
            className="text-muted-foreground/30"
            strokeWidth={1}
          />
        )}

        {product.tags[0] && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-medium capitalize text-white backdrop-blur-md">
            <Tag size={11} />
            {product.tags[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/discover/${product.id}`} className="mb-1 block">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
            {product.title}
          </h3>
        </Link>

        <p className="mb-3 text-sm text-muted-foreground">
          by {product.creator.name}
        </p>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface px-2 py-0.5 text-[11px] capitalize text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-muted-foreground">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mb-4 flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <ShoppingBag size={14} />
          {product.salesCount.toLocaleString()} sales
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-card-border pt-4">
          <span className="text-lg font-bold text-foreground">{priceLabel}</span>
          <Link
            href={`/discover/${product.id}`}
            className="rounded-lg border border-card-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-hover"
          >
            View product
          </Link>
        </div>
      </div>
    </div>
  );
}
