"use client";

import { use } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ProductForm from "@/components/products/ProductForm";
import { Loader2 } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const { data: product, isLoading, isError } = useProduct(unwrappedParams.id);

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

  if (isError || !product) {
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
