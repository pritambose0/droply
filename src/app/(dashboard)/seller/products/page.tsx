"use client";

import { useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
  getApiErrorMessage,
  useDeleteProduct,
  useProducts,
} from "@/hooks/useProducts";
import { ProductToolbar } from "@/components/products/ProductToolbar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductRow } from "@/components/products/ProductRow";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { EmptyState } from "@/components/products/EmptyState";
import { NoResults } from "@/components/products/NoResults";
import { ProductPagination } from "@/components/products/ProductPagination";
import { DeleteProductModal } from "@/components/products/DeleteProductModal";
import { PageHeader } from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ButtonLink";
import Button from "@/components/Button";

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
  const pageParam = Number(getParam("page", "1"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  // Setters that update the URL
  const setSearch = (val: string) => setParams({ q: val, page: "1" });
  const setStatusFilter = (val: "all" | "published" | "draft") =>
    setParams({ status: val, page: "1" });
  const setSortBy = (val: string) => setParams({ sortBy: val, page: "1" });
  const setViewMode = (val: "grid" | "list") => setParams({ view: val });
  const setPage = (page: number) => setParams({ page: page.toString() });

  const queryParams = useMemo(
    () => ({
      status: statusFilter,
      query: debouncedSearch,
      sortBy,
      sortOrder: "desc" as const,
      page,
      limit: 9,
    }),
    [statusFilter, debouncedSearch, sortBy, page],
  );

  const {
    data: productResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts(queryParams);

  const deleteProduct = useDeleteProduct();

  // Delete Modal State
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteRequest = (id: string, title: string) => {
    setDeleteError(null);
    setProductToDelete({ id, title });
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    setDeleteError(null);
    deleteProduct.mutate(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null);
        const remainingOnPage = (productResponse?.products?.length ?? 1) - 1;
        if (remainingOnPage === 0 && page > 1) setPage(page - 1);
      },
      onError: (err) =>
        setDeleteError(
          getApiErrorMessage(
            err,
            "Failed to delete product. Please try again.",
          ),
        ),
    });
  };

  const displayProducts = productResponse?.products || [];
  const totalCount = productResponse?.totalProducts || 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-20">
      <PageHeader
        eyebrow="Creator"
        title="Products"
        description={`Manage your digital products${totalCount ? ` (${totalCount} total)` : ""}.`}
        actions={
          <ButtonLink href="/seller/products/new" className="px-5 py-2.5">
            <Plus size={16} />
            New product
          </ButtonLink>
        }
      />

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
        {isError && !productResponse ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-danger/20 bg-danger/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-danger/10 text-danger">
              <RefreshCw size={22} />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Couldn&apos;t load products
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              {getApiErrorMessage(error, "Please try again in a moment.")}
            </p>
            <Button onClick={() => refetch()} variant="secondary">
              <RefreshCw size={16} />
              Try again
            </Button>
          </div>
        ) : isLoading ? (
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
              <ProductCard
                key={product.id}
                product={product}
                onDeleteRequest={handleDeleteRequest}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {displayProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDeleteRequest={handleDeleteRequest}
              />
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

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteProduct.isPending}
        productName={productToDelete?.title || ""}
        error={deleteError}
      />
    </div>
  );
}
