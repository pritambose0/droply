"use client";

import { Info, ShoppingCart } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SellerOrdersPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      <PageHeader
        eyebrow="Creator"
        title="Sales"
        description="Track orders for the products in your catalog."
      />

      <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          This page is not connected to the orders API yet. Once connected,
          sales and payment statuses will appear here.
        </p>
      </div>

      <EmptyState
        icon={ShoppingCart}
        title="No sales to show"
        description="When a buyer purchases one of your products, the order will appear here with its payment and fulfillment status."
      />
    </div>
  );
}
