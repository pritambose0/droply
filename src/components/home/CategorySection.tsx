import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Camera,
  Code2,
  LayoutTemplate,
  Music,
  Palette,
  PenTool,
  Tag,
  Video,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import { getApiErrorMessage } from "@/hooks/useProducts";
import type { MarketplaceCategory } from "@/types/marketplace";

type CategoryVisual = {
  icon: LucideIcon;
  tone: string;
};

const CATEGORY_RULES: { keywords: string[]; visual: CategoryVisual }[] = [
  {
    keywords: ["design", "ui", "ux", "figma", "template", "layout", "icon"],
    visual: {
      icon: LayoutTemplate,
      tone: "bg-violet-500/10 text-violet-300",
    },
  },
  {
    keywords: ["code", "dev", "developer", "programming", "react", "next", "api", "sdk"],
    visual: { icon: Code2, tone: "bg-sky-500/10 text-sky-300" },
  },
  {
    keywords: ["ebook", "book", "guide", "course", "education", "learn"],
    visual: { icon: BookOpen, tone: "bg-emerald-500/10 text-emerald-300" },
  },
  {
    keywords: ["photo", "image", "camera", "stock"],
    visual: { icon: Camera, tone: "bg-amber-500/10 text-amber-300" },
  },
  {
    keywords: ["video", "motion", "animation", "film"],
    visual: { icon: Video, tone: "bg-rose-500/10 text-rose-300" },
  },
  {
    keywords: ["audio", "music", "sound", "podcast"],
    visual: { icon: Music, tone: "bg-cyan-500/10 text-cyan-300" },
  },
  {
    keywords: ["art", "illustration", "draw", "paint", "creative"],
    visual: { icon: Palette, tone: "bg-fuchsia-500/10 text-fuchsia-300" },
  },
  {
    keywords: ["writing", "copy", "content", "blog", "marketing", "seo"],
    visual: { icon: PenTool, tone: "bg-orange-500/10 text-orange-300" },
  },
  {
    keywords: ["business", "finance", "productivity", "notion", "template"],
    visual: { icon: Briefcase, tone: "bg-indigo-500/10 text-indigo-300" },
  },
];

const DEFAULT_VISUAL: CategoryVisual = {
  icon: Tag,
  tone: "bg-accent/10 text-accent",
};

function getCategoryVisual(tag: string): CategoryVisual {
  const normalized = tag.toLowerCase();
  const match = CATEGORY_RULES.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );

  return match?.visual ?? DEFAULT_VISUAL;
}

function CategorySkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-card-border bg-card-bg p-5">
      <div className="h-11 w-11 rounded-xl bg-surface" />
      <div className="mt-5 h-4 w-2/3 rounded bg-surface" />
      <div className="mt-2 h-3 w-1/3 rounded bg-surface" />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-accent">
          Browse categories
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Find your next favorite thing
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Explore real categories built from products sellers have published on
          the marketplace.
        </p>
      </div>

      <Link
        href="/discover"
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        Browse all products
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

export function CategorySection({
  categories,
  isLoading,
  isError,
  error,
  onRetry,
}: {
  categories: MarketplaceCategory[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
}) {
  const visibleCategories = categories.slice(0, 8);

  return (
    <section
      id="categories"
      className="scroll-mt-24 border-t border-card-border/40 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader />

        {isError ? (
          <div className="rounded-2xl border border-danger/20 bg-danger/5 p-8 text-center">
            <h3 className="text-base font-bold text-foreground">
              Couldn&apos;t load categories
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {getApiErrorMessage(
                error,
                "Categories are unavailable right now. Please try again.",
              )}
            </p>
            <Button
              variant="secondary"
              onClick={onRetry}
              className="mt-5 rounded-full px-5 py-2.5"
            >
              Try again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))}
          </div>
        ) : visibleCategories.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visibleCategories.map((category) => {
              const { icon: Icon, tone } = getCategoryVisual(category.tag);

              return (
                <Link
                  key={category.tag}
                  href={`/discover?tag=${encodeURIComponent(category.tag)}`}
                  className="group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-5 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>

                  <h3 className="mt-5 line-clamp-1 text-base font-semibold capitalize text-foreground">
                    {category.tag.replace(/-/g, " ")}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {category.count.toLocaleString()}{" "}
                    {category.count === 1 ? "product" : "products"}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-card-border bg-card-bg p-10 text-center">
            <h3 className="text-base font-bold text-foreground">
              No categories yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Categories will appear here as sellers publish their first
              products.
            </p>
            <Link
              href="/discover"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              Browse the marketplace
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
