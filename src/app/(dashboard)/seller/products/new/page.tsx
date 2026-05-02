"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  Tag,
  FileText,
  Image as ImageIcon,
  Plus,
  ShieldAlert,
  Download,
} from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in-up">
      {/* ── Header / Sticky Action Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between sticky top-0 z-20 glass p-4 rounded-2xl border-card-border/60 shadow-sm mt-2 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/seller/products" className="p-2 rounded-xl hover:bg-surface text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Create New Product</h1>
            <p className="text-xs text-muted-foreground">Draft mode automatically saved.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            Preview
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium border border-card-border bg-surface hover:bg-surface-hover text-foreground transition-colors">
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
            <Save size={16} />
            Publish
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
              <input type="text" placeholder="e.g. Ultimate NextJS SaaS Starter" className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Description <span className="text-red-500">*</span></label>
              <textarea rows={8} placeholder="Describe what's included, features, and requirements..." className="w-full px-4 py-3 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y" />
            </div>
          </div>
        </section>

        {/* ── Section: Pricing ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Tag size={18} className="text-accent" /> Pricing
            </h2>
            <p className="text-sm text-muted-foreground">Set your price for this product.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Price (USD) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input type="number" placeholder="29.00" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
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
            <p className="text-sm text-muted-foreground">Upload a thumbnail for your product.</p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Product Thumbnail (1200x800px) <span className="text-red-500">*</span></label>
            <div className="border-2 border-dashed border-card-border rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <p className="text-sm font-medium text-foreground">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or WEBP (max. 5MB)</p>
            </div>
          </div>
        </section>

        {/* ── Section: Delivery Files ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Download size={18} className="text-accent" /> Delivery Files
            </h2>
            <p className="text-sm text-muted-foreground">The actual file buyers will download after purchase.</p>
          </div>

          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 flex items-start gap-4">
            <ShieldAlert className="text-accent shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-medium text-foreground">Secure Delivery</p>
              <p className="text-xs text-muted-foreground mt-1">Files are encrypted and securely delivered to buyers post-purchase via signed URLs.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Product File <span className="text-red-500">*</span></label>
            <button className="w-full py-6 border-2 border-dashed border-card-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-surface/30 transition-colors flex flex-col items-center justify-center gap-2">
              <Upload size={20} className="text-accent/50 mb-1" />
              Upload Product File (.zip, .pdf, .mp4)
            </button>
          </div>
        </section>

        {/* ── Section: Tags ── */}
        <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Plus size={18} className="text-accent" /> Tags
            </h2>
            <p className="text-sm text-muted-foreground">Add up to 10 tags to help buyers find your product.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags (comma separated) <span className="text-red-500">*</span></label>
            <input type="text" placeholder="e.g. react, nextjs, tailwind" className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-surface text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
          </div>
        </section>

      </div>
    </div>
  );
}
