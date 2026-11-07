import Link from "next/link";
import { DroplyLogo } from "@/components/ui/Logo";
import { BadgeCheck, Download, ShieldCheck } from "lucide-react";

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Email verification with one-time codes" },
  { icon: BadgeCheck, text: "Separate buyer and creator accounts" },
  { icon: Download, text: "Download access after a paid order" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* ── Left Brand Panel (desktop only) ── */}
      <div className="relative hidden flex-col justify-between border-r border-card-border p-12 lg:flex lg:w-[44%] xl:w-[42%]">
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
            <h2 className="mb-3 text-3xl font-bold leading-tight text-foreground">
              The digital product marketplace{" "}
              <span className="gradient-text">built for makers.</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover products from independent creators, or open a creator
              account to list and manage your own catalog.
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
          <div className="surface-card p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
