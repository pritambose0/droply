"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Filter, RefreshCw, Search, TrendingUp, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getApiErrorMessage } from "@/hooks/useProducts";
import {
  useMarketplaceCategories,
  useMarketplaceProducts,
} from "@/hooks/useMarketplace";
import Button from "@/components/Button";
import Input from "@/components/Input";
import RadioGroup from "@/components/RadioGroup";
import Select from "@/components/Select";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { MarketplaceProductSkeleton } from "@/components/marketplace/MarketplaceProductSkeleton";
import { ProductPagination } from "@/components/products/ProductPagination";
import {
  isMarketplacePriceFilter,
  isMarketplaceSortBy,
  MARKETPLACE_PRICE_FILTERS,
  MARKETPLACE_SORT_OPTIONS,
  type GetAllMarketplaceProductsInput,
  type MarketplacePriceFilter,
  type MarketplaceSortBy,
} from "@/schemas/productSchema";

const SORT_LABELS = {
  popular: "Popular",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
} satisfies Record<MarketplaceSortBy, string>;

const SORT_OPTIONS = MARKETPLACE_SORT_OPTIONS.map((value) => ({
  value,
  label: SORT_LABELS[value],
}));

const PRICE_LABELS = {
  all: "All Prices",
  free: "Free Only",
  paid: "Premium Only",
} satisfies Record<MarketplacePriceFilter, string>;

const PRICE_OPTIONS = MARKETPLACE_PRICE_FILTERS.map((value) => ({
  value,
  label: PRICE_LABELS[value],
}));

const PAGE_SIZE = 9;

export default function DiscoverPage() {
  const { getParam, setParams, clearParams } = useQueryParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const search = getParam("q");
  const activeCategory = getParam("tag", "All");
  const sortParam = getParam("sort", "popular");
  const priceParam = getParam("price", "all");

  const activeSort: MarketplaceSortBy = isMarketplaceSortBy(sortParam)
    ? sortParam
    : "popular";

  const priceFilter: MarketplacePriceFilter = isMarketplacePriceFilter(
    priceParam,
  )
    ? priceParam
    : "all";

  const pageParam = Number(getParam("page", "1"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const debouncedSearch = useDebounce(search, 400);

  const setSearch = (value: string) => setParams({ q: value, page: "1" });
  const setActiveCategory = (category: string) =>
    setParams({ tag: category === "All" ? null : category, page: "1" });
  const setActiveSort = (sort: MarketplaceSortBy) =>
    setParams({ sort, page: "1" });
  const setPriceFilter = (price: MarketplacePriceFilter) =>
    setParams({ price: price === "all" ? null : price, page: "1" });
  const setPage = (nextPage: number) =>
    setParams({ page: nextPage.toString() });

  const queryParams: GetAllMarketplaceProductsInput = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      query: debouncedSearch,
      sortBy: activeSort,
      tag: activeCategory === "All" ? "" : activeCategory,
      price: priceFilter,
    }),
    [page, debouncedSearch, activeSort, activeCategory, priceFilter],
  );

  const { data, isLoading, isFetching, isError, error, refetch } =
    useMarketplaceProducts(queryParams);

  const { data: categoryData, isLoading: categoriesLoading } =
    useMarketplaceCategories();

  const products = data?.products ?? [];
  const totalProducts = data?.totalProducts ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const hasActiveFilters =
    search.length > 0 || activeCategory !== "All" || priceFilter !== "all";

  const clearFilters = () => {
    clearParams();
  };

  useEffect(() => {
    if (!isMobileFiltersOpen) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ??
          [],
      ).filter((element) => element.offsetParent !== null);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMobileFiltersOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;
      const isInsideDrawer = drawerRef.current?.contains(activeElement);

      if (event.shiftKey && (activeElement === first || !isInsideDrawer)) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || !isInsideDrawer)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const frame = window.requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isMobileFiltersOpen]);

  const categoryOptions = [
    { tag: "All", count: categoryData?.totalProducts ?? 0 },
    ...(categoryData?.categories ?? []),
  ];

  const renderCategories = (onSelect?: () => void) => (
    <div className="space-y-2">
      {categoryOptions.map((category) => (
        <Button
          key={category.tag}
          variant="none"
          onClick={() => {
            setActiveCategory(category.tag);
            onSelect?.();
          }}
          className={`w-full justify-between px-3 py-2 rounded-lg text-sm font-medium normal-case ${
            activeCategory === category.tag
              ? "bg-accent/10 text-accent"
              : "text-foreground hover:bg-surface"
          }`}
        >
          <span className="capitalize">{category.tag}</span>
          <span className="text-xs text-muted-foreground">
            {category.count}
          </span>
        </Button>
      ))}
      {categoriesLoading && (
        <div className="space-y-2 pt-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-9 rounded-lg bg-white/5 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* ── Hero ── */}
      <div className="px-6 mb-12">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase mb-6 border border-accent/20">
            <TrendingUp size={14} /> The Marketplace
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Discover <span className="gradient-text">Creator Tools</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore thousands of premium digital products, templates, and
            resources built by top creators around the world.
          </p>
        </div>
      </div>

      {/* ── Main Marketplace Layout ── */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-4">
          <Button
            variant="none"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="glass px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-hover"
          >
            <Filter size={18} />
            Filters
          </Button>

          <Select
            id="marketplace-sort-mobile"
            aria-label="Sort products"
            value={activeSort}
            onChange={(event) => {
              const nextSort = event.target.value;
              if (isMarketplaceSortBy(nextSort)) setActiveSort(nextSort);
            }}
            options={SORT_OPTIONS}
            containerClassName="w-40 sm:w-44"
            className="glass px-4 py-2.5 text-sm font-medium"
          />
        </div>

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-10">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Categories
            </h3>
            {renderCategories()}
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Pricing
            </h3>
            <RadioGroup
              name="price"
              value={priceFilter}
              options={PRICE_OPTIONS}
              onChange={(value) => {
                if (isMarketplacePriceFilter(value)) setPriceFilter(value);
              }}
            />
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 space-y-6">
          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass p-2 pl-4 rounded-2xl sticky top-24 z-20 shadow-sm">
            <Input
              id="marketplace-search"
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete="off"
              icon={<Search size={20} />}
              rightIcon={
                search ? (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                ) : undefined
              }
              variant="dashboard"
              containerClassName="flex-1 w-full"
              className="bg-transparent border-none focus:ring-0 py-2 pl-10 pr-10"
            />
            <div className="hidden lg:flex items-center gap-3 shrink-0 border-l border-card-border/50 pl-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select
                id="marketplace-sort"
                aria-label="Sort products"
                value={activeSort}
                onChange={(event) => {
                  const nextSort = event.target.value;
                  if (isMarketplaceSortBy(nextSort)) setActiveSort(nextSort);
                }}
                options={SORT_OPTIONS}
                containerClassName="min-w-[170px]"
                className="bg-transparent border-none px-0 pr-8 py-1 text-sm focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {totalProducts.toLocaleString()}{" "}
              {totalProducts === 1 ? "product" : "products"}
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </span>
            {isFetching && !isLoading && (
              <span className="flex items-center gap-1.5">
                <RefreshCw size={12} className="animate-spin" />
                Updating
              </span>
            )}
          </div>

          {/* Grid */}
          {isError && !data ? (
            <div className="glass rounded-3xl p-16 text-center flex flex-col items-center justify-center animate-fade-in-up border border-danger/20">
              <div className="w-16 h-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mb-4">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Couldn&apos;t load the marketplace
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {getApiErrorMessage(error, "Please try again in a moment.")}
              </p>
              <Button onClick={() => refetch()}>
                <RefreshCw size={16} />
                Try again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <MarketplaceProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div
              className={`grid sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity ${
                isFetching ? "opacity-60" : "opacity-100"
              }`}
            >
              {products.map((product) => (
                <MarketplaceProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-3xl p-16 text-center flex flex-col items-center justify-center animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-surface border border-card-border flex items-center justify-center mb-6">
                <Search className="text-muted-foreground" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                {hasActiveFilters
                  ? `We couldn't find anything matching your current filters. Try a different search or category.`
                  : "No products have been published yet. Check back soon."}
              </p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters}>
                  Clear all filters
                </Button>
              )}
            </div>
          )}

          {!isLoading && products.length > 0 && totalPages > 1 && (
            <ProductPagination
              currentPage={data?.page ?? 1}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Marketplace filters"
            className="relative w-4/5 max-w-sm h-full bg-background border-l border-card-border p-6 overflow-y-auto shadow-2xl animate-fade-in-up"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">Filters</h2>
              <Button
                variant="none"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 rounded-lg bg-surface text-muted-foreground hover:text-foreground"
                aria-label="Close filters"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Categories
                </h3>
                {renderCategories(() => setIsMobileFiltersOpen(false))}
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Pricing
                </h3>
                <RadioGroup
                  name="mobile-price"
                  value={priceFilter}
                  options={PRICE_OPTIONS}
                  onChange={(value) => {
                    if (isMarketplacePriceFilter(value)) setPriceFilter(value);
                  }}
                  variant="card"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
