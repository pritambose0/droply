import Link from "next/link";
import { DroplyLogo } from "@/components/ui/Logo";
import { ShieldCheck, Zap, Star } from "lucide-react";

const TRUST_POINTS = [
  { icon: Zap, text: "Instant delivery after purchase" },
  { icon: ShieldCheck, text: "SSL-encrypted secure checkout" },
  { icon: Star, text: "Trusted by 2,400+ creators globally" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background noise grid-pattern flex relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/8 blur-[140px] pointer-events-none" />

      {/* ── Left Brand Panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] flex-col justify-between p-12 relative border-r border-card-border/60">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group w-fit" id="auth-logo-panel">
          <DroplyLogo />
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            Droply
          </span>
        </Link>

        {/* Center content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground leading-tight mb-3">
              The creator marketplace
              <br />
              <span className="gradient-text">built for makers.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Sell digital products, templates, and more — with secure delivery,
              instant payouts, and zero complexity.
            </p>
          </div>

          <div className="space-y-3">
            {TRUST_POINTS.map((pt) => (
              <div key={pt.text} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <pt.icon size={14} />
                </div>
                <span className="text-muted-foreground">{pt.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Droply · All rights reserved.
        </p>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Mobile logo only */}
        <Link
          href="/"
          className="flex lg:hidden items-center gap-2 mb-8 group"
          id="auth-logo-mobile"
        >
          <DroplyLogo />
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            Droply
          </span>
        </Link>

        {/* Card */}
        <div className="w-full max-w-[420px]">
          <div className="glass rounded-3xl p-8 shadow-2xl animate-fade-in-up">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
