"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { DroplyLogo } from "../ui/Logo";

const FOOTER_LINKS = [
  {
    heading: "Marketplace",
    links: [
      { href: "/discover", label: "Explore Products" },
      { href: "/discover?price=free", label: "Free Resources" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/features", label: "Features" },
      { href: "/contact", label: "Contact" },
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
  const { data: session } = useSession();
  const role = session?.user.role;
  const sellHref =
    role === "creator" ? "/seller/products/new" : "/sign-up?role=creator";

  const footerLinks = FOOTER_LINKS.map((column) =>
    column.heading === "Marketplace" && role !== "buyer"
      ? {
          ...column,
          links: [...column.links, { href: sellHref, label: "Start Selling" }],
        }
      : column,
  );

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
            <p className="text-sm leading-relaxed text-muted-foreground">
              A marketplace for discovering digital products and listing your
              own. Built for buyers and independent creators.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 md:gap-14">
            {footerLinks.map((col) => (
              <div key={col.heading} className="space-y-4">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">
                  {col.heading}
                </h4>
                <div className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
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
          <span>Built for independent creators and buyers.</span>
        </div>
      </div>
    </footer>
  );
}
