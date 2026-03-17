"use client";

import Link from "next/link";

/* ──────────── Icons ──────────── */
function TrendUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ShoppingCartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* ──────────── Stat Card ──────────── */
function StatCard({
  icon,
  label,
  value,
  change,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 hover:border-accent/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend === "up"
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          {trend === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/* ──────────── Recent Activity Item ──────────── */
function ActivityItem({
  title,
  description,
  time,
  status,
}: {
  title: string;
  description: string;
  time: string;
  status: "success" | "pending" | "info";
}) {
  const statusColors = {
    success: "bg-success",
    pending: "bg-warning",
    info: "bg-accent",
  };

  return (
    <div className="flex items-start gap-3 py-3 group">
      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${statusColors[status]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <span className="text-xs text-muted flex-shrink-0">{time}</span>
    </div>
  );
}

/* ──────────── Mini Bar Chart ──────────── */
function MiniChart() {
  const bars = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95];
  const maxBar = Math.max(...bars);

  return (
    <div className="flex items-end gap-1.5 h-24">
      {bars.map((value, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-accent to-purple-400 opacity-60 hover:opacity-100 transition-opacity"
          style={{ height: `${(value / maxBar) * 100}%`, animationDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}

/* ──────────── Top Product Row ──────────── */
function TopProduct({
  rank,
  name,
  sales,
  revenue,
}: {
  rank: number;
  name: string;
  sales: number;
  revenue: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3 group">
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
          rank === 1
            ? "bg-accent/20 text-accent"
            : rank === 2
            ? "bg-purple-500/20 text-purple-400"
            : "bg-surface text-muted-foreground"
        }`}
      >
        #{rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{sales} sales</p>
      </div>
      <span className="text-sm font-semibold text-foreground">{revenue}</span>
    </div>
  );
}

/* ──────────── Dashboard Page ──────────── */
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here&apos;s your overview.
          </p>
        </div>
        <Link
          href="/products"
          id="dashboard-new-product"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="3" x2="8" y2="13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
          New Product
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarIcon />}
          label="Total Revenue"
          value="$12,426"
          change="+12.5%"
          trend="up"
          color="bg-accent/10 text-accent"
        />
        <StatCard
          icon={<ShoppingCartIcon />}
          label="Total Orders"
          value="284"
          change="+8.2%"
          trend="up"
          color="bg-success/10 text-success"
        />
        <StatCard
          icon={<PackageIcon />}
          label="Products"
          value="18"
          change="+2"
          trend="up"
          color="bg-purple-500/10 text-purple-400"
        />
        <StatCard
          icon={<UsersIcon />}
          label="Customers"
          value="1,429"
          change="-2.1%"
          trend="down"
          color="bg-warning/10 text-warning"
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-accent to-purple-400" />
                Revenue
              </span>
            </div>
          </div>
          <MiniChart />
          <div className="flex justify-between mt-3 text-xs text-muted">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="divide-y divide-card-border">
            <ActivityItem
              title="New order received"
              description="React Component Kit — $29.00"
              time="2m ago"
              status="success"
            />
            <ActivityItem
              title="Product published"
              description="UI Design Templates Pack"
              time="1h ago"
              status="info"
            />
            <ActivityItem
              title="Payment pending"
              description="NextJS Starter Kit — $49.00"
              time="3h ago"
              status="pending"
            />
            <ActivityItem
              title="New order received"
              description="Icon Pack Pro — $19.00"
              time="5h ago"
              status="success"
            />
            <ActivityItem
              title="Product updated"
              description="Tailwind UI Components"
              time="1d ago"
              status="info"
            />
          </div>
        </div>
      </div>

      {/* Top Products & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Top Products</h2>
            <Link
              href="/products"
              className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
            >
              View All <ArrowRightIcon />
            </Link>
          </div>
          <div className="divide-y divide-card-border">
            <TopProduct rank={1} name="React Component Library" sales={142} revenue="$4,118" />
            <TopProduct rank={2} name="NextJS SaaS Starter" sales={98} revenue="$4,802" />
            <TopProduct rank={3} name="UI Design System v2" sales={87} revenue="$1,914" />
            <TopProduct rank={4} name="Icon Pack Pro 2024" sales={64} revenue="$1,216" />
            <TopProduct rank={5} name="Tailwind Templates" sales={51} revenue="$1,479" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/products"
              id="quick-add-product"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface hover:bg-surface-hover border border-card-border hover:border-accent/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground">Add Product</span>
            </Link>

            <Link
              href="/orders"
              id="quick-view-orders"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface hover:bg-surface-hover border border-card-border hover:border-accent/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                <ShoppingCartIcon />
              </div>
              <span className="text-sm font-medium text-foreground">View Orders</span>
            </Link>

            <Link
              href="/products"
              id="quick-manage-products"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface hover:bg-surface-hover border border-card-border hover:border-accent/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <PackageIcon />
              </div>
              <span className="text-sm font-medium text-foreground">Manage Products</span>
            </Link>

            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface hover:bg-surface-hover border border-card-border hover:border-accent/20 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground">Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
