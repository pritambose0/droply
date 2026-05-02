"use client";

import Link from "next/link";
import { Clock, ArrowRight, Mail } from "lucide-react";

export default function CheckoutPendingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl w-full mx-auto space-y-8 animate-fade-in-up">
        
        {/* ── Status Hero ── */}
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-warning/30 rounded-full border-t-warning animate-spin" />
            <div className="w-16 h-16 rounded-full bg-warning flex items-center justify-center shadow-lg shadow-warning/30 z-10">
              <Clock size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Payment Pending</h1>
          <p className="text-lg text-muted-foreground">
            We are waiting for your payment provider to confirm the transaction. This usually takes a few moments.
          </p>
        </div>

        {/* ── Info Card ── */}
        <div className="glass rounded-2xl p-6 border border-card-border flex flex-col items-center gap-4 text-center">
           <Mail className="text-muted-foreground" size={32} />
           <div>
             <p className="text-sm font-bold text-foreground">We'll email your receipt</p>
             <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
               You can safely leave this page. Once the payment clears, we will automatically send you an email receipt and add the product to your library.
             </p>
           </div>
        </div>

        {/* ── Actions ── */}
        <div className="pt-6 border-t border-card-border/50">
          <Link href="/buyer/orders" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
            View My Orders <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
