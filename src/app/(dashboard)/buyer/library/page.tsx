"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Download,
  Search,
  Package,
  Grid,
  List,
  ExternalLink,
  FileText,
  ShieldCheck,

} from "lucide-react";


/* ──────────── Components ──────────── */

function PurchaseCardGrid({ purchase }: { purchase: any }) {
  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full border border-card-border/60">
      {/* Thumbnail */}
      <div className={`relative h-40 w-full bg-linear-to-br ${purchase.image} flex items-center justify-center overflow-hidden`}>
        <div className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{purchase.icon}</div>

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-accent/20">
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-1 group-hover:text-accent transition-colors">
          {purchase.productName}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">By {purchase.creatorName}</p>

        <div className="grid grid-cols-1 gap-y-2 mb-4 text-xs">
          <div>
            <span className="text-muted-foreground block mb-0.5">Purchased</span>
            <span className="font-medium text-foreground">{formatDistanceToNow(new Date(purchase.purchasedAt))} ago</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-card-border/50 flex items-center justify-between gap-2">
          <Link href={`/discover/${purchase.id.replace('ord_00', '')}`} className="p-2 rounded-lg bg-surface text-muted-foreground hover:text-foreground transition-colors tooltip-trigger" title="View Product">
            <ExternalLink size={16} />
          </Link>
          <button className="p-2 rounded-lg bg-surface text-muted-foreground hover:text-foreground transition-colors" title="View Invoice">
            <FileText size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PurchaseRowList({ purchase }: { purchase: any }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-accent/30 transition-all group border border-card-border/60">
      {/* Thumbnail */}
      <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${purchase.image} flex items-center justify-center shrink-0`}>
        <span className="text-2xl drop-shadow-md group-hover:scale-110 transition-transform">{purchase.icon}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground truncate group-hover:text-accent transition-colors">{purchase.productName}</h3>
        <p className="text-sm text-muted-foreground">By {purchase.creatorName}</p>
        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          <span>Purchased {formatDistanceToNow(new Date(purchase.purchasedAt))} ago</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 sm:ml-auto w-full sm:w-auto">
        <div className="hidden lg:flex items-center gap-1 mr-4">
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors" title="View Product">
            <ExternalLink size={16} />
          </button>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors" title="Invoice">
            <FileText size={16} />
          </button>
        </div>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 hover:bg-accent text-accent hover:text-white transition-all text-sm font-semibold">
          <Download size={16} /> Download
        </button>
      </div>
    </div>
  );
}

export default function BuyerLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const purchases: any[] = []; // Real wiring would go here

  let filteredPurchases = purchases.filter(p =>
  (p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (sortBy === "newest") {
    filteredPurchases.sort((a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime());
  } else if (sortBy === "oldest") {
    filteredPurchases.sort((a, b) => new Date(a.purchasedAt).getTime() - new Date(b.purchasedAt).getTime());
  } else if (sortBy === "price") {
    filteredPurchases.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access and manage all your purchased digital products.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="glass rounded-xl p-3 px-5 border border-card-border/60 flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Purchases</span>
            <span className="text-xl font-bold text-foreground">{purchases.length}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* ── Main Library Content ── */}
        <div className="lg:col-span-3 space-y-6">

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center glass p-2 pl-4 rounded-2xl border border-card-border/60 shadow-sm">
            <div className="relative flex-1 w-full">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search products or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-card-border/50 pt-3 sm:pt-0 sm:pl-3">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-surface border border-card-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price">Price (High to Low)</option>
              </select>

              <div className="flex rounded-xl overflow-hidden border border-card-border ml-auto sm:ml-2">
                <button onClick={() => setViewMode("grid")} className={`p-2 transition-all ${viewMode === "grid" ? "bg-accent text-white" : "bg-surface text-muted-foreground hover:text-foreground"}`}>
                  <Grid size={16} />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2 transition-all ${viewMode === "list" ? "bg-accent text-white" : "bg-surface text-muted-foreground hover:text-foreground"}`}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          <div className="space-y-4">
            {filteredPurchases.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredPurchases.map(purchase => <PurchaseCardGrid key={purchase.id} purchase={purchase} />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPurchases.map(purchase => <PurchaseRowList key={purchase.id} purchase={purchase} />)}
                </div>
              )
            ) : (
              /* Empty State */
              <div className="glass rounded-3xl p-16 text-center flex flex-col items-center justify-center border-dashed border-2 border-card-border/60">
                <div className="w-16 h-16 rounded-2xl bg-surface border border-card-border flex items-center justify-center mb-4">
                  <Package size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">No products found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                  {searchQuery ? `We couldn't find anything matching "${searchQuery}".` : "You haven't purchased any products yet."}
                </p>
                {!searchQuery && (
                  <Link href="/discover" className="px-6 py-2.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                    Explore Marketplace
                  </Link>
                )}
              </div>
            )}
          </div>

        </div>

        {/* ── Sidebar / Support Modules ── */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-card-border/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Secure Purchases</h3>
                <p className="text-xs text-muted-foreground">Always encrypted & safe</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All files in your library are securely hosted and verified. You have lifetime access to your purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
