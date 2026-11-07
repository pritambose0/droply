export interface MarketplaceCreatorSummary {
  id: string;
  name: string;
}

export interface MarketplaceCreator extends MarketplaceCreatorSummary {
  productsCount: number;
  totalSales: number;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnailUrl: string;
  tags: string[];
  salesCount: number;
  createdAt: string;
  updatedAt: string;
  creator: MarketplaceCreatorSummary;
}

export interface MarketplaceProductDetail extends Omit<
  MarketplaceProduct,
  "creator"
> {
  creator: MarketplaceCreator;
  relatedProducts: MarketplaceProduct[];
}

export interface MarketplaceProductsResponse {
  products: MarketplaceProduct[];
  page: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
}

export interface MarketplaceCategory {
  tag: string;
  count: number;
}

export interface MarketplaceCategoriesResponse {
  categories: MarketplaceCategory[];
  totalProducts: number;
}
