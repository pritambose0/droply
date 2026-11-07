import type {
  GetAllMarketplaceProductsInput,
  GetAllProductsInput,
} from "@/schemas/productSchema";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (params: GetAllProductsInput) =>
      [...queryKeys.products.lists(), params] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  marketplace: {
    all: ["marketplace"] as const,
    products: () => [...queryKeys.marketplace.all, "products"] as const,
    productList: (params: GetAllMarketplaceProductsInput) =>
      [...queryKeys.marketplace.products(), params] as const,
    categories: () => [...queryKeys.marketplace.all, "categories"] as const,
    details: () => [...queryKeys.marketplace.all, "detail"] as const,
    detail: (id: string) =>
      [...queryKeys.marketplace.details(), id] as const,
  },
};
