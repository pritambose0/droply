"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Hash,
  LifeBuoy,
  Loader2,
  Package,
  ShieldCheck,
} from "lucide-react";
import { OrderAPI, ProductAPI } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import { getApiErrorMessage } from "@/hooks/useProducts";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import type { ProductResponseDto } from "@/schemas/productSchema";

type OrderStatus = "processing" | "completed" | "cancelled" | "failed";
type PaymentStatus = "pending" | "paid" | "failed";

interface CheckoutOrder {
  id?: string;
  _id?: string;
  productId: string;
  price: number;
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

function formatMoney(amount: number, currency: string) {
  return `${currencySymbols[currency] ?? currency}${amount.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}

function getOrderId(order: CheckoutOrder, fallback: string) {
  return order.id ?? order._id ?? fallback;
}

function StatusBadge({ order }: { order: CheckoutOrder }) {
  if (order.paymentStatus === "paid" && order.orderStatus === "completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
        <CheckCircle2 size={10} /> Paid
      </span>
    );
  }

  if (order.paymentStatus === "failed" || order.orderStatus === "failed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-danger">
        <AlertCircle size={10} /> Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
      <Clock size={10} /> Processing
    </span>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-sm">Loading your order...</p>
      </div>
    </div>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen px-6 pt-32 pb-24 flex flex-col items-center justify-center">
      <div className="surface-card w-full max-w-xl space-y-6 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
          <Package size={28} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {message}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/discover" className="px-6 py-3 font-semibold">
            Browse Marketplace
          </ButtonLink>
          <ButtonLink
            href="/buyer/library"
            variant="secondary"
            className="px-6 py-3 font-semibold"
          >
            View Library
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const orderQuery = useQuery({
    queryKey: ["orders", "detail", orderId],
    enabled: Boolean(orderId),
    retry: false,
    queryFn: async () => {
      const response = await OrderAPI.getById(orderId);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load order.");
      }

      return response.data as CheckoutOrder;
    },
  });

  const order = orderQuery.data;
  const productId = order?.productId ?? "";

  const productQuery = useQuery({
    queryKey: queryKeys.products.detail(productId),
    enabled: Boolean(productId),
    retry: false,
    queryFn: async () => {
      const response = await ProductAPI.getById(productId);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load product.");
      }

      return response.data as ProductResponseDto;
    },
  });

  const product = productQuery.data;
  const canDownload =
    order?.paymentStatus === "paid" && order?.orderStatus === "completed";

  const handleDownload = async () => {
    if (!order) return;

    setIsDownloading(true);
    setDownloadError("");

    try {
      const response = await ProductAPI.getDownloadUrl(
        order.productId,
        getOrderId(order, orderId),
      );

      if (!response.success || typeof response.data !== "string") {
        throw new Error(response.message || "Failed to fetch the download.");
      }

      const link = document.createElement("a");
      link.href = response.data;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    } catch (error) {
      setDownloadError(
        getApiErrorMessage(
          error,
          "Could not start the download. Please try again.",
        ),
      );
    } finally {
      setIsDownloading(false);
    }
  };

  if (!orderId) {
    return (
      <EmptyState
        title="No order to display"
        message="Checkout is not connected yet, so there is no completed order to show. Once payments are enabled, this page will display the order referenced by your receipt."
      />
    );
  }

  if (orderQuery.isLoading) {
    return <CheckoutSkeleton />;
  }

  if (orderQuery.isError || !order) {
    return (
      <div className="min-h-screen px-6 pt-32 pb-24 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl space-y-6 rounded-2xl border border-danger/20 bg-danger/5 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <AlertCircle size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Could not load this order
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {getApiErrorMessage(
                orderQuery.error,
                "The order may not exist or you may not have access to it.",
              )}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => orderQuery.refetch()}>
              <Download size={16} /> Try again
            </Button>
            <ButtonLink
              href="/discover"
              variant="secondary"
              className="px-6 py-3 font-semibold"
            >
              Browse Marketplace
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  const isPaid = order.paymentStatus === "paid";
  const productName = product?.title ?? "Purchased product";
  const orderReference = getOrderId(order, orderId);

  return (
    <div className="min-h-screen px-6 pt-32 pb-24 flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        {/* Status Hero */}
        <div className="space-y-4 text-center">
          <div
            className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
              isPaid ? "bg-success/10" : "bg-warning/10"
            }`}
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${
                isPaid ? "bg-success" : "bg-warning"
              }`}
            >
              {isPaid ? (
                <CheckCircle2 size={32} className="text-white" />
              ) : (
                <Clock size={32} className="text-white" />
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {isPaid ? "Purchase Successful!" : "Order Received"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isPaid
              ? "Thank you for your order. Your digital product is ready to download."
              : "We are waiting for the payment to be confirmed before your download unlocks."}
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="surface-card relative overflow-hidden p-6 md:p-8">
          <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Package size={16} /> Order Summary
          </h3>

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col justify-between gap-2 rounded-xl border border-card-border bg-surface/50 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Package size={22} className="text-accent" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {productQuery.isLoading ? (
                      <span className="inline-block h-5 w-40 animate-pulse rounded bg-surface align-middle" />
                    ) : (
                      productName
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Order {orderReference}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-foreground">
                  {formatMoney(order.price, order.currency)}
                </p>
                <StatusBadge order={order} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1 rounded-xl border border-card-border bg-surface/30 p-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Hash size={14} /> Order ID
                </span>
                <span className="truncate font-mono text-sm font-medium text-foreground">
                  {orderReference}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-card-border bg-surface/30 p-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={14} /> Date
                </span>
                <span className="text-sm font-medium text-foreground">
                  {format(new Date(order.createdAt), "PPP")}
                </span>
              </div>
            </div>

            {productQuery.isError && (
              <p className="text-xs text-muted-foreground">
                Product details could not be loaded, but your order is still
                valid.
              </p>
            )}

            {downloadError && (
              <p className="flex items-center gap-2 text-xs text-danger">
                <AlertCircle size={14} /> {downloadError}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {canDownload ? (
            <Button
              onClick={handleDownload}
              isLoading={isDownloading}
              loadingText="Preparing..."
              className="flex-1 py-3.5 text-base font-semibold"
            >
              <Download size={22} /> Download Now
            </Button>
          ) : (
            <p className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-warning/20 bg-warning/10 px-4 py-3 text-center text-sm font-medium text-warning">
              <Clock size={16} /> Download unlocks once payment is confirmed.
            </p>
          )}
          <ButtonLink
            href="/buyer/library"
            variant="secondary"
            className="flex-1 px-6 py-4 font-semibold"
          >
            <Package size={18} /> Library
          </ButtonLink>
        </div>

        {/* Trust Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="surface-card flex items-start gap-3 p-5">
            <ShieldCheck className="shrink-0 text-success" size={24} />
            <div>
              <p className="text-sm font-semibold text-foreground">Stored in your account</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your order is securely stored in your Droply account.
              </p>
            </div>
          </div>
          <div className="surface-card flex items-start gap-3 p-5">
            <LifeBuoy className="shrink-0 text-accent" size={24} />
            <div>
              <p className="text-sm font-semibold text-foreground">Need support?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Have an issue with your order? Contact support with your order
                ID.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-block text-xs font-semibold text-accent hover:text-accent-hover"
              >
                Contact support &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border/50 pt-8 text-center">
          <Link
            href="/discover"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Continue Shopping{" "}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
