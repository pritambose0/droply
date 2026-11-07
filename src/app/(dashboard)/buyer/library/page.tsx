"use client";

import Link from "next/link";
import { Library, Download, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import ButtonLink from "@/components/ButtonLink";

export default function BuyerLibraryPage() {
  const purchases: unknown[] = [];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      <PageHeader
        eyebrow="Buyer"
        title="My Library"
        description="Download and manage the digital products you own."
      />

      {purchases.length === 0 ? (
        <EmptyState
          icon={Library}
          title="No purchases yet"
          description="When you buy a product, it will appear here with a download link once payment is confirmed."
          action={
            <ButtonLink href="/discover" className="px-5 py-2.5">
              Explore products
            </ButtonLink>
          }
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface-card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Download size={18} />
          </div>
          <h2 className="text-sm font-semibold text-foreground">
            Download access
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Downloads are authorized by the order service and only unlock after
            a payment is marked as paid.
          </p>
        </div>
        <div className="surface-card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <ShieldCheck size={18} />
          </div>
          <h2 className="text-sm font-semibold text-foreground">
            Your account
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Purchases are tied to your Droply account. Sign in with the same
            email to access them again.
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Looking for something new?{" "}
        <Link
          href="/discover"
          className="font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Browse the marketplace
        </Link>
      </p>
    </div>
  );
}
