"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Secure file delivery happens automatically after purchase. No manual fulfilment needed.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Every transaction is encrypted and protected. Buyers get lifetime access to their purchases.",
  },
  {
    icon: Globe,
    title: "Global Marketplace",
    desc: "Reach buyers worldwide. Multi-currency support with automated payouts to your bank.",
  },
];

const TESTIMONIALS: any[] = [];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-8 animate-fade-in border border-card-border">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            The digital marketplace for modern creators
          </div>

          <h1 className="text-5xl md:text-[72px] font-bold tracking-tight leading-[1.08] mb-6 animate-fade-in-up">
            Sell your work.
            <br />
            <span className="gradient-text">Keep what you earn.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-100">
            Droply is the cleanest way for creators to sell digital products —
            templates, code, ebooks, and more. Start free, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Link
              href="/sign-up"
              id="hero-get-started"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all shadow-xl shadow-accent/20"
            >
              Start Selling Free
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/discover"
              id="hero-browse"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full glass text-foreground font-medium text-sm hover:bg-surface-hover transition-all"
            >
              Browse Products
            </Link>
          </div>

          {/* Stats strip removed for MVP clean-up */}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="py-24 px-6 border-t border-card-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">
              Why Droply
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Everything you need to sell digital products
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`glass rounded-2xl p-8 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition-transform shadow-inner shadow-accent/5">
                  <f.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 border-t border-card-border/40">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">
            Get started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-14">
            Up and running in minutes
          </h2>

          <div className="space-y-4">
            {[
              { step: "01", title: "Create your account", desc: "Sign up as a Creator for free. No credit card required." },
              { step: "02", title: "Upload your product", desc: "Add a title, price, thumbnail, and delivery file. Publish instantly." },
              { step: "03", title: "Get paid", desc: "Buyers purchase securely. Files deliver automatically. You earn." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 glass rounded-2xl p-6 text-left hover:border-accent/20 transition-all group">
                <span className="text-2xl font-black gradient-text opacity-40 shrink-0 group-hover:opacity-70 transition-opacity w-10">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof section removed for MVP clean-up */}

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6 border-t border-card-border/40">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to launch your
                <br />
                <span className="gradient-text">digital store?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm leading-relaxed">
                Join thousands of creators selling on Droply. Setup takes less than a minute.
              </p>
              <Link
                href="/sign-up"
                id="cta-get-started"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all shadow-xl shadow-accent/20"
              >
                Get Started — It&apos;s Free
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
