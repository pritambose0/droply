import Link from "next/link";
import { DroplyLogo } from "../ui/Logo";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { href: "/discover", label: "Discover" },
      { href: "/pricing", label: "Pricing" },
      { href: "/sign-up", label: "Get Started Free" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/refunds", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6 border-t border-card-border/40 relative z-10 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <DroplyLogo />
              <span className="font-bold text-foreground text-lg">Droply</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The cleanest way for creators to sell digital products and get paid instantly.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="space-y-4">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">
                  {col.heading}
                </h4>
                <div className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-card-border/40 gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Droply. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
