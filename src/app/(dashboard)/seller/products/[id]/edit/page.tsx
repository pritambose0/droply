"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ProductAPI } from "@/lib/apiClient";
import { ProductResponseDto } from "@/schemas/productSchema";
import Button from "@/components/Button";
import ProductForm from "@/components/products/ProductForm";
import { Loader2 } from "lucide-react";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await ProductAPI.getById(unwrappedParams.id);
        if (response.success && response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [unwrappedParams.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-accent" />
        <p className="text-sm font-medium text-foreground">
          Loading Product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Product Not Found
        </h2>
        <Link href="/seller/products">
          <Button variant="secondary">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return <ProductForm mode="edit" initialData={product} />;
}
