"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Now supporting multi-currency — USD, EUR, GBP, INR
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 opacity-0 animate-fade-in-up">
            Sell your digital
            <br />
            <span className="gradient-text">products effortlessly</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-200">
            The all-in-one marketplace for creators to list, sell, and deliver
            digital products — with secure downloads, instant payments, and a
            beautiful storefront.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up delay-300">
            <Link
              href="/sign-up"
              id="hero-get-started"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-purple-400 text-white font-medium text-base hover:opacity-90 transition-all shadow-xl shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02]"
            >
              Start Selling Free
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href="/about"
              id="hero-learn-more"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full glass text-foreground font-medium text-base hover:bg-surface-hover transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in-up delay-500">
            <Counter end={2400} suffix="+" label="Creators" />
            <Counter end={18000} suffix="+" label="Products" />
            <Counter end={99} suffix="%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-6 border-t border-card-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three steps to{" "}
              <span className="gradient-text">start earning</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Sign up as a Creator or Buyer. Verify your email with a secure 6-digit code.",
              },
              {
                step: "02",
                title: "List Products",
                desc: "Upload your digital products with thumbnails, tags, and pricing. Publish when ready.",
              },
              {
                step: "03",
                title: "Start Selling",
                desc: "Buyers discover and purchase your products. Secure file delivery happens automatically.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative glass rounded-2xl p-8 text-center group hover:-translate-y-1 transition-all duration-500 opacity-0 animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                <div className="text-5xl font-black gradient-text opacity-30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-card-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to launch your{" "}
                <span className="gradient-text">digital store?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Join thousands of creators selling digital products on Droply.
                Setup takes less than a minute.
              </p>
              <Link
                href="/sign-up"
                id="cta-get-started"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-all shadow-xl shadow-accent/25"
              >
                Get Started — It&apos;s Free
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
