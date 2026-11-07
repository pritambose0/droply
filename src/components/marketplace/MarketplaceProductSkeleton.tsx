export function MarketplaceProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-card-border bg-card-bg">
      <div className="h-48 border-b border-card-border bg-surface" />
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded-md bg-surface" />
          <div className="h-3 w-1/2 rounded-md bg-surface" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-md bg-surface" />
          <div className="h-3 w-2/3 rounded-md bg-surface" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-12 rounded bg-surface" />
          <div className="h-5 w-14 rounded bg-surface" />
          <div className="h-5 w-10 rounded bg-surface" />
        </div>
        <div className="flex items-center justify-between border-t border-card-border pt-3">
          <div className="h-6 w-16 rounded-md bg-surface" />
          <div className="h-9 w-20 rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
