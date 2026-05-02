"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Grid,
  List,
  ChevronDown,
  Box,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

/* ──────────── Product Card (Grid View) ──────────── */

/* ──────────── Mock Data ──────────── */
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const products: any[] = []; // Real wiring would go here

/* ──────────── Product Card (Grid View) ──────────── */
function ProductCard({
  product,
}: {
  product: any;
}) {
  const gradients = [
    "from-violet-600/20 to-indigo-600/20",
    "from-rose-600/20 to-pink-600/20",
    "from-emerald-600/20 to-teal-600/20",
    "from-amber-600/20 to-orange-600/20",
    "from-sky-600/20 to-cyan-600/20",
    "from-fuchsia-600/20 to-purple-600/20",
  ];
  const gradient = gradients[parseInt(product.id) % gradients.length];

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
      {/* Thumbnail Placeholder */}
      <div className={`relative h-40 bg-linear-to-br ${gradient} flex items-center justify-center`}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={product.status} />
        </div>
        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Preview">
            <Eye size={18} />
          </button>
          <Link href={`/seller/products/${product.id}/edit`} className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Edit">
            <Pencil size={18} />
          </Link>
          <button className="w-9 h-9 rounded-xl bg-danger text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag: any) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-surface text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-surface text-xs text-muted">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        {/* Price & Sales */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold gradient-text">
            {currencySymbols[product.currency]}{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.salesCount > 0 ? `${product.salesCount} sales` : "No sales yet"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Product Row (List View) ──────────── */
function ProductRow({
  product,
}: {
  product: any;
}) {
  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4 hover:border-accent/20 transition-all group">
      {/* Mini thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-accent/20 to-purple-500/20 flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/50">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground truncate">{product.title}</h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">{product.description}</p>
        <div className="flex gap-1.5 mt-1.5">
          {product.tags.slice(0, 4).map((tag: any) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-surface text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <div className="font-bold text-foreground">
          {currencySymbols[product.currency]}{product.price.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">{product.salesCount} sales</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Preview">
          <Eye size={16} />
        </button>
        <Link href={`/seller/products/${product.id}/edit`} className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Edit">
          <Pencil size={16} />
        </Link>
        <button className="w-8 h-8 rounded-lg hover:bg-danger/10 flex items-center justify-center text-muted-foreground hover:text-danger transition-colors" title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

/* ──────────── Empty State ──────────── */
function EmptyState() {
  return (
    <div className="glass rounded-3xl p-16 text-center border-dashed border-2 border-card-border">
      <div className="w-20 h-20 rounded-3xl bg-accent/5 flex items-center justify-center mx-auto mb-6 animate-float">
        <Box size={40} className="text-accent/30" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No products yet</h3>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
        Start your creator journey by uploading your first digital masterpiece. It only takes a minute!
      </p>
      <Link href="/seller/products/new" className="inline-flex items-center gap-2.5 px-8 py-3 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
        <Plus size={20} />
        Create First Product
      </Link>
    </div>
  );
}

/* ──────────── Products Page ──────────── */
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const filtered = products
    .filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "sales") return b.salesCount - a.salesCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your digital products ({products.length} total)
          </p>
        </div>
        <Link
          href="/seller/products/new"
          id="products-create"
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 border border-white/10"
        >
          <Plus size={18} />
          <span>New Product</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full md:max-w-sm">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50">
            <Search size={18} />
          </span>
          <input
            id="products-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-medium shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="flex rounded-xl overflow-hidden border border-card-border">
            {(["all", "published", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${statusFilter === s
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              id="products-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-input-bg border border-input-border text-sm text-foreground focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="createdAt">Newest</option>
              <option value="price">Price</option>
              <option value="sales">Sales</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none">
              <ChevronDown size={14} />
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-card-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-all ${viewMode === "grid"
                ? "bg-accent text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition-all ${viewMode === "list"
                ? "bg-accent text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid / List */}
      {filtered.length === 0 ? (
        search || statusFilter !== "all" ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">No products match your filters.</p>
            <button
              onClick={() => { setSearch(""); setStatusFilter("all"); }}
              className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <EmptyState />
        )
      ) : viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination placeholder removed for MVP clean-up */}
    </div>
  );
}
