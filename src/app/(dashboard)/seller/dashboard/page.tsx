"use client";

import Link from "next/link";
import {
  Plus,
  DollarSign,
  ShoppingCart,
  Package,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

/* ─── Data ─── */

const REVENUE_DATA: any[] = [];

const RECENT_ORDERS: any[] = [];

const KPIS = [
  {
    label: "Total Revenue",
    value: "$0",
    change: "+0%",
    up: true,
    icon: DollarSign,
    accent: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Total Orders",
    value: "0",
    change: "+0%",
    up: true,
    icon: ShoppingCart,
    accent: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Active Products",
    value: "0",
    change: "0 drafts",
    up: null,
    icon: Package,
    accent: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

/* ─── Status Badge ─── */
function OrderStatus({ status }: { status: string }) {
  if (status === "paid")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
        <CheckCircle2 size={10} /> Paid
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
        <Clock size={10} /> Pending
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/20">
      <XCircle size={10} /> Failed
    </span>
  );
}

/* ─── Page ─── */
export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in-up">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your store at a glance.
          </p>
        </div>
        <Link
          href="/seller/products/new"
          id="dashboard-new-product"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 self-start sm:self-auto"
        >
          <Plus size={16} />
          New Product
        </Link>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="glass rounded-2xl p-5 border border-card-border/60 flex flex-col gap-4 hover:border-card-border transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {kpi.label}
              </span>
              <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center ${kpi.accent} shrink-0`}>
                <kpi.icon size={16} strokeWidth={2} />
              </div>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {kpi.value}
              </p>
              <p
                className={`text-xs font-medium mt-1 ${kpi.up === true
                  ? "text-success"
                  : kpi.up === false
                    ? "text-danger"
                    : "text-muted-foreground"
                  }`}
              >
                {kpi.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Row: Recent Orders + Quick Actions ── */}
      <div className="grid lg:grid-cols-[1fr_260px] gap-6">

        {/* Recent Orders */}
        <div className="glass rounded-2xl border border-card-border/60 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-card-border/60">
            <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
            <Link
              href="/seller/orders"
              className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-card-border/40">
            {RECENT_ORDERS.length > 0 ? RECENT_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-surface/40 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {order.product}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {order.buyer}{" "}
                    <span className="font-mono text-muted-foreground/60">· {order.id}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <OrderStatus status={order.status} />
                  <span className="text-sm font-bold text-foreground w-10 text-right">
                    ${order.amount}
                  </span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                No recent orders to show.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6 border border-card-border/60 flex flex-col gap-3">
          <h2 className="text-base font-bold text-foreground mb-1">Quick Actions</h2>
          <Link
            href="/seller/products/new"
            id="qa-add-product"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-semibold text-sm transition-colors border border-accent/20"
          >
            <Plus size={16} />
            Add Product
          </Link>
          <Link
            href="/seller/products"
            id="qa-manage-products"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface hover:bg-surface-hover text-foreground font-medium text-sm transition-colors border border-card-border"
          >
            <Package size={16} className="text-muted-foreground" />
            Manage Products
          </Link>
          <Link
            href="/seller/orders"
            id="qa-view-orders"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface hover:bg-surface-hover text-foreground font-medium text-sm transition-colors border border-card-border"
          >
            <ShoppingCart size={16} className="text-muted-foreground" />
            View Orders
          </Link>
        </div>

      </div>
    </div>
  );
}
