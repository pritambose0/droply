"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MarketplaceAPI } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { GetAllMarketplaceProductsInput } from "@/schemas/productSchema";
import type { MarketplaceProductDetail } from "@/types/marketplace";

export function useMarketplaceProducts(params: GetAllMarketplaceProductsInput) {
  return useQuery({
    queryKey: queryKeys.marketplace.productList(params),
    queryFn: async () => {
      const response = await MarketplaceAPI.getAll(params);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load products.");
      }

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useMarketplaceProduct(
  id: string,
  initialProduct?: MarketplaceProductDetail,
) {
  return useQuery({
    queryKey: queryKeys.marketplace.detail(id),
    queryFn: async () => {
      const response = await MarketplaceAPI.getById(id);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load product.");
      }

      return response.data;
    },
    initialData: initialProduct,
    enabled: Boolean(id),
  });
}

export function useMarketplaceCategories() {
  return useQuery({
    queryKey: queryKeys.marketplace.categories(),
    queryFn: async () => {
      const response = await MarketplaceAPI.getCategories();

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load categories.");
      }

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
