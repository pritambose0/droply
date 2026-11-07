import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import connectDB from "@/lib/connectDB";
import { ProductService } from "@/services/product.service";
import type { MarketplaceProductDetail } from "@/types/marketplace";
import ProductDetailClient from "./ProductDetailClient";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

const getProduct = cache(
  async (id: string): Promise<MarketplaceProductDetail | null> => {
    try {
      await connectDB();
      return await ProductService.getMarketplaceProductById(id);
    } catch {
      return null;
    }
  },
);

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "This product could not be found on Droply.",
    };
  }

  const description = product.description.slice(0, 160);

  return {
    title: product.title,
    description,
    openGraph: {
      title: `${product.title} | Droply`,
      description,
      type: "website",
      images: product.thumbnailUrl
        ? [{ url: product.thumbnailUrl, alt: product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: product.thumbnailUrl ? [product.thumbnailUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetailClient id={id} initialProduct={product} />;
}
