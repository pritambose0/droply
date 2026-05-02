"use client";

import Link from "next/link";
import { 
  CheckCircle2, 
  Download, 
  Package, 
  FileText, 
  ArrowRight, 
  LifeBuoy, 
  ShieldCheck,
  CreditCard,
  Calendar,
  Hash
} from "lucide-react";

export default function CheckoutSuccessPage() {
  // Mock order data
  const order = {
    id: "ord_005_9x2b",
    productName: "React Component Library Pro",
    amount: 49.00,
    paymentMethod: "Visa ending in 4242",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    creator: "UI Foundry"
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-8 animate-fade-in-up">
        
        {/* ── Status Hero ── */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center shadow-lg shadow-success/30 animate-scale-in">
              <CheckCircle2 size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Purchase Successful!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your order. Your digital product is ready to download.
          </p>
        </div>

        {/* ── Order Summary Card ── */}
        <div className="glass rounded-3xl p-6 md:p-8 border border-card-border/60 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-success/5 blur-[100px] pointer-events-none rounded-full" />
          
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
            <Package size={16} /> Order Summary
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-surface/50 border border-card-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-xl">
                  🚀
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">{order.productName}</p>
                  <p className="text-xs text-muted-foreground">By {order.creator}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-bold text-success text-lg">${order.amount.toFixed(2)}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-success/10 text-success">Paid</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-surface/30 border border-card-border flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Hash size={14} /> Order ID</span>
                <span className="font-medium text-foreground text-sm truncate font-mono">{order.id}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface/30 border border-card-border flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Calendar size={14} /> Date</span>
                <span className="font-medium text-foreground text-sm">{order.date}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface/30 border border-card-border flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5"><CreditCard size={14} /> Payment</span>
                <span className="font-medium text-foreground text-sm truncate">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Primary Action Button Group ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
            <Download size={22} /> Download Now
          </button>
          <div className="flex gap-4 flex-1">
            <Link href="/buyer/library" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass text-foreground font-semibold text-sm hover:bg-surface-hover transition-all border border-card-border shadow-sm">
              <Package size={18} /> Library
            </Link>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass text-foreground font-semibold text-sm hover:bg-surface-hover transition-all border border-card-border shadow-sm">
              <FileText size={18} /> Invoice
            </button>
          </div>
        </div>

        {/* ── Trust Info Card & Secondary Actions ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl glass border border-card-border flex items-start gap-3">
             <ShieldCheck className="text-success shrink-0" size={24} />
             <div>
               <p className="text-sm font-bold text-foreground">Secure & Stored</p>
               <p className="text-xs text-muted-foreground mt-1">Your payment is secure. This product is permanently stored in your Dropsy library.</p>
             </div>
          </div>
          <div className="p-5 rounded-2xl glass border border-card-border flex items-start gap-3">
             <LifeBuoy className="text-accent shrink-0" size={24} />
             <div>
               <p className="text-sm font-bold text-foreground">Need Support?</p>
               <p className="text-xs text-muted-foreground mt-1">Have an issue with your download? Contact the creator or our support team.</p>
               <Link href="/contact" className="text-xs font-bold text-accent hover:text-accent-hover mt-2 inline-block">Contact Support &rarr;</Link>
             </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-card-border/50">
          <Link href="/discover" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group">
            Continue Shopping <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
