import Link from "next/link";
import { ArrowLeft, Compass, Package, MessageSquare, CreditCard } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* ── Background Glow ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-12 animate-fade-in-up">

          {/* ── Visual Element ── */}
          <div className="relative w-40 h-40 mx-auto group">
            {/* Pulsing abstract background */}
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-2xl animate-pulse" />

            {/* Glass Card Icon */}
            <div className="relative w-full h-full glass rounded-3xl border border-accent/20 flex flex-col items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500 group-hover:border-accent/40">
              <span className="text-6xl font-black gradient-text opacity-90 drop-shadow-md tracking-tighter">
                404
              </span>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 backdrop-blur-md animate-float delay-100" />
            <div className="absolute -bottom-6 -left-2 w-12 h-12 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md animate-float delay-300" />
          </div>

          {/* ── Text Content ── */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back to the marketplace.
            </p>
          </div>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface text-foreground font-medium hover:bg-surface-hover border border-card-border transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
              Go Home
            </Link>
            <Link
              href="/discover"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
            >
              <Compass size={18} />
              Explore Products
            </Link>
          </div>

          {/* ── Helpful Links ── */}
          <div className="pt-16 max-w-xl mx-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Helpful Links
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/features" className="group glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-accent/30 transition-all hover:-translate-y-1">
                <Package size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Features</span>
              </Link>
              <Link href="/pricing" className="group glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-accent/30 transition-all hover:-translate-y-1 delay-100">
                <CreditCard size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Pricing</span>
              </Link>
              <Link href="/contact" className="group glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-accent/30 transition-all hover:-translate-y-1 delay-200">
                <MessageSquare size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Contact</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
