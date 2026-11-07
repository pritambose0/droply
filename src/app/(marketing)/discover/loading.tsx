import { MarketplaceProductSkeleton } from "@/components/marketplace/MarketplaceProductSkeleton";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-xl bg-surface border border-card-border/50 animate-pulse ${className}`}
    />
  );
}

export default function DiscoverLoading() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="px-6 mb-12">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <Skeleton className="h-6 w-40 rounded-full mx-auto" />
          <Skeleton className="h-14 w-2/3 max-w-xl rounded-2xl mx-auto" />
          <Skeleton className="h-5 w-full max-w-2xl rounded-lg mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-28 rounded" />
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-full rounded-lg" />
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 rounded" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <MarketplaceProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
