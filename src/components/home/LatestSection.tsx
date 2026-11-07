import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Package,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Button from "@/components/Button";
import { getApiErrorMessage } from "@/hooks/useProducts";
import { formatMarketplacePrice } from "@/lib/formatPrice";
import type { MarketplaceProduct } from "@/types/marketplace";

function LatestProductRow({ product }: { product: MarketplaceProduct }) {
  return (
    <Link
      href={`/discover/${product.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-card-border/60 glass p-3 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-accent/20 to-purple-500/10 sm:h-24 sm:w-24">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={28} className="text-white/40" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        {product.tags[0] && (
          <span className="inline-flex rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
            {product.tags[0]}
          </span>
        )}
        <h3 className="mt-1.5 line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-accent">
          {product.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          by {product.creator.name}
        </p>
        <p className="mt-1 text-sm font-bold text-foreground">
          {formatMarketplacePrice(product.price, product.currency)}
        </p>
      </div>

      <ArrowUpRight
        size={17}
        className="shrink-0 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </Link>
  );
}

function RowSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-2xl border border-card-border/50 glass p-3 pr-4">
      <div className="h-20 w-20 shrink-0 rounded-xl bg-white/5 sm:h-24 sm:w-24" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-16 rounded bg-white/5" />
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/5" />
        <div className="h-4 w-20 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function LatestSection({
  products,
  isLoading,
  isError,
  error,
  onRetry,
}: {
  products: MarketplaceProduct[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
}) {
  return (
    <section className="border-y border-card-border/40 bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
              <Sparkles size={13} />
              Fresh arrivals
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Recently added
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              The newest products from independent creators, straight from the
              marketplace.
            </p>
          </div>

          <Link
            href="/discover?sort=newest"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-purple-400"
          >
            See what&apos;s new
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {isError ? (
          <div className="rounded-2xl border border-danger/20 glass p-8 text-center">
            <h3 className="text-base font-bold text-foreground">
              Couldn&apos;t load new arrivals
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {getApiErrorMessage(
                error,
                "New products are unavailable right now. Please try again.",
              )}
            </p>
            <Button
              variant="secondary"
              onClick={onRetry}
              className="mt-5 rounded-full px-5 py-2.5"
            >
              <RefreshCw size={16} />
              Try again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <RowSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <LatestProductRow key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-card-border glass p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No new arrivals yet.{" "}
              <Link href="/discover" className="text-accent hover:underline">
                Explore the marketplace
              </Link>{" "}
              to see what&apos;s available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
