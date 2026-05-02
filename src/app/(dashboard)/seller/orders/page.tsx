"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

/* ──────────── Order Data ──────────── */
const orders: any[] = []; 

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

/* ──────────── Order Row ──────────── */
function OrderRow({ order }: { order: any }) {
  const date = new Date(order.createdAt);
  const timeAgo = getTimeAgo(date);

  return (
    <div className="glass rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-accent/10 transition-all group">
      {/* Order ID & Product */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-accent/20 to-purple-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-accent">
            {order.productName.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {order.productName}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono">{order.id}</span> · {order.buyerName}
          </p>
        </div>
      </div>

      {/* Amount */}
      <div className="md:text-right shrink-0">
        <div className="text-sm font-bold text-foreground">
          {currencySymbols[order.currency]}{order.price.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">{order.currency}</div>
      </div>

      {/* Statuses */}
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={order.paymentStatus} />
        <StatusBadge status={order.orderStatus} />
      </div>

      {/* Time */}
      <div className="text-xs text-muted shrink-0 md:w-20 md:text-right">
        {timeAgo}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title="View details"
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}

/* ──────────── Time Ago Helper ──────────── */
function getTimeAgo(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

/* ──────────── Summary Stats ──────────── */
function OrderStats() {
  const total = orders.length;
  const paid = orders.filter((o) => o.paymentStatus === "paid").length;
  const pending = orders.filter((o) => o.paymentStatus === "pending").length;

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + (o.price || 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="glass rounded-xl p-5 shadow-inner shadow-accent/5">
        <div className="text-2xl font-bold text-foreground font-mono">{total}</div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Orders</div>
      </div>
      <div className="glass rounded-xl p-5 shadow-inner shadow-success/5">
        <div className="text-2xl font-bold text-success font-mono">{paid}</div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Paid</div>
      </div>
      <div className="glass rounded-xl p-5 shadow-inner shadow-warning/5">
        <div className="text-2xl font-bold text-warning font-mono">{pending}</div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Pending</div>
      </div>
      <div className="glass rounded-xl p-5 shadow-inner shadow-accent/5">
        <div className="text-2xl font-bold text-foreground font-mono">
          ${totalRevenue.toFixed(0)}
        </div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Revenue (USD)</div>
      </div>
    </div>
  );
}

/* ──────────── Orders Page ──────────── */
export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending" | "failed">("all");
  const [orderFilter, setOrderFilter] = useState<"all" | "processing" | "completed" | "cancelled" | "failed">("all");

  const filtered = orders.filter((o) => {
    if (paymentFilter !== "all" && o.paymentStatus !== paymentFilter) return false;
    if (orderFilter !== "all" && o.orderStatus !== orderFilter) return false;
    if (
      search &&
      !o.productName.toLowerCase().includes(search.toLowerCase()) &&
      !o.id.toLowerCase().includes(search.toLowerCase()) &&
      !o.buyerName.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track and manage all orders
        </p>
      </div>

      {/* Stats */}
      <OrderStats />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full md:max-w-sm">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50">
            <Search size={18} />
          </span>
          <input
            id="orders-search"
            type="text"
            placeholder="Search by product, order ID, or buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Payment Status */}
          <div className="relative">
            <select
              id="orders-payment-filter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as typeof paymentFilter)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-input-bg border border-input-border text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              <ChevronDown />
            </span>
          </div>

          {/* Order Status */}
          <div className="relative">
            <select
              id="orders-status-filter"
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value as typeof orderFilter)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-input-bg border border-input-border text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="failed">Failed</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              <ChevronDown />
            </span>
          </div>
        </div>
      </div>

      {/* Order List */}
      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center border-dashed border-2 border-card-border">
          <div className="w-20 h-20 rounded-3xl bg-accent/5 flex items-center justify-center mx-auto mb-6 animate-float relative">
            <FileText size={40} className="text-accent/40" />
            <Filter size={16} className="absolute bottom-4 right-4 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {search || paymentFilter !== "all" || orderFilter !== "all"
              ? "No orders match your filters"
              : "No orders yet"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {search || paymentFilter !== "all" || orderFilter !== "all"
              ? "Try adjusting your filters."
              : "When someone purchases your products, orders will appear here."}
          </p>
          {(search || paymentFilter !== "all" || orderFilter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setPaymentFilter("all");
                setOrderFilter("all");
              }}
              className="text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {orders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl glass text-muted-foreground hover:text-foreground transition-all disabled:opacity-30" disabled title="Previous">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-accent text-white text-sm font-bold shadow-lg shadow-accent/20">
              1
            </button>
            <button className="p-2 rounded-xl glass text-muted-foreground hover:text-foreground transition-all disabled:opacity-30" disabled title="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
