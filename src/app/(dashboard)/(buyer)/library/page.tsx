"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

/* ──────────── Icons ──────────── */
function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ──────────── Mock Data ──────────── */
const mockPurchases = [
  {
    id: "ord_001",
    productName: "React Component Library",
    creatorName: "UI Foundry",
    price: 29,
    currency: "USD",
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "ord_002",
    productName: "Tailwind Email Templates",
    creatorName: "DesignFlow",
    price: 49,
    currency: "USD",
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "ord_003",
    productName: "Icon Pack Pro 2024",
    creatorName: "VectorArts",
    price: 19,
    currency: "USD",
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 1 month ago
    status: "completed",
    downloadUrl: "#",
  },
];

/* ──────────── Purchase Card ──────────── */
function PurchaseCard({ purchase }: { purchase: (typeof mockPurchases)[0] }) {
  const gradients = [
    "from-violet-600/20 to-indigo-600/20",
    "from-rose-600/20 to-pink-600/20",
    "from-emerald-600/20 to-teal-600/20",
  ];
  const gradient = gradients[parseInt(purchase.id.replace(/\D/g, '')) % gradients.length];

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-accent/20 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {/* Thumbnail */}
        <div className={`w-full sm:w-32 h-32 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 relative overflow-hidden`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          </svg>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform" title="Download">
               <DownloadIcon />
             </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
               <h3 className="font-semibold text-lg text-foreground truncate">{purchase.productName}</h3>
               <span className="text-xs font-medium px-2 py-1 rounded bg-success/10 text-success flex-shrink-0">
                 Paid
               </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">By {purchase.creatorName}</p>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
             <div>
               <div className="text-xs text-muted mb-1">Order #{purchase.id}</div>
               <div className="text-xs font-medium text-muted-foreground">
                 Purchased {formatDistanceToNow(new Date(purchase.purchasedAt), { addSuffix: true })}
               </div>
             </div>
             
             <button className="sm:hidden block p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors">
               <DownloadIcon />
             </button>
             <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 hover:bg-accent text-accent hover:text-white transition-all text-sm font-medium">
               <DownloadIcon />
               Download
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Buyer Dashboard ──────────── */
export default function BuyerDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPurchases = mockPurchases.filter(p => 
    p.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Library</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Access all your purchased digital products in one place.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content Area - Library List */}
        <div className="md:col-span-2 space-y-6">
           {/* Search Toolbar */}
           <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search your purchases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all glass hover:border-accent/30"
              />
           </div>

           {/* Purchase List */}
           <div className="space-y-4">
             {filteredPurchases.length > 0 ? (
               filteredPurchases.map(purchase => (
                 <PurchaseCard key={purchase.id} purchase={purchase} />
               ))
             ) : (
               <div className="text-center py-12 glass rounded-2xl">
                 <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                    <SearchIcon />
                 </div>
                 <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                 <p className="text-sm text-muted-foreground">Try adjusting your search query.</p>
               </div>
             )}
           </div>
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Account Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Purchases</span>
                <span className="text-lg font-bold text-foreground">{mockPurchases.length}</span>
              </div>
              <div className="h-px bg-card-border w-full" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="text-lg font-bold text-success">
                  ${mockPurchases.reduce((acc, curr) => acc + curr.price, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 bg-gradient-to-br from-accent/5 to-purple-500/5 border-accent/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <StarIcon />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Want to sell your own work?</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Upgrade your account to a Creator profile and start selling digital products today. It&apos;s free to start!
            </p>
            <button className="w-full py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
              Become a Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
