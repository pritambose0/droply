"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Download,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Tag,
  RefreshCw,
  FileText,
  Package,
  Globe,
  Zap,
  Users,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────── */
const product = {
  id: "1",
  name: "Sample Product",
  price: 0,
  currency: "USD",
  salesCount: 0,
  icon: "📦",
  gradient: "from-accent/20 to-purple-500/10",
  description: "Product description will appear here.",
  includes: [],
  tags: [],
  techStack: [],
  creator: {
    name: "Creator",
    bio: "",
    productsCount: 0,
    totalSales: 0,
    avatar: "U",
    avatarGradient: "from-accent to-purple-400",
  },
};

const relatedProducts: any[] = [];


type TabKey = "description" | "includes" | "tech";

function IncludesItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 py-2.5 border-b border-card-border/50 last:border-0 group">
      <CheckCircle2
        size={18}
        className="text-success shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
      />
      <span className="text-sm text-muted-foreground leading-relaxed">{text}</span>
    </li>
  );
}

function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-card-border text-muted-foreground hover:border-accent/30 hover:text-accent transition-all cursor-default">
      <Tag size={11} />
      {label}
    </span>
  );
}

function ContentTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: "Description", icon: <FileText size={15} /> },
    { key: "includes", label: "What's Included", icon: <Package size={15} /> },
    { key: "tech", label: "Tech Stack", icon: <Globe size={15} /> },
  ];

  return (
    <div className="flex gap-1 p-1 rounded-xl bg-surface border border-card-border w-fit overflow-x-auto max-w-full no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex shrink-0 items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === tab.key
            ? "bg-accent/10 text-accent border border-accent/20"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function RelatedProductCard({
  product,
}: {
  product: (typeof relatedProducts)[0];
}) {
  return (
    <Link
      href={`/discover/${product.id}`}
      className="group glass rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col gap-4 border border-card-border/60"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface border border-card-border flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
          {product.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">by {product.creator}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-card-border">
        <span className="text-sm font-bold text-foreground">{product.price}</span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────
   PURCHASE SIDEBAR CARD
───────────────────────────────────────────────── */
function PurchaseCard({
  price,
  currency,
  onBuy,
}: {
  price: number;
  currency: string;
  onBuy: () => void;
}) {
  return (
    <div className="glass rounded-2xl p-6 space-y-5 sticky top-28 border border-card-border/60 shadow-xl">
      {/* Price */}
      <div>
        <div className="text-3xl font-bold text-foreground tracking-tight">
          ${price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground ml-2">{currency}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">One-time purchase · Lifetime access</p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button
          id="product-buy-now"
          onClick={onBuy}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Buy Now — Instant Download
        </button>
      </div>

      {/* Trust Badges */}
      <div className="space-y-3 pt-4 border-t border-card-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Shield size={15} className="text-success shrink-0" />
          <span>Secure checkout — SSL encrypted</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Download size={15} className="text-accent shrink-0" />
          <span>Instant delivery after payment</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <RefreshCw size={15} className="text-purple-400 shrink-0" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Zap size={15} className="text-warning shrink-0" />
          <span>Lifetime updates included</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────── */
export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [purchased, setPurchased] = useState(false);

  // In a real MVP, we would fetch product by ID here
  const p = product;

  const handleBuy = () => {
    setPurchased(true);
    setTimeout(() => setPurchased(false), 3000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-3 animate-fade-in">
          <Link
            href="/discover"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Discover
          </Link>
          <span className="text-card-border">/</span>
          <span className="text-muted-foreground text-sm truncate max-w-xs hidden sm:block font-medium">
            {p.name}
          </span>
        </div>

        {/* ── Hero Section ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start animate-fade-in-up">
          {/* Left: Product info */}
          <div className="space-y-6">
            {/* Thumbnail */}
            <div
              className={`relative w-full h-64 md:h-80 rounded-3xl glass bg-gradient-to-br ${p.gradient} border border-card-border/60 flex items-center justify-center overflow-hidden group shadow-lg`}
            >
              {/* Abstract glow orbs */}
              <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />

              {/* Product icon */}
              <div className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-surface/80 border border-card-border backdrop-blur-md flex items-center justify-center text-5xl mx-auto shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  {p.icon}
                </div>
              </div>


            </div>

            {/* Title + meta */}
            <div className="space-y-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                In Stock
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {p.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Users size={16} className="text-muted-foreground" />
                <span>{p.salesCount.toLocaleString()} <span className="text-muted-foreground font-normal">buyers</span></span>
              </div>
            </div>
          </div>

          {/* Mobile purchase card */}
          <div className="lg:hidden mt-6">
            <PurchaseCard
              price={p.price}
              currency={p.currency}
              onBuy={handleBuy}
            />
          </div>
        </div>

        {/* Right: Purchase card (desktop) */}
        <div className="hidden lg:block">
          <PurchaseCard
            price={p.price}
            currency={p.currency}
            onBuy={handleBuy}
          />
        </div>
      </div>

      {/* ── Purchase success toast ── */}
      {purchased && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-success/10 border border-success/30 backdrop-blur-xl shadow-2xl animate-fade-in-up">
          <CheckCircle2 size={20} className="text-success" />
          <div>
            <p className="text-sm font-bold text-foreground">Purchase Successful!</p>
            <p className="text-xs text-muted-foreground">Your download is ready.</p>
          </div>
        </div>
      )}

      {/* ── Tabbed Content ── */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start animate-fade-in-up delay-100">
        <div className="space-y-6">
          <ContentTabs active={activeTab} onChange={setActiveTab} />

          <div className="glass rounded-3xl p-6 md:p-8 min-h-48 border border-card-border/60 shadow-lg">

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">About this product</h2>
                <div className="space-y-4">
                  {p.description.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-card-border/60">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <TagBadge key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Includes Tab */}
            {activeTab === "includes" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">What&apos;s included</h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 uppercase tracking-widest">
                    {p.includes.length} items
                  </span>
                </div>
                <ul className="space-y-0">
                  {p.includes.map((item, i) => (
                    <IncludesItem key={i} text={item} />
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Tab */}
            {activeTab === "tech" && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">Tech Stack</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {p.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-card-border hover:border-accent/30 hover:bg-surface-hover transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform shadow-sm shadow-accent/50" />
                      <span className="text-sm font-semibold text-foreground">{tech}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-card-border/60 grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">License</p>
                    <p className="text-sm font-semibold text-foreground">Single-use commercial</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">File Format</p>
                    <p className="text-sm font-semibold text-foreground">.zip archive</p>
                  </div>
                </div>
              </div>
            )}



          </div>
        </div>

        {/* ── Creator Card ── */}
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 lg:sticky lg:top-28 h-fit animate-fade-in-up delay-200 border border-card-border/60 shadow-lg">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Creator</p>

          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.creator.avatarGradient} flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-accent/20 shrink-0`}
            >
              {p.creator.avatar}
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">{p.creator.name}</h3>
              <p className="text-xs font-medium text-success flex items-center gap-1 mt-0.5"><CheckCircle2 size={12} /> Verified Creator</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {p.creator.bio}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-surface border border-card-border">
              <p className="text-lg font-bold text-foreground">{p.creator.productsCount}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Products</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-surface border border-card-border">
              <p className="text-lg font-bold text-foreground">{(p.creator.totalSales / 1000).toFixed(1)}k+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Total Sales</p>
            </div>
          </div>

          <button
            id="view-creator-profile"
            className="w-full py-3 rounded-xl bg-surface hover:bg-surface-hover border border-card-border text-sm font-semibold text-foreground transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            View Portfolio
          </button>
        </div>
      </div>

      {/* ── Related Products ── */}
      <div className="space-y-6 animate-fade-in-up delay-300">
        <div className="flex items-end justify-between border-b border-card-border/50 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
            <p className="text-sm text-muted-foreground mt-1">Customers who bought this also loved</p>
          </div>
          <Link
            href="/discover"
            className="text-sm font-bold text-accent hover:text-purple-400 transition-colors flex items-center gap-1.5"
          >
            Browse All
            <ExternalLink size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden animate-fade-in-up delay-400 border border-card-border/60 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-md">
              Join {p.salesCount.toLocaleString()}+ developers building faster. Instant download after secure purchase.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleBuy}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-bold text-base hover:opacity-90 transition-all shadow-xl shadow-accent/20 hover:-translate-y-1"
            >
              <Download size={20} />
              Buy Now — ${p.price}
            </button>
          </div>
        </div>
      </div>

    </div>

  );
}
