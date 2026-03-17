"use client";

import { useState } from "react";

/* ──────────── Icons ──────────── */
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 6 8 10 12 6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

/* ──────────── Mock Data ──────────── */
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const mockOrders = [
  {
    id: "ord_001",
    productName: "React Component Library",
    buyerName: "Alice Johnson",
    buyerEmail: "alice@example.com",
    price: 29,
    currency: "USD",
    paymentStatus: "paid" as const,
    orderStatus: "completed" as const,
    createdAt: "2026-03-15T14:30:00Z",
  },
  {
    id: "ord_002",
    productName: "NextJS SaaS Starter Kit",
    buyerName: "Bob Williams",
    buyerEmail: "bob@example.com",
    price: 49,
    currency: "USD",
    paymentStatus: "paid" as const,
    orderStatus: "completed" as const,
    createdAt: "2026-03-14T10:15:00Z",
  },
  {
    id: "ord_003",
    productName: "UI Design System v2",
    buyerName: "Charlie Davis",
    buyerEmail: "charlie@example.com",
    price: 22,
    currency: "EUR",
    paymentStatus: "pending" as const,
    orderStatus: "processing" as const,
    createdAt: "2026-03-14T08:20:00Z",
  },
  {
    id: "ord_004",
    productName: "React Component Library",
    buyerName: "Diana Miller",
    buyerEmail: "diana@example.com",
    price: 29,
    currency: "USD",
    paymentStatus: "failed" as const,
    orderStatus: "failed" as const,
    createdAt: "2026-03-13T16:45:00Z",
  },
  {
    id: "ord_005",
    productName: "Tailwind Email Templates",
    buyerName: "Edward Brown",
    buyerEmail: "edward@example.com",
    price: 29,
    currency: "GBP",
    paymentStatus: "paid" as const,
    orderStatus: "completed" as const,
    createdAt: "2026-03-13T09:00:00Z",
  },
  {
    id: "ord_006",
    productName: "NextJS SaaS Starter Kit",
    buyerName: "Fiona Garcia",
    buyerEmail: "fiona@example.com",
    price: 49,
    currency: "USD",
    paymentStatus: "pending" as const,
    orderStatus: "processing" as const,
    createdAt: "2026-03-12T14:30:00Z",
  },
  {
    id: "ord_007",
    productName: "UI Design System v2",
    buyerName: "George Martinez",
    buyerEmail: "george@example.com",
    price: 22,
    currency: "EUR",
    paymentStatus: "paid" as const,
    orderStatus: "completed" as const,
    createdAt: "2026-03-12T11:20:00Z",
  },
  {
    id: "ord_008",
    productName: "API Design Guide eBook",
    buyerName: "Helen Wilson",
    buyerEmail: "helen@example.com",
    price: 1499,
    currency: "INR",
    paymentStatus: "paid" as const,
    orderStatus: "completed" as const,
    createdAt: "2026-03-11T07:15:00Z",
  },
];

/* ──────────── Status Badge ──────────── */
function StatusBadge({
  status,
  type,
}: {
  status: string;
  type: "payment" | "order";
}) {
  const colors: Record<string, string> = {
    paid: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    failed: "bg-danger/10 text-danger border-danger/20",
    completed: "bg-success/10 text-success border-success/20",
    processing: "bg-accent/10 text-accent border-accent/20",
    cancelled: "bg-muted/10 text-muted-foreground border-card-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border capitalize ${
        colors[status] || "bg-surface text-muted-foreground border-card-border"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "paid" || status === "completed"
            ? "bg-success"
            : status === "pending" || status === "processing"
            ? status === "pending"
              ? "bg-warning"
              : "bg-accent"
            : "bg-danger"
        }`}
      />
      {status}
    </span>
  );
}

/* ──────────── Order Row ──────────── */
function OrderRow({ order }: { order: (typeof mockOrders)[0] }) {
  const date = new Date(order.createdAt);
  const timeAgo = getTimeAgo(date);

  return (
    <div className="glass rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-accent/10 transition-all group">
      {/* Order ID & Product */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
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
      <div className="md:text-right flex-shrink-0">
        <div className="text-sm font-bold text-foreground">
          {currencySymbols[order.currency]}{order.price.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">{order.currency}</div>
      </div>

      {/* Statuses */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <StatusBadge status={order.paymentStatus} type="payment" />
        <StatusBadge status={order.orderStatus} type="order" />
      </div>

      {/* Time */}
      <div className="text-xs text-muted flex-shrink-0 md:w-20 md:text-right">
        {timeAgo}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title="View details"
        >
          <ExternalLinkIcon />
        </button>
        {order.paymentStatus === "paid" && (
          <button
            className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
            title="Download"
          >
            <DownloadIcon />
          </button>
        )}
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
  const total = mockOrders.length;
  const paid = mockOrders.filter((o) => o.paymentStatus === "paid").length;
  const pending = mockOrders.filter((o) => o.paymentStatus === "pending").length;
  const failed = mockOrders.filter((o) => o.paymentStatus === "failed").length;

  const totalRevenue = mockOrders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + (o.currency === "USD" ? o.price : o.currency === "EUR" ? o.price * 1.1 : o.currency === "GBP" ? o.price * 1.27 : o.price * 0.012), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="glass rounded-xl p-4">
        <div className="text-2xl font-bold text-foreground">{total}</div>
        <div className="text-xs text-muted-foreground">Total Orders</div>
      </div>
      <div className="glass rounded-xl p-4">
        <div className="text-2xl font-bold text-success">{paid}</div>
        <div className="text-xs text-muted-foreground">Paid</div>
      </div>
      <div className="glass rounded-xl p-4">
        <div className="text-2xl font-bold text-warning">{pending}</div>
        <div className="text-xs text-muted-foreground">Pending</div>
      </div>
      <div className="glass rounded-xl p-4">
        <div className="text-2xl font-bold text-foreground">
          ${totalRevenue.toFixed(0)}
        </div>
        <div className="text-xs text-muted-foreground">Revenue (USD)</div>
      </div>
    </div>
  );
}

/* ──────────── Orders Page ──────────── */
export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending" | "failed">("all");
  const [orderFilter, setOrderFilter] = useState<"all" | "processing" | "completed" | "cancelled" | "failed">("all");

  const filtered = mockOrders.filter((o) => {
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
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon />
          </span>
          <input
            id="orders-search"
            type="text"
            placeholder="Search by product, order ID, or buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
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
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center mx-auto mb-4 animate-float">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
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
            Showing {filtered.length} of {mockOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-colors" disabled>
              Previous
            </button>
            <button className="px-3 py-2 rounded-xl bg-accent text-white text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-colors" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
