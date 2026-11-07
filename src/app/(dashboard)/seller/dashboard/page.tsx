"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  DollarSign,
  Info,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import ButtonLink from "@/components/ButtonLink";

export default function DashboardPage() {
  const publishedQuery = useProducts({
    page: 1,
    limit: 1,
    status: "published",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const draftQuery = useProducts({
    page: 1,
    limit: 1,
    status: "draft",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const publishedCount = publishedQuery.data?.totalProducts ?? 0;
  const draftCount = draftQuery.data?.totalProducts ?? 0;
  const countsLoading = publishedQuery.isLoading || draftQuery.isLoading;

  const kpis = [
    {
      label: "Published products",
      value: countsLoading ? "—" : String(publishedCount),
      detail: countsLoading ? "Loading…" : `${draftCount} draft${draftCount === 1 ? "" : "s"}`,
      icon: Package,
    },
    {
      label: "Total orders",
      value: "—",
      detail: "Not connected yet",
      icon: ShoppingCart,
    },
    {
      label: "Total revenue",
      value: "—",
      detail: "Not connected yet",
      icon: DollarSign,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      <PageHeader
        eyebrow="Creator"
        title="Overview"
        description="A snapshot of your catalog and sales."
        actions={
          <ButtonLink href="/seller/products/new" className="px-5 py-2.5">
            <Plus size={16} />
            New product
          </ButtonLink>
        }
      />

      <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Product counts are live. Revenue and order metrics will populate once
          the dashboard is connected to the orders API.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="surface-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <kpi.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="surface-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-card-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent orders
            </h2>
            <Link
              href="/seller/orders"
              className="flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="p-4">
            <EmptyState
              compact
              icon={ShoppingCart}
              title="No orders to show"
              description="Orders will appear here once the dashboard is connected to the orders API."
            />
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Quick actions
          </h2>
          <div className="space-y-2">
            <Link
              href="/seller/products/new"
              className="flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/10 px-3.5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15"
            >
              <Plus size={16} />
              Add product
            </Link>
            <Link
              href="/seller/products"
              className="flex items-center gap-3 rounded-lg border border-card-border bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              <Package size={16} className="text-muted-foreground" />
              Manage products
            </Link>
            <Link
              href="/discover"
              className="flex items-center gap-3 rounded-lg border border-card-border bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              <ShoppingCart size={16} className="text-muted-foreground" />
              Browse marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
