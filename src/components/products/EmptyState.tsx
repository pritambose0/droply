"use client";

import React from "react";
import { Package } from "lucide-react";
import { EmptyState as UIEmptyState } from "@/components/ui/EmptyState";
import ButtonLink from "@/components/ButtonLink";

export const EmptyState: React.FC = () => {
  return (
    <UIEmptyState
      icon={Package}
      title="No products yet"
      description="Create your first listing to start selling digital products on Droply."
      action={
        <ButtonLink href="/seller/products/new" className="px-6 py-2.5">
          Create your first product
        </ButtonLink>
      }
    />
  );
};
