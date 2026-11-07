import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  Download,
  Package,
  ShieldCheck,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified accounts and roles",
    description:
      "Sign up as a buyer or a creator. Email verification uses one-time codes, and each role gets its own dashboard.",
    points: [
      "Email and password authentication",
      "One-time code email verification",
      "Separate buyer and creator access",
    ],
  },
  {
    icon: Package,
    title: "Creator product management",
    description:
      "Creators can build a catalog with a draft and published workflow, upload media, and manage listings from one dashboard.",
    points: [
      "Create and edit product listings",
      "Save as draft or publish when ready",
      "Thumbnail and delivery file uploads",
      "Tag products for marketplace discovery",
    ],
  },
  {
    icon: Compass,
    title: "Marketplace discovery",
    description:
      "Buyers can browse published products with search, category filters, price filters, sorting, and pagination.",
    points: [
      "Keyboard-friendly search",
      "Category and pricing filters",
      "Popular, newest, and price sorting",
      "Detailed product pages",
    ],
  },
  {
    icon: Download,
    title: "Order-aware download access",
    description:
      "Order and download APIs are in place. Downloads are authorized server-side and only unlock for paid orders.",
    points: [
      "Orders store product, price, and currency",
      "Payment and fulfillment statuses",
      "Download access restricted to paid orders",
    ],
  },
];

const NOT_LIVE = [
  "Checkout and payment processing",
  "Live buyer and creator dashboard metrics",
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            Features
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            What Droply does today
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Droply is a digital product marketplace for independent creators.
            Here is what is implemented right now, without the hype.
          </p>
          <div className="mt-8">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Create an account
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="surface-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <feature.icon size={20} />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <ul className="space-y-2.5">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-success"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-warning/20 bg-warning/5 p-6 md:p-8">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Not connected yet
          </h2>
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The following are not wired up. We list them clearly instead of
            showing placeholder numbers or non-functional buttons.
          </p>
          <ul className="space-y-2">
            {NOT_LIVE.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
