"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, ShoppingBag, Tag } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import type { MarketplaceProduct } from "@/types/marketplace";

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const gradients = [
  "from-violet-600/20 to-indigo-600/20",
  "from-rose-600/20 to-pink-600/20",
  "from-emerald-600/20 to-teal-600/20",
  "from-amber-600/20 to-orange-600/20",
  "from-sky-600/20 to-cyan-600/20",
  "from-fuchsia-600/20 to-purple-600/20",
];

export function MarketplaceProductCard({
  product,
}: {
  product: MarketplaceProduct;
}) {
  const idHash = product.id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradient = gradients[idHash % gradients.length];
  const priceLabel =
    product.price === 0
      ? "Free"
      : `${currencySymbols[product.currency] ?? product.currency}${product.price.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )}`;

  return (
    <div className="group glass rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 border border-card-border/60">
      <div
        className={`relative h-48 w-full bg-linear-to-br ${gradient} flex items-center justify-center overflow-hidden`}
      >
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
            size={64}
            className="text-white/40 drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
          />
        )}

        {product.tags[0] && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/10 capitalize">
            <Tag size={11} />
            {product.tags[0]}
          </span>
        )}

        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-linear-to-t from-black/80 to-transparent">
          <ButtonLink
            href={`/discover/${product.id}`}
            variant="none"
            className="w-full py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-sm text-center font-medium hover:bg-white/30 transition-colors border border-white/20"
          >
            View Details
          </ButtonLink>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/discover/${product.id}`} className="block mb-1">
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3">
          by{" "}
          <span className="hover:text-foreground cursor-pointer transition-colors">
            {product.creator.name}
          </span>
        </p>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-surface text-[11px] text-muted-foreground capitalize"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-surface text-[11px] text-muted-foreground">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <ShoppingBag size={14} />
            {product.salesCount.toLocaleString()} sales
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-card-border/50">
          <span className="text-lg font-bold text-foreground">
            {priceLabel}
          </span>
          <ButtonLink
            href={`/discover/${product.id}`}
            variant="none"
            className="px-4 py-2 rounded-xl bg-surface text-sm font-medium hover:bg-accent hover:text-white transition-all shadow-sm border border-card-border group-hover:border-accent/50"
          >
            Get Now
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
