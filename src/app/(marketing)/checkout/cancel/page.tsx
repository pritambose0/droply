"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, Search, ShieldAlert } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl w-full mx-auto space-y-8 animate-fade-in-up">
        
        {/* ── Status Hero ── */}
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-6">
            <div className="w-16 h-16 rounded-full bg-danger flex items-center justify-center shadow-lg shadow-danger/30">
              <XCircle size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Payment Cancelled</h1>
          <p className="text-lg text-muted-foreground">
            Your checkout process was safely cancelled. No charges were made to your account.
          </p>
        </div>

        {/* ── Trust Info ── */}
        <div className="glass rounded-2xl p-6 border border-card-border flex items-start gap-4 text-left">
           <ShieldAlert className="text-warning shrink-0" size={24} />
           <div>
             <p className="text-sm font-bold text-foreground">What happened?</p>
             <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
               You either manually exited the checkout flow, or your payment provider declined the transaction. The product is still available in the marketplace if you'd like to try again using a different payment method.
             </p>
           </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-card-border/50">
          <Link href="/discover" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl glass text-foreground font-semibold text-sm hover:bg-surface-hover transition-all border border-card-border shadow-sm flex-1">
            <Search size={18} /> Browse Marketplace
          </Link>
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-foreground text-background font-bold text-sm hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/20 flex-1">
            <ArrowLeft size={18} /> Retry Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
