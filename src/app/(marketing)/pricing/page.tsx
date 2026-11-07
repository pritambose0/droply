import Link from "next/link";
import { Check, Info } from "lucide-react";

const BUYER_FEATURES = [
  "Create a free buyer account",
  "Browse and search published products",
  "Filter by category and price",
  "View detailed product pages",
  "Download access for paid orders",
];

const CREATOR_FEATURES = [
  "Create a free creator account",
  "Create and edit product listings",
  "Save drafts or publish when ready",
  "Upload thumbnails and delivery files",
  "Tag products for discovery",
  "Manage your catalog from a dashboard",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 max-w-2xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            Pricing
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Free to join
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Creating a Droply account is free for buyers and creators. No
            transaction fees are charged today because checkout is not connected
            yet.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="surface-card flex flex-col p-8">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Buyer
            </div>
            <div className="mb-1 text-4xl font-bold text-foreground">Free</div>
            <p className="mb-6 text-sm text-muted-foreground">
              Explore the marketplace and manage purchases.
            </p>
            <ul className="mb-8 space-y-3">
              {BUYER_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check size={15} className="mt-0.5 shrink-0 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              id="buyer-sign-up"
              href="/sign-up"
              className="mt-auto block w-full rounded-xl border border-card-border bg-surface py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              Start buying
            </Link>
          </div>

          <div className="surface-card flex flex-col border-accent/25 p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Creator
              </span>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Open
              </span>
            </div>
            <div className="mb-1 text-4xl font-bold text-foreground">Free</div>
            <p className="mb-6 text-sm text-muted-foreground">
              List your digital products and manage your catalog.
            </p>
            <ul className="mb-8 space-y-3">
              {CREATOR_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              id="creator-sign-up"
              href="/sign-up?role=creator"
              className="mt-auto block w-full rounded-xl bg-accent py-3 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Start selling
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-card-border bg-surface/50 p-5">
          <Info size={18} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Transaction fees and payout terms are not published yet. They will
            be listed here once checkout and payments are implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
