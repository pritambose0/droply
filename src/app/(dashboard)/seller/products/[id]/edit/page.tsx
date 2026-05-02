"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Tag,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
  Download,
  ExternalLink
} from "lucide-react";

export default function EditProductPage({ params }: { params: { id: string } }) {
  // Mock prefilled state
  const [status, setStatus] = useState("published");

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in-up">

      {/* ── Mini Stats Banner (Edit Mode Only) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        <div className="glass rounded-xl p-4 border border-card-border/60">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Revenue</p>
          <p className="text-xl font-bold text-foreground">$1,420.00</p>
        </div>
        <div className="glass rounded-xl p-4 border border-card-border/60">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sales</p>
          <p className="text-xl font-bold text-foreground">142</p>
        </div>
        <div className="glass rounded-xl p-4 border border-card-border/60">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Views</p>
          <p className="text-xl font-bold text-foreground">4,591</p>
        </div>
        <div className="glass rounded-xl p-4 border border-card-border/60">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Conversion</p>
          <p className="text-xl font-bold text-accent">3.1%</p>
        </div>
      </div>

      {/* ── Header / Sticky Action Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between sticky top-0 z-20 glass p-4 rounded-2xl border-card-border/60 shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <Link href="/seller/products" className="p-2 rounded-xl hover:bg-surface text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              Editing: React Component Library
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">Published</span>
            </h1>
            <p className="text-xs text-muted-foreground">Last saved today at 10:42 AM</p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink size={16} /> View Product
          </button>
          {status === "published" && (
            <button onClick={() => setStatus("draft")} className="px-4 py-2 rounded-xl text-sm font-medium border border-card-border bg-surface hover:bg-surface-hover text-foreground transition-colors">
              Unpublish
            </button>
          )}
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-8 mt-8">

        {/* ── Section: Basic Info ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <FileText size={18} className="text-accent" /> Basic Info
            </h2>
            <p className="text-sm text-muted-foreground">The core details that define your product.</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Product Title <span className="text-red-500">*</span></label>
              <input type="text" defaultValue="React Component Library" className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Short Tagline</label>
              <input type="text" defaultValue="A comprehensive library of 50+ reusable React components built with TypeScript and Tailwind CSS." className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Description</label>
              <textarea rows={8} defaultValue="This UI kit contains everything you need to build SaaS applications fast..." className="w-full px-4 py-3 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y" />
            </div>
          </div>
        </section>

        {/* ── Section: Pricing ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Tag size={18} className="text-accent" /> Pricing
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Price (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input type="number" defaultValue="29.00" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Compare at Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input type="number" placeholder="Optional" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Media ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <ImageIcon size={18} className="text-accent" /> Media
            </h2>
          </div>

          <div className="space-y-4">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-linear-to-br from-violet-600/20 to-indigo-600/20 flex items-center justify-center border border-card-border group">
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:scale-105 transition-transform">Replace Image</button>
              </div>
              <span className="text-4xl">🚀</span>
            </div>
          </div>
        </section>

        {/* ── Section: Delivery Files ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Download size={18} className="text-accent" /> Delivery Files
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border border-card-border rounded-xl p-4 bg-surface flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">react-ui-kit-v2.zip</p>
                  <p className="text-xs text-muted-foreground">Uploaded Feb 15, 2026 • 12.4 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Download size={16} />
                </button>
                <button className="p-2 text-muted-foreground hover:text-danger transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <button className="w-full py-4 border-2 border-dashed border-card-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-surface/30 transition-colors flex items-center justify-center gap-2">
              <Plus size={16} /> Add Update / New File
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
