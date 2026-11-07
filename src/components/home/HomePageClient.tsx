"use client";

import { useSession } from "next-auth/react";
import {
  useMarketplaceCategories,
  useMarketplaceProducts,
} from "@/hooks/useMarketplace";
import type { GetAllMarketplaceProductsInput } from "@/schemas/productSchema";
import { HomeHero } from "./HomeHero";
import { CategorySection } from "./CategorySection";
import { FeaturedSection } from "./FeaturedSection";
import { LatestSection } from "./LatestSection";
import { SellerPromo } from "./SellerPromo";
import { HowItWorks } from "./HowItWorks";

const FEATURED_QUERY: GetAllMarketplaceProductsInput = {
  page: 1,
  limit: 8,
  sortBy: "popular",
};

const LATEST_QUERY: GetAllMarketplaceProductsInput = {
  page: 1,
  limit: 4,
  sortBy: "newest",
};

export default function HomePageClient() {
  const { data: session } = useSession();
  const role = session?.user.role;
  const isBuyer = role === "buyer";
  const sellHref =
    role === "creator" ? "/seller/products/new" : "/sign-up?role=creator";

  const featuredQuery = useMarketplaceProducts(FEATURED_QUERY);
  const latestQuery = useMarketplaceProducts(LATEST_QUERY);
  const categoriesQuery = useMarketplaceCategories();

  const featuredProducts = featuredQuery.data?.products ?? [];
  const latestProducts = latestQuery.data?.products ?? [];
  const categories = categoriesQuery.data?.categories ?? [];
  const totalProducts = featuredQuery.data?.totalProducts ?? 0;

  return (
    <>
      <HomeHero
        isProductsLoading={featuredQuery.isLoading}
        totalProducts={totalProducts}
        categories={categories}
        isCategoriesLoading={categoriesQuery.isLoading}
        sellHref={sellHref}
        isBuyer={isBuyer}
      />

      <CategorySection
        categories={categories}
        isLoading={categoriesQuery.isLoading}
        isError={categoriesQuery.isError}
        error={categoriesQuery.error}
        onRetry={() => {
          void categoriesQuery.refetch();
        }}
      />

      <FeaturedSection
        products={featuredProducts}
        isLoading={featuredQuery.isLoading}
        isError={featuredQuery.isError}
        error={featuredQuery.error}
        onRetry={() => {
          void featuredQuery.refetch();
        }}
      />

      <LatestSection
        products={latestProducts}
        isLoading={latestQuery.isLoading}
        isError={latestQuery.isError}
        error={latestQuery.error}
        onRetry={() => {
          void latestQuery.refetch();
        }}
      />

      {!isBuyer && <SellerPromo sellHref={sellHref} />}

      <HowItWorks />
    </>
  );
}
