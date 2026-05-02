"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, X, Filter, TrendingUp, Download, Users, Package, ShoppingBag } from "lucide-react";

// --- Products ---

const products: any[] = []; // Real wiring would go here

const CATEGORIES = ["All", "Code", "EBook", "Design", "Video", "Templates"];
const SORT_OPTIONS = ["Popular", "Newest", "Price: Low to High", "Price: High to Low"];

// --- Components ---

function ProductCard({ product }: { product: any }) {
  return (
    <div className="group glass rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 border border-card-border/60">
      {/* Thumbnail Area */}
      <div className={`relative h-48 w-full bg-linear-to-br ${product.image} flex items-center justify-center overflow-hidden`}>
        <div className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform duration-500">{product.icon}</div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/10">
            {product.tag}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-linear-to-t from-black/80 to-transparent">
          <Link href={`/discover/${product.id}`} className="block w-full py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-sm text-center font-medium hover:bg-white/30 transition-colors border border-white/20">
            View Details
          </Link>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/discover/${product.id}`} className="block flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mb-4">by <span className="hover:text-foreground cursor-pointer transition-colors">{product.creator}</span></p>

        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <ShoppingBag size={14} />
            {product.sales} sales
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-card-border/50">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {product.price === 0 ? 'Free' : `$${product.price.toFixed(2)}`}
            </span>
          </div>
          <Link href={`/discover/${product.id}`} className="px-4 py-2 rounded-xl bg-surface text-sm font-medium hover:bg-accent hover:text-white transition-all shadow-sm border border-card-border group-hover:border-accent/50">
            Get Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all"); // all, free, paid

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.creator.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter(p => p.tag === activeCategory);
    }

    // Price
    if (priceFilter === "free") result = result.filter(p => p.price === 0);
    if (priceFilter === "paid") result = result.filter(p => p.price > 0);

    // Sort
    if (activeSort === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (activeSort === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    // "Popular" and "Newest" are default mock order for now

    return result;
  }, [searchQuery, activeCategory, activeSort, priceFilter]);

  return (
    <div className="pt-32 pb-24 min-h-screen">

      {/* ── Hero & Stats ── */}
      <div className="px-6 mb-12">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase mb-6 border border-accent/20">
            <TrendingUp size={14} /> The Marketplace
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Discover <span className="gradient-text">Creator Tools</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore thousands of premium digital products, templates, and resources built by top creators around the world.
          </p>

          {/* Marketplace Stats removed for MVP clean-up */}
        </div>
      </div>

      {/* ── Main Marketplace Layout ── */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:bg-surface-hover"
          >
            <Filter size={18} />
            Filters
          </button>

          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none bg-surface"
          >
            {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-10">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === category ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-surface'}`}
                >
                  {category}
                  {activeCategory === category && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Pricing</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'free', label: 'Free Only' },
                { id: 'paid', label: 'Premium Only' }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-3 px-3 py-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${priceFilter === opt.id ? 'bg-accent border-accent' : 'border-card-border group-hover:border-accent/50'}`}>
                    {priceFilter === opt.id && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                  <span className={`text-sm font-medium ${priceFilter === opt.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {opt.label}
                  </span>
                  <input type="radio" name="price" value={opt.id} checked={priceFilter === opt.id} onChange={(e) => setPriceFilter(e.target.value)} className="hidden" />
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 space-y-6">

          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass p-2 pl-4 rounded-2xl sticky top-24 z-20 shadow-sm">
            <div className="relative flex-1 w-full flex items-center">
              <Search className="text-muted-foreground absolute left-0" size={20} />
              <input
                type="text"
                placeholder="Search products, creators, or templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground pl-10 pr-10 py-2"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-0 p-1 text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-3 shrink-0 border-l border-card-border/50 pl-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer appearance-none pr-4"
              >
                {SORT_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-surface">{opt}</option>)}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-3xl p-16 text-center flex flex-col items-center justify-center animate-fade-in-up">
              {/* Empty State */}
              <div className="w-20 h-20 rounded-full bg-surface border border-card-border flex items-center justify-center mb-6">
                <Search className="text-muted-foreground" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                We couldn't find anything matching "{searchQuery}". Try adjusting your search or filters.
              </p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); setPriceFilter("all"); }} className="px-6 py-3 rounded-xl bg-surface border border-card-border text-foreground font-medium hover:bg-surface-hover transition-colors">
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {
        isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative w-4/5 max-w-sm h-full bg-background border-l border-card-border p-6 overflow-y-auto shadow-2xl animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 rounded-lg bg-surface text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map(category => (
                      <button
                        key={category}
                        onClick={() => { setActiveCategory(category); setIsMobileFiltersOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${activeCategory === category ? 'bg-accent/10 text-accent' : 'bg-surface text-foreground hover:bg-surface-hover'}`}
                      >
                        {category}
                        {activeCategory === category && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Pricing</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: 'free', label: 'Free Only' },
                      { id: 'paid', label: 'Premium Only' }
                    ].map(opt => (
                      <label key={opt.id} className="flex items-center gap-3 px-3 py-2 cursor-pointer bg-surface rounded-lg border border-card-border">
                        <input type="radio" name="mobile-price" value={opt.id} checked={priceFilter === opt.id} onChange={(e) => setPriceFilter(e.target.value)} className="w-4 h-4 text-accent bg-background border-card-border focus:ring-accent" />
                        <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div >
  );
}
