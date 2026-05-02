"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard
} from "lucide-react";

/* ──────────── Components ──────────── */

function StatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider"><CheckCircle2 size={12} /> Paid</span>;
  }
  if (status === "refunded") {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-danger/10 text-danger text-[10px] font-bold uppercase tracking-wider"><XCircle size={12} /> Refunded</span>;
  }
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning/10 text-warning text-[10px] font-bold uppercase tracking-wider"><Clock size={12} /> Pending</span>;
}

export default function BuyerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const orders: any[] = []; // Real wiring would go here

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Order History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View your past transactions, download invoices, and manage orders.
          </p>
        </div>
        <div className="flex gap-3">
        </div>
      </div>

      <div className="glass rounded-2xl border border-card-border/60 overflow-hidden shadow-sm flex flex-col">

        {/* Toolbar */}
        <div className="p-4 border-b border-card-border/60 flex flex-col sm:flex-row items-center gap-4 justify-between bg-surface/30">
          <div className="relative w-full max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by Order ID or Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-card-border text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-card-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-surface/10">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Product / Creator</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/40">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium font-mono text-foreground">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-foreground mb-0.5">{order.productName}</p>
                      <p className="text-xs text-muted-foreground">By {order.creatorName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-foreground">${order.amount.toFixed(2)}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted-foreground">
                        <CreditCard size={10} /> {order.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {order.status === "completed" && (
                          <button className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-colors" title="Re-download files">
                            <Download size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground text-sm">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-card-border/40">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-bold text-foreground text-sm">{order.productName}</p>
                    <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    <p className="font-bold text-foreground mt-1">${order.amount.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    {order.status === "completed" && (
                      <button className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white">
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No orders found.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
