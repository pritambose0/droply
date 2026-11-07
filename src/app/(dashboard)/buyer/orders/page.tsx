"use client";

import { ReceiptText, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import ButtonLink from "@/components/ButtonLink";

export default function BuyerOrdersPage() {
  const orders: unknown[] = [];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      <PageHeader
        eyebrow="Buyer"
        title="Order History"
        description="Review your past purchases and payment statuses."
      />

      {orders.length === 0 ? (
        <EmptyState
          icon={ReceiptText}
          title="No orders yet"
          description="Your order history will appear here once checkout is enabled and your first purchase is completed."
          action={
            <ButtonLink href="/discover" className="px-5 py-2.5">
              <ShoppingBag size={16} />
              Explore products
            </ButtonLink>
          }
        />
      ) : null}

      <div className="surface-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          How orders work
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Each order records the product, captured price, currency, and payment
          status. Download access is granted only after an order is paid and
          completed.
        </p>
      </div>
    </div>
  );
}
