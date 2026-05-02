"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Droply is completely free to join. Choose the role that fits you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Buyer */}
          <div className="glass rounded-2xl p-8 hover:border-accent/20 transition-all duration-500 group animate-fade-in-up delay-100">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Buyer
            </div>
            <div className="text-5xl font-bold mb-1 text-foreground">Free</div>
            <div className="text-sm text-muted-foreground mb-6">
              Browse & purchase products securely
            </div>
            <div className="space-y-4 mb-10">
              {[
                "Discover published products",
                "Search & filter by tags",
                "One-click purchasing",
                "Secure file downloads",
                "Full order history",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-success flex-shrink-0"><Check size={16} /></span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/sign-up"
              id="buyer-sign-up"
              className="block w-full text-center py-3.5 rounded-xl glass text-foreground font-medium hover:bg-surface-hover transition-all"
            >
              Start Buying
            </Link>
          </div>

          {/* Creator */}
          <div className="relative glass rounded-2xl p-8 border-accent/20 hover:border-accent/40 transition-all duration-500 group animate-pulse-glow animate-fade-in-up delay-200">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-accent to-purple-400 text-xs font-semibold text-white">
              Popular
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Creator
            </div>
            <div className="text-5xl font-bold mb-1 text-foreground">
              0%
              <span className="text-lg text-muted-foreground font-normal ml-2">transaction fee</span>
            </div>
            <div className="text-sm text-muted-foreground mb-6">
              Full access to selling tools for free
            </div>
            <div className="space-y-4 mb-10">
              {[
                "Everything in Buyer",
                "Create & publish unlimited products",
                "Draft & Published workflow",
                "Multi-currency pricing (USD, EUR, GBP, INR)",
                "Full analytics and sales tracking",
                "Custom tags for discovery",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-accent flex-shrink-0"><Check size={16} /></span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/sign-up"
              id="creator-sign-up"
              className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/20"
            >
              Start Selling
            </Link>
          </div>
        </div>

        <div className="mt-20 glass rounded-3xl p-10 md:p-12 text-center animate-fade-in-up delay-300">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Have a large audience?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you are processing more than $100k/month in digital product volume, we offer dedicated high-volume enterprise support.
          </p>
          <a href="mailto:support@droply.com" className="font-semibold text-accent hover:text-purple-400 transition-colors uppercase tracking-widest text-sm">
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}
