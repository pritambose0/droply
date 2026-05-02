export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-surface border border-card-border/50 ${className}`} />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-24 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-32 rounded-xl" />
      <Skeleton className="h-4 w-40 rounded-lg" />
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 rounded-xl mb-2" />
          <Skeleton className="h-4 w-64 rounded-lg hidden sm:block" />
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-6">
          <Skeleton className="h-6 w-32 rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <Skeleton className="h-6 w-32 rounded-xl" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-3 w-1/2 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-card-border flex items-center justify-between">
        <Skeleton className="h-10 w-64 rounded-xl max-w-full" />
        <Skeleton className="h-10 w-32 rounded-xl shrink-0 hidden sm:block" />
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 pb-4 border-b border-card-border/50 last:border-0 last:pb-0">
            <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48 rounded-lg max-w-full" />
              <Skeleton className="h-3 w-32 rounded-lg max-w-full" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg hidden sm:block shrink-0" />
            <Skeleton className="h-8 w-20 rounded-lg hidden md:block shrink-0" />
            <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-32 rounded-xl mb-2" />
          <Skeleton className="h-4 w-48 rounded-lg max-w-full" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl shrink-0" />
      </div>
      
      {/* Table */}
      <TableSkeleton />
    </div>
  );
}

export function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-32 rounded-xl mb-2" />
        <Skeleton className="h-4 w-48 rounded-lg max-w-full" />
      </div>

      {/* Metrics */}
      <div className="grid sm:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      
      {/* Table */}
      <TableSkeleton />
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-40 rounded-xl mb-2" />
        <Skeleton className="h-4 w-64 rounded-lg max-w-full" />
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2 hidden lg:block">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>
        {/* Mobile Tabs */}
        <div className="flex lg:hidden overflow-hidden gap-2">
           <Skeleton className="h-10 w-24 rounded-xl shrink-0" />
           <Skeleton className="h-10 w-24 rounded-xl shrink-0" />
           <Skeleton className="h-10 w-24 rounded-xl shrink-0" />
        </div>

        {/* Form Fields */}
        <div className="glass rounded-2xl p-6 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-px w-full" />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-full shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-card-border/50 mt-8 pt-6">
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LibrarySkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-48 rounded-xl mb-2" />
        <Skeleton className="h-4 w-64 rounded-lg max-w-full" />
      </div>
      
      {/* Search / Filters */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-64 rounded-xl max-w-full" />
        <Skeleton className="h-10 w-32 rounded-xl shrink-0" />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="glass rounded-2xl p-5 space-y-4">
            <Skeleton className="w-full h-40 rounded-xl" />
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
            <div className="pt-2 border-t border-card-border flex justify-between">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
