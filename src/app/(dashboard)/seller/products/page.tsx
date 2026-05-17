"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ProductAPI } from "@/lib/apiClient";
import { ProductResponseDto } from "@/schemas/productSchema";
import { ProductToolbar } from "@/components/products/ProductToolbar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductRow } from "@/components/products/ProductRow";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { EmptyState } from "@/components/products/EmptyState";
import { NoResults } from "@/components/products/NoResults";
import { ProductPagination } from "@/components/products/ProductPagination";

export default function ProductsPage() {
  const { getParam, setParams, clearParams } = useQueryParams();

  // URL-driven State
  const search = getParam("q");
  const statusFilter = getParam("status", "all") as
    | "all"
    | "published"
    | "draft";
  const sortBy = getParam("sortBy", "createdAt");
  const viewMode = getParam("view", "grid") as "grid" | "list";

  // Debounced search for API performance
  const debouncedSearch = useDebounce(search, 500);

  // Get Pagination Params
  const page = getParam("page", "1");

  // Setters that update the URL
  const setSearch = (val: string) => setParams({ q: val, page: "1" });
  const setStatusFilter = (val: "all" | "published" | "draft") =>
    setParams({ status: val, page: "1" });
  const setSortBy = (val: string) => setParams({ sortBy: val, page: "1" });
  const setViewMode = (val: "grid" | "list") => setParams({ view: val });
  const setPage = (page: number) => setParams({ page: page.toString() });

  // Data State
  const [productResponse, setProductResponse] = useState<{
    products: ProductResponseDto[];
    totalProducts: number;
    totalPages: number;
    page: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await ProductAPI.getAll({
          status: statusFilter,
          query: debouncedSearch,
          sortBy: sortBy,
          sortOrder: "desc",
          page: Number(page),
          limit: 9,
        });
        if (response.success && response.data) {
          setProductResponse(response.data);
        } else {
          setProductResponse(null);
          console.error("Error fetching products", response);
        }
      } catch (error) {
        setProductResponse(null);
        console.error("Error fetching products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [statusFilter, debouncedSearch, sortBy, page]);

  const displayProducts = productResponse?.products || [];
  const totalCount = productResponse?.totalProducts || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your digital products ({totalCount} total)
          </p>
        </div>
        <Link
          href="/seller/products/new"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-95"
        >
          <Plus size={18} />
          <span>New Product</span>
        </Link>
      </div>

      {/* Toolbar */}
      <ProductToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content Area */}
      <div className="min-h-[60vh]">
        {isLoading ? (
          viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => (
                <ProductSkeleton key={i} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[...Array(9)].map((_, i) => (
                <ProductSkeleton key={i} viewMode="list" />
              ))}
            </div>
          )
        ) : displayProducts.length === 0 ? (
          search || statusFilter !== "all" ? (
            <NoResults onClearFilters={clearParams} />
          ) : (
            <EmptyState />
          )
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {displayProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && displayProducts.length > 0 && (
        <ProductPagination
          currentPage={productResponse?.page || 1}
          totalPages={productResponse?.totalPages || 1}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
