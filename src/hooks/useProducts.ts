"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ProductAPI } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type {
  CreateProductDto,
  GetAllProductsInput,
  UpdateProductDto,
} from "@/schemas/productSchema";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong.",
) {
  if (error instanceof Error) return error.message;

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }

  return fallback;
}

export function useProducts(params: GetAllProductsInput) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: async () => {
      const response = await ProductAPI.getAll(params);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load products.");
      }

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: async () => {
      const response = await ProductAPI.getById(id);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load product.");
      }

      return response.data;
    },
    enabled: Boolean(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductDto) => {
      const response = await ProductAPI.create(data);

      if (!response.success) {
        throw new Error(response.message || "Failed to create product.");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductDto;
    }) => {
      const response = await ProductAPI.updateById(id, data);

      if (!response.success) {
        throw new Error(response.message || "Failed to update product.");
      }

      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await ProductAPI.deleteById(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete product.");
      }

      return response.data;
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}
