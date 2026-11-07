import Link from "next/link";
import { ArrowRight, Package, RefreshCw } from "lucide-react";
import Button from "@/components/Button";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { MarketplaceProductSkeleton } from "@/components/marketplace/MarketplaceProductSkeleton";
import { getApiErrorMessage } from "@/hooks/useProducts";
import type { MarketplaceProduct } from "@/types/marketplace";

export function FeaturedSection({
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
    <section id="featured" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-accent">
              Featured products
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Popular right now
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Discover the products buyers are exploring most on Droply.
            </p>
          </div>

          <Link
            href="/discover?sort=popular"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-purple-400"
          >
            View all featured
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {isError ? (
          <div className="rounded-2xl border border-danger/20 glass p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
              <RefreshCw size={22} />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Couldn&apos;t load featured products
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {getApiErrorMessage(
                error,
                "Something went wrong while loading the marketplace. Please try again.",
              )}
            </p>
            <Button onClick={onRetry} className="mt-5 rounded-full px-5 py-2.5">
              <RefreshCw size={16} />
              Try again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <MarketplaceProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <MarketplaceProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-card-border glass p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Package size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No products listed yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              The marketplace is just getting started. Product listings will
              appear here once sellers publish them.
            </p>
            <Link
              href="/discover"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-purple-400"
            >
              Visit the marketplace
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
