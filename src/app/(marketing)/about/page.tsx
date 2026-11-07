import {
  Coins,
  Compass,
  Download,
  Package,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="surface-card p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            About Droply
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            A marketplace for independent creators
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Droply gives creators a place to list digital products and gives
            buyers a focused way to discover them. No inflated numbers, no
            pretend checkout.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            What is built
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={ShieldCheck}
              title="Account authentication"
              description="Email and password sign-in with one-time code verification, password reset, and separate buyer and creator roles."
            />
            <FeatureCard
              icon={Package}
              title="Product management"
              description="Creators can create, edit, draft, publish, and delete listings with thumbnails, delivery files, and tags."
            />
            <FeatureCard
              icon={Compass}
              title="Marketplace discovery"
              description="Published products can be searched, filtered by category and price, sorted, and paginated."
            />
            <FeatureCard
              icon={ReceiptText}
              title="Order records"
              description="The orders API captures product, buyer, price, currency, payment status, and fulfillment status."
            />
            <FeatureCard
              icon={Download}
              title="Download authorization"
              description="File URLs stay out of public product responses. Download access is granted only for paid orders."
            />
            <FeatureCard
              icon={Coins}
              title="Multi-currency pricing"
              description="Creators can price products in USD, EUR, GBP, or INR. Checkout and currency conversion are not connected yet."
            />
          </div>
        </div>

        <div className="surface-card p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Our focus
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            We would rather ship a smaller set of features that actually work
            than decorate the product with fake analytics and buttons that go
            nowhere. As checkout, payments, and dashboard data come online, this
            page and the rest of Droply will reflect that honestly.
          </p>
        </div>
      </div>
    </div>
  );
}
