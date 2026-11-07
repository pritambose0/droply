"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Download,
  FileText,
  Globe,
  Info,
  Package,
  RefreshCw,
  Shield,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";
import { useMarketplaceProduct } from "@/hooks/useMarketplace";
import { getApiErrorMessage } from "@/hooks/useProducts";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { formatMarketplacePrice } from "@/lib/formatPrice";
import type {
  MarketplaceProduct,
  MarketplaceProductDetail,
} from "@/types/marketplace";

type TabKey = "description" | "details" | "tags";

function ProductGallery({
  imageUrl,
  title,
  category,
}: {
  imageUrl: string;
  title: string;
  category?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <>
      <div className="space-y-3">
        <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-card-border bg-surface sm:rounded-3xl">
          {!imageLoaded && !imageFailed && imageUrl && (
            <div className="absolute inset-0 animate-pulse bg-surface" />
          )}

          {imageUrl && !imageFailed ? (
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="absolute inset-0 flex h-full w-full cursor-zoom-in items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent-hover"
              aria-label={`View larger image of ${title}`}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
                className={`object-cover object-center transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                Click to enlarge
              </span>
            </button>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground/50">
              <Package size={52} strokeWidth={1} />
              <span className="text-sm">Image unavailable</span>
            </div>
          )}

          {category && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-medium capitalize text-white backdrop-blur">
              <Tag size={12} />
              {category}
            </span>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Product image
        </p>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`Larger image of ${title}`}
        onCancel={(event) => {
          event.preventDefault();
          dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialogRef.current?.close();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
        className="m-auto max-h-[92dvh] max-w-[94vw] overflow-visible rounded-2xl border border-white/10 bg-background p-2 text-foreground shadow-2xl backdrop:bg-black/90 sm:p-4"
      >
        <div className="relative h-[78dvh] w-[90vw] max-w-6xl">
          {!imageFailed && imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="90vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package size={56} className="text-muted-foreground/40" />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close enlarged image"
          className="absolute -right-2 -top-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#18181b] text-white transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-accent-hover"
        >
          <X size={18} />
        </button>
      </dialog>
    </>
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
    <div className="surface-card space-y-5 p-5 sm:p-6">
      <div>
        <p className="mb-1 text-xs font-medium text-muted-foreground">Price</p>
        <div className="text-3xl font-bold tracking-tight text-foreground">
          {formatMarketplacePrice(product.price, product.currency)}
          {product.price > 0 && (
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              {" "}
              {product.currency}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">One-time purchase</p>
      </div>

      <Button
        id="product-buy-now"
        onClick={onBuy}
        className="w-full py-3.5 font-semibold"
      >
        <Download size={18} />
        Buy now
      </Button>

      <div className="space-y-3 border-t border-card-border pt-4">
        <div className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <Info size={15} className="mt-0.5 shrink-0 text-accent" />
          <span>Checkout is not connected yet</span>
        </div>
        <div className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <Download size={15} className="mt-0.5 shrink-0 text-accent" />
          <span>Downloads unlock after a paid order</span>
        </div>
        <div className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <Shield size={15} className="mt-0.5 shrink-0 text-success" />
          <span>Purchases are tied to your account</span>
        </div>
      </div>
    </div>
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
    { key: "description", label: "Overview", icon: <FileText size={15} /> },
    { key: "details", label: "Details", icon: <Package size={15} /> },
    { key: "tags", label: "Tags", icon: <Tag size={15} /> },
  ];

  return (
    <div
      className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-card-border bg-surface p-1 no-scrollbar"
      aria-label="Product information"
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          aria-pressed={active === tab.key}
          className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-hover ${
            active === tab.key
              ? "border border-accent/20 bg-accent/10 text-accent"
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

function DetailSkeleton() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl animate-pulse space-y-8">
        <div className="h-4 w-44 rounded bg-surface" />
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <div className="aspect-4/3 rounded-3xl bg-surface" />
            <div className="h-4 w-24 rounded bg-surface" />
            <div className="h-10 w-3/4 rounded-xl bg-surface" />
            <div className="h-4 w-full rounded bg-surface" />
          </div>
          <div className="surface-card space-y-5 p-6">
            <div className="h-9 w-28 rounded bg-surface" />
            <div className="h-4 w-40 rounded bg-surface" />
            <div className="h-12 w-full rounded-xl bg-surface" />
            <div className="space-y-3 border-t border-card-border pt-4">
              <div className="h-4 w-full rounded bg-surface" />
              <div className="h-4 w-5/6 rounded bg-surface" />
              <div className="h-4 w-4/5 rounded bg-surface" />
            </div>
          </div>
        </div>
        <div className="h-48 rounded-2xl bg-surface" />
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-b border-card-border/70 py-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-medium text-foreground">
        {value}
      </dd>
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
    type: "info" | "error";
    message: string;
  } | null>(null);

  const {
    data: product,
    error,
    refetch,
  } = useMarketplaceProduct(id, initialProduct);

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
      type: "info",
      message: "Checkout is not connected yet. Please check back soon.",
    });
  };

  if (!product && !error) return <DetailSkeleton />;

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
        <div className="w-full max-w-lg rounded-2xl border border-danger/20 bg-danger/5 p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <AlertCircle size={24} />
          </div>
          <h1 className="mb-2 text-xl font-semibold text-foreground">
            Product not available
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {getApiErrorMessage(
              error,
              "This product may have been removed or is no longer published.",
            )}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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

  const listedDate = format(new Date(product.createdAt), "MMM d, yyyy");

  return (
    <div className="min-h-screen overflow-x-clip px-4 pb-32 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-14">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-2 text-sm"
        >
          <Link
            href="/discover"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Discover
          </Link>
          {product.tags[0] && (
            <>
              <span aria-hidden="true" className="text-card-border">
                /
              </span>
              <span className="max-w-32 truncate capitalize text-muted-foreground sm:max-w-none">
                {product.tags[0]}
              </span>
            </>
          )}
          <span aria-hidden="true" className="text-card-border">
            /
          </span>
          <span className="min-w-0 truncate font-medium text-foreground">
            {product.title}
          </span>
        </nav>

        <section
          aria-labelledby="product-title"
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12"
        >
          <div className="min-w-0 space-y-5">
            <ProductGallery
              key={product.thumbnailUrl}
              imageUrl={product.thumbnailUrl}
              title={product.title}
              category={product.tags[0]}
            />

            <div className="space-y-4">
              <h1
                id="product-title"
                className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
              >
                {product.title}
              </h1>
              <p className="line-clamp-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                {product.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-card-border pt-4 text-sm">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag size={15} className="text-accent" />
                  {product.salesCount.toLocaleString()}{" "}
                  {product.salesCount === 1 ? "sale" : "sales"}
                </span>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Globe size={15} className="text-accent" />
                  Listed {listedDate}
                </span>
              </div>
            </div>
          </div>

          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <PurchaseCard product={product} onBuy={handleBuy} />
          </aside>
        </section>

        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="min-w-0 space-y-4">
            <ContentTabs active={activeTab} onChange={setActiveTab} />

            <div className="surface-card min-h-56 p-5 sm:p-8">
              {activeTab === "description" && (
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                      Product overview
                    </p>
                    <h2 className="text-xl font-semibold text-foreground">
                      About this product
                    </h2>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                    Product information
                  </p>
                  <h2 className="mb-4 text-xl font-semibold text-foreground">
                    Details
                  </h2>
                  <dl>
                    <DetailRow
                      label="Price"
                      value={formatMarketplacePrice(
                        product.price,
                        product.currency,
                      )}
                    />
                    <DetailRow label="Currency" value={product.currency} />
                    <DetailRow
                      label="Sales"
                      value={product.salesCount.toLocaleString()}
                    />
                    <DetailRow label="Listed" value={listedDate} />
                    <DetailRow
                      label="Updated"
                      value={format(new Date(product.updatedAt), "MMM d, yyyy")}
                    />
                  </dl>
                </div>
              )}

              {activeTab === "tags" && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                    Browse by topic
                  </p>
                  <h2 className="mb-5 text-xl font-semibold text-foreground">
                    Tags
                  </h2>
                  {product.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 rounded-full border border-card-border bg-surface px-3.5 py-2 text-sm capitalize text-muted-foreground"
                        >
                          <Tag size={13} className="text-accent" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No tags provided.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <aside className="surface-card h-fit space-y-5 p-5 sm:p-6">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Seller
              </p>
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-lg font-semibold uppercase text-accent"
                >
                  {product.creator.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate font-semibold text-foreground">
                    {product.creator.name}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe size={12} />
                    Marketplace creator
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-card-border pt-4">
              <div className="rounded-xl bg-surface p-3">
                <p className="text-lg font-semibold text-foreground">
                  {product.creator.productsCount.toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">Products</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="text-lg font-semibold text-foreground">
                  {product.creator.totalSales.toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Total sales
                </p>
              </div>
            </div>

            <Link
              href="/discover"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-card-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent-hover"
            >
              Explore marketplace
              <ArrowUpRight size={15} />
            </Link>
          </aside>
        </section>

        <section
          aria-labelledby="related-products-heading"
          className="space-y-6"
        >
          <div className="flex items-end justify-between gap-4 border-b border-card-border pb-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Keep exploring
              </p>
              <h2
                id="related-products-heading"
                className="text-xl font-semibold text-foreground sm:text-2xl"
              >
                More Products You Might Like
              </h2>
            </div>
            <Link
              href="/discover"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Browse all
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {product.relatedProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.relatedProducts.map((relatedProduct) => (
                <MarketplaceProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-card-border bg-surface/30 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No related products yet.{" "}
                <Link
                  href="/discover"
                  className="font-medium text-accent hover:underline"
                >
                  Explore the marketplace
                </Link>
                .
              </p>
            </div>
          )}
        </section>
      </div>

      {notice && (
        <div
          role={notice.type === "error" ? "alert" : "status"}
          className={`fixed bottom-24 left-4 right-4 z-40 flex items-start gap-3 rounded-2xl border p-4 shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md ${
            notice.type === "info"
              ? "border-accent/30 bg-[#15121d]"
              : "border-danger/30 bg-[#1a1113]"
          }`}
        >
          {notice.type === "info" ? (
            <Info size={18} className="mt-0.5 shrink-0 text-accent" />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-danger" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              {notice.type === "info"
                ? "Checkout not connected"
                : "Can't purchase"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {notice.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent-hover"
            aria-label="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-card-border bg-background/95 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-muted-foreground">Price</p>
            <p className="truncate text-lg font-bold text-foreground">
              {formatMarketplacePrice(product.price, product.currency)}
            </p>
          </div>
          <Button
            onClick={handleBuy}
            className="min-h-12 min-w-36 px-5 font-semibold"
          >
            <Download size={17} />
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}
