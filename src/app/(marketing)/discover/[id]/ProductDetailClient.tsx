"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Package,
  RefreshCw,
  Shield,
  ShoppingBag,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { useMarketplaceProduct } from "@/hooks/useMarketplace";
import { getApiErrorMessage } from "@/hooks/useProducts";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import type {
  MarketplaceProduct,
  MarketplaceProductDetail,
} from "@/types/marketplace";

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

type TabKey = "description" | "details" | "tags";

function formatPrice(product: Pick<MarketplaceProduct, "price" | "currency">) {
  if (product.price === 0) return "Free";

  return `${currencySymbols[product.currency] ?? product.currency}${product.price.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}

function IncludesItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 py-2.5 border-b border-card-border/50 last:border-0 group">
      <CheckCircle2
        size={18}
        className="text-success shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
      />
      <span className="text-sm text-muted-foreground leading-relaxed">
        {text}
      </span>
    </li>
  );
}

function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-card-border text-muted-foreground hover:border-accent/30 hover:text-accent transition-all cursor-default capitalize">
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
  onChange: (tab: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: "Description", icon: <FileText size={15} /> },
    { key: "details", label: "Details", icon: <Package size={15} /> },
    { key: "tags", label: "Tags", icon: <Tag size={15} /> },
  ];

  return (
    <div className="flex gap-1 p-1 rounded-xl bg-surface border border-card-border w-fit overflow-x-auto max-w-full no-scrollbar">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant="none"
          onClick={() => onChange(tab.key)}
          className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${
            active === tab.key
              ? "bg-accent/10 text-accent border border-accent/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.icon}
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

function PurchaseCard({
  product,
  onBuy,
}: {
  product: MarketplaceProduct;
  onBuy: () => void;
}) {
  return (
    <div className="glass rounded-2xl p-6 space-y-5 sticky top-28 border border-card-border/60 shadow-xl">
      <div>
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {formatPrice(product)}
          {product.price > 0 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              {product.currency}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          One-time purchase · Lifetime access
        </p>
      </div>

      <div className="space-y-3">
        <Button
          id="product-buy-now"
          onClick={onBuy}
          className="w-full py-3.5 font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
        >
          <Download size={18} />
          Buy Now — Instant Download
        </Button>
      </div>

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

function DetailSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12 animate-pulse">
        <div className="h-4 w-40 rounded bg-white/5" />
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-6">
            <div className="w-full h-64 md:h-80 rounded-3xl bg-white/5" />
            <div className="h-6 w-24 rounded-full bg-white/5" />
            <div className="h-12 w-3/4 rounded-xl bg-white/10" />
            <div className="h-4 w-44 rounded bg-white/5" />
          </div>
          <div className="hidden lg:block glass rounded-2xl p-6 space-y-5">
            <div className="h-9 w-28 rounded-xl bg-white/10" />
            <div className="h-4 w-40 rounded bg-white/5" />
            <div className="h-12 w-full rounded-xl bg-white/10" />
            <div className="space-y-3 pt-4 border-t border-card-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-3 w-48 rounded bg-white/5" />
              ))}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-6">
            <div className="h-10 w-72 rounded-xl bg-white/5" />
            <div className="glass rounded-3xl p-8 space-y-4">
              <div className="h-7 w-48 rounded-xl bg-white/10" />
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-4 w-full rounded bg-white/5" />
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl p-6 space-y-5">
            <div className="h-3 w-16 rounded bg-white/5" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-white/10" />
                <div className="h-3 w-24 rounded bg-white/5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailClient({
  id,
  initialProduct,
}: {
  id: string;
  initialProduct: MarketplaceProductDetail;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { data: product, error, refetch } = useMarketplaceProduct(
    id,
    initialProduct,
  );

  const handleBuy = () => {
    if (!session) {
      router.push(
        `/sign-in?callbackUrl=${encodeURIComponent(`/discover/${id}`)}`,
      );
      return;
    }

    if (session.user.role === "creator") {
      setNotice({
        type: "error",
        message: "Switch to a buyer account to purchase this product.",
      });
      return;
    }

    setNotice({
      type: "success",
      message: "Checkout is not connected yet. Please check back soon.",
    });
  };

  if (!product && !error) return <DetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="glass rounded-3xl p-12 max-w-lg w-full text-center border border-danger/20">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Product not available
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {getApiErrorMessage(
              error,
              "This product may have been removed or is no longer published.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={() => refetch()}>
              <RefreshCw size={16} /> Try again
            </Button>
            <ButtonLink
              href="/discover"
              variant="secondary"
              className="px-5 py-2.5 font-semibold"
            >
              <ArrowLeft size={16} /> Back to marketplace
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-3 animate-fade-in">
          <Link
            href="/discover"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Discover
          </Link>
          <span className="text-card-border">/</span>
          <span className="text-muted-foreground text-sm truncate max-w-xs hidden sm:block font-medium">
            {product.title}
          </span>
        </div>

        {/* ── Hero Section ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start animate-fade-in-up">
          {/* Left: Product info */}
          <div className="space-y-6">
            <div className="relative w-full h-64 md:h-80 rounded-3xl glass bg-linear-to-br from-accent/20 to-purple-500/10 border border-card-border/60 overflow-hidden group shadow-lg">
              {product.thumbnailUrl ? (
                <Image
                  src={product.thumbnailUrl}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={72} className="text-white/40" />
                </div>
              )}

              {product.tags[0] && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/10 capitalize">
                  <Tag size={12} />
                  {product.tags[0]}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                In Stock
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {product.title}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Users size={16} className="text-muted-foreground" />
                <span>
                  {product.salesCount.toLocaleString()}{" "}
                  <span className="text-muted-foreground font-normal">
                    buyers
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <ShoppingBag size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground font-normal">
                  by {product.creator.name}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile purchase card */}
          <div className="lg:hidden mt-6">
            <PurchaseCard product={product} onBuy={handleBuy} />
          </div>
        </div>

        {/* Right: Purchase card (desktop) */}
        <div className="hidden lg:block">
          <PurchaseCard product={product} onBuy={handleBuy} />
        </div>
      </div>

      {/* ── Purchase notice ── */}
      {notice && (
        <div
          className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-2xl animate-fade-in-up border ${
            notice.type === "success"
              ? "bg-success/10 border-success/30"
              : "bg-danger/10 border-danger/30"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 size={20} className="text-success" />
          ) : (
            <AlertCircle size={20} className="text-danger" />
          )}
          <div>
            <p className="text-sm font-bold text-foreground">
              {notice.type === "success" ? "Almost there" : "Can't purchase"}
            </p>
            <p className="text-xs text-muted-foreground">{notice.message}</p>
          </div>
          <Button
            variant="none"
            onClick={() => setNotice(null)}
            className="ml-2 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss notice"
          >
            ✕
          </Button>
        </div>
      )}

      {/* ── Tabbed Content ── */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start animate-fade-in-up delay-100">
        <div className="space-y-6 my-4">
          <ContentTabs active={activeTab} onChange={setActiveTab} />

          <div className="glass rounded-3xl p-6 md:p-8 min-h-48 border border-card-border/60 shadow-lg">
            {activeTab === "description" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">
                  About this product
                </h2>
                <div className="space-y-4">
                  {product.description.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm md:text-base text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {product.tags.length > 0 && (
                  <div className="pt-6 border-t border-card-border/60">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <TagBadge key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">
                  Product details
                </h2>
                <ul className="space-y-0">
                  <IncludesItem text={`Price: ${formatPrice(product)}`} />
                  <IncludesItem text={`Currency: ${product.currency}`} />
                  <IncludesItem
                    text={`Sales: ${product.salesCount.toLocaleString()} completed purchases`}
                  />
                  <IncludesItem
                    text={`Listed: ${format(new Date(product.createdAt), "PPP")}`}
                  />
                  <IncludesItem
                    text={`Last updated: ${format(new Date(product.updatedAt), "PPP")}`}
                  />
                </ul>
              </div>
            )}

            {activeTab === "tags" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">
                    Tags & categories
                  </h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 uppercase tracking-widest">
                    {product.tags.length} tags
                  </span>
                </div>
                {product.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <TagBadge key={tag} label={tag} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    This product has no tags yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Creator Card ── */}
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 lg:sticky lg:top-28 h-fit animate-fade-in-up delay-200 border border-card-border/60 shadow-lg">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Creator
          </p>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-accent to-purple-400 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-accent/20 shrink-0 uppercase">
              {product.creator.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">
                {product.creator.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground mt-0.5 flex items-center gap-1">
                <Globe size={12} /> Marketplace creator
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-surface border border-card-border">
              <p className="text-lg font-bold text-foreground">
                {product.creator.productsCount}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                Products
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-surface border border-card-border">
              <p className="text-lg font-bold text-foreground">
                {product.creator.totalSales.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                Total Sales
              </p>
            </div>
          </div>

          <ButtonLink
            href="/discover"
            variant="secondary"
            className="w-full py-3 font-semibold"
          >
            <ExternalLink size={16} />
            Explore More Products
          </ButtonLink>
        </div>
      </div>

      {/* ── Related Products ── */}
      <div className="space-y-6 animate-fade-in-up delay-300">
        <div className="flex items-end justify-between border-b border-card-border/50 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Related Products
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              More products you might like
            </p>
          </div>
          <Link
            href="/discover"
            className="text-sm font-bold text-accent hover:text-purple-400 transition-colors flex items-center gap-1.5"
          >
            Browse All
            <ExternalLink size={14} />
          </Link>
        </div>

        {product.relatedProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <MarketplaceProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No related products yet.{" "}
            <Link href="/discover" className="text-accent hover:underline">
              Explore the marketplace
            </Link>
            .
          </div>
        )}
      </div>
    </div>
  );
}
