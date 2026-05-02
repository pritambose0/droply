function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-xl bg-surface border border-card-border/50 animate-pulse ${className}`}
    />
  );
}

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-48 hidden sm:block" />
        </div>

        {/* Hero skeleton */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-6">
            {/* Thumbnail */}
            <Skeleton className="w-full h-72 md:h-80 rounded-2xl" />

            {/* Title + meta */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-3/4 rounded-xl" />
              <Skeleton className="h-6 w-full rounded-xl" />
              <Skeleton className="h-6 w-2/3 rounded-xl" />

              <div className="flex items-center gap-3 pt-1">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-5 w-24 rounded-lg" />
              </div>
              <div className="flex gap-4 pt-1">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="glass rounded-2xl p-6 space-y-5 hidden lg:block">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-4 w-40 rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-3 pt-2 border-t border-card-border">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                  <Skeleton className="h-3 w-48 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-6">
            <Skeleton className="h-10 w-72 rounded-xl" />
            <div className="glass rounded-2xl p-8 space-y-4">
              <Skeleton className="h-7 w-48 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>
          </div>

          {/* Creator card skeleton */}
          <div className="glass rounded-2xl p-6 space-y-5">
            <Skeleton className="h-3 w-16 rounded-md" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-7 w-40 rounded-xl mb-2" />
            <Skeleton className="h-4 w-56 rounded-lg" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-16 rounded-full" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-card-border">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
