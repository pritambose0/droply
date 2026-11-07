"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Library,
  Package,
  Search,
  ShoppingBag,
  Store,
  Tag,
} from "lucide-react";
import type { MarketplaceCategory } from "@/types/marketplace";

export function HomeHero({
  isProductsLoading,
  totalProducts,
  categories,
  isCategoriesLoading,
  sellHref,
  isBuyer,
}: {
  isProductsLoading: boolean;
  totalProducts: number;
  categories: MarketplaceCategory[];
  isCategoriesLoading: boolean;
  sellHref: string;
  isBuyer: boolean;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();
    router.push(query ? `/discover?q=${encodeURIComponent(query)}` : "/discover");
  };

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="absolute left-1/2 top-0 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.8fr)] lg:gap-16">
        <div className="min-w-0">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-card-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Package size={13} className="text-accent" />
            A digital product marketplace
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground animate-fade-in-up md:text-6xl xl:text-7xl">
            Discover more.
            <br />
            <span className="gradient-text">Buy better.</span>
            <br />
            Sell smarter.
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Discover digital products from independent creators, or open a
            creator account to list and manage your own catalogue.
          </p>

          <form
            onSubmit={handleSearch}
            className="relative mb-4 max-w-xl animate-fade-in-up delay-200"
            role="search"
          >
            <label htmlFor="home-search" className="sr-only">
              Search products
            </label>
            <Search
              size={20}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="home-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="What are you looking for?"
              autoComplete="off"
              className="h-14 w-full rounded-2xl border border-input-border bg-card-bg pl-14 pr-28 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-accent/50 focus:ring-2 focus:ring-input-focus md:pr-32"
            />
            <button
              type="submit"
              aria-label="Search products"
              className="absolute bottom-2 right-2 top-2 inline-flex items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          <div className="flex flex-col items-stretch gap-3 animate-fade-in-up delay-200 sm:flex-row sm:items-center">
            <Link
              href="/discover"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Explore Products
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href={isBuyer ? "/buyer/library" : sellHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-surface px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              {isBuyer ? (
                <>
                  <Library size={16} />
                  My Library
                </>
              ) : (
                <>
                  <Store size={16} />
                  Start Selling
                </>
              )}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground animate-fade-in-up delay-300">
            <span className="inline-flex items-center gap-1.5">
              <Compass size={14} className="text-accent" />
              Browse without an account
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShoppingBag size={14} className="text-accent" />
              Direct from independent creators
            </span>
          </div>
        </div>

        <aside
          aria-labelledby="hero-categories-heading"
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="absolute -inset-8 rounded-[2.5rem] bg-accent/[0.07] blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card-bg p-5 shadow-2xl shadow-black/10 sm:p-7">
            <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-accent/[0.08] blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Find your next favorite
                  </p>
                  <h2
                    id="hero-categories-heading"
                    className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                  >
                    Explore by category
                  </h2>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Browse products and resources from independent creators.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/15 bg-accent/10 text-accent">
                  <Tag size={19} />
                </div>
              </div>

              <div className="space-y-2">
                {isCategoriesLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex h-14 animate-pulse items-center justify-between rounded-xl border border-card-border bg-surface px-4"
                    >
                      <div className="h-3 w-28 rounded bg-surface-hover" />
                      <div className="h-3 w-12 rounded bg-surface-hover" />
                    </div>
                  ))
                ) : categories.length > 0 ? (
                  categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.tag}
                      href={`/discover?tag=${encodeURIComponent(category.tag)}`}
                      className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-card-border bg-surface px-4 transition-colors hover:border-accent/25 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent-hover"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Tag size={14} />
                        </span>
                        <span className="truncate text-sm font-medium capitalize text-foreground">
                          {category.tag.replace(/-/g, " ")}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                        {category.count}{" "}
                        {category.count === 1 ? "product" : "products"}
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-xl border border-card-border bg-surface px-4 py-5 text-sm text-muted-foreground">
                    Categories will appear here as creators publish products.
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-card-border pt-5">
                <p className="text-xs text-muted-foreground">
                  {!isProductsLoading && totalProducts > 0
                    ? `${totalProducts.toLocaleString()} products to explore`
                    : "A marketplace for curious minds"}
                </p>
                <Link
                  href="/discover"
                  className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-accent-hover"
                >
                  Browse all
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
