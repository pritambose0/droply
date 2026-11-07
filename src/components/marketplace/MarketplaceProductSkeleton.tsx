export function MarketplaceProductSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-card-border/60 animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-white/10 rounded-md w-3/4" />
          <div className="h-3 bg-white/5 rounded-md w-1/2" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 bg-white/5 rounded-md w-full" />
          <div className="h-3 bg-white/5 rounded-md w-2/3" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-white/5 rounded w-12" />
          <div className="h-5 bg-white/5 rounded w-14" />
          <div className="h-5 bg-white/5 rounded w-10" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-card-border/40">
          <div className="h-6 bg-white/10 rounded-md w-16" />
          <div className="h-9 bg-white/10 rounded-xl w-20" />
        </div>
      </div>
    </div>
  );
}
