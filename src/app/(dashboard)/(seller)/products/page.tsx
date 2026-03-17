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

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="3" x2="8" y2="13" />
      <line x1="3" y1="8" x2="13" y2="8" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
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

/* ──────────── Mock Data ──────────── */
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const mockProducts = [
  {
    id: "1",
    title: "React Component Library",
    description: "A comprehensive library of 50+ reusable React components built with TypeScript and Tailwind CSS.",
    price: 29,
    currency: "USD",
    status: "published" as const,
    tags: ["react", "typescript", "tailwind", "components"],
    salesCount: 142,
    thumbnailUrl: "",
    createdAt: "2026-02-15",
  },
  {
    id: "2",
    title: "NextJS SaaS Starter Kit",
    description: "Full-stack SaaS boilerplate with auth, billing, dashboard, and deployment ready.",
    price: 49,
    currency: "USD",
    status: "published" as const,
    tags: ["nextjs", "saas", "boilerplate"],
    salesCount: 98,
    thumbnailUrl: "",
    createdAt: "2026-02-20",
  },
  {
    id: "3",
    title: "UI Design System v2",
    description: "A complete design system with 200+ Figma components and matching code.",
    price: 22,
    currency: "EUR",
    status: "published" as const,
    tags: ["design", "figma", "ui-kit"],
    salesCount: 87,
    thumbnailUrl: "",
    createdAt: "2026-03-01",
  },
  {
    id: "4",
    title: "Icon Pack Pro 2024",
    description: "3000+ premium SVG icons in multiple styles with dark mode support.",
    price: 19,
    currency: "USD",
    status: "draft" as const,
    tags: ["icons", "svg", "design"],
    salesCount: 0,
    thumbnailUrl: "",
    createdAt: "2026-03-10",
  },
  {
    id: "5",
    title: "Tailwind Email Templates",
    description: "20 responsive HTML email templates styled with Tailwind CSS and compatible with all clients.",
    price: 29,
    currency: "GBP",
    status: "published" as const,
    tags: ["email", "tailwind", "templates"],
    salesCount: 51,
    thumbnailUrl: "",
    createdAt: "2026-03-05",
  },
  {
    id: "6",
    title: "API Design Guide eBook",
    description: "A comprehensive guide on designing RESTful APIs with real-world patterns and best practices.",
    price: 1499,
    currency: "INR",
    status: "draft" as const,
    tags: ["ebook", "api", "rest"],
    salesCount: 0,
    thumbnailUrl: "",
    createdAt: "2026-03-12",
  },
];

/* ──────────── Product Card (Grid View) ──────────── */
function ProductCard({
  product,
}: {
  product: (typeof mockProducts)[0];
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
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${
            product.status === "published"
              ? "bg-success/20 text-success backdrop-blur-sm"
              : "bg-warning/20 text-warning backdrop-blur-sm"
          }`}
        >
          {product.status === "published" ? "Published" : "Draft"}
        </span>
        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <EyeIcon />
          </button>
          <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <EditIcon />
          </button>
          <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-danger hover:bg-danger/20 transition-colors">
            <TrashIcon />
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
          {product.tags.slice(0, 3).map((tag) => (
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
  product: (typeof mockProducts)[0];
}) {
  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4 hover:border-accent/20 transition-all group">
      {/* Mini thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
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
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
              product.status === "published"
                ? "bg-success/20 text-success"
                : "bg-warning/20 text-warning"
            }`}
          >
            {product.status}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">{product.description}</p>
        <div className="flex gap-1.5 mt-1.5">
          {product.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-surface text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <div className="font-bold text-foreground">
          {currencySymbols[product.currency]}{product.price.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">{product.salesCount} sales</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <EyeIcon />
        </button>
        <button className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <EditIcon />
        </button>
        <button className="w-8 h-8 rounded-lg hover:bg-danger/10 flex items-center justify-center text-muted-foreground hover:text-danger transition-colors">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

/* ──────────── Empty State ──────────── */
function EmptyState() {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center mx-auto mb-4 animate-float">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No products yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
        Create your first digital product and start selling to customers worldwide.
      </p>
      <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20">
        <PlusIcon />
        Create Product
      </button>
    </div>
  );
}

/* ──────────── Products Page ──────────── */
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const filtered = mockProducts
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
            Manage your digital products ({mockProducts.length} total)
          </p>
        </div>
        <button
          id="products-create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
        >
          <PlusIcon />
          New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full md:max-w-sm">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon />
          </span>
          <input
            id="products-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="flex rounded-xl overflow-hidden border border-card-border">
            {(["all", "published", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
                  statusFilter === s
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
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              <ChevronDown />
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-card-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <ListIcon />
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

      {/* Pagination placeholder */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {mockProducts.length} products
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
