import Link from "next/link";
import { DroplyLogo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6 border-t border-card-border relative z-10 w-full bg-background/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
        {/* Brand */}
        <div className="flex-1 max-w-xs">
          <div className="flex items-center gap-2 mb-4">
            <DroplyLogo />
            <span className="font-semibold text-foreground text-xl">Droply</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The all-in-one platform for digital creators to sell products, manage their audience, and build a sustainable business.
          </p>
        </div>

        {/* Links Array */}
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/features" className="hover:text-accent transition-colors">Features</Link>
              <Link href="/discover" className="hover:text-accent transition-colors">Discover</Link>
              <Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link>
              <Link href="/sign-up" className="hover:text-accent transition-colors">Sign Up</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-accent transition-colors">About</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Twitter</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/refunds" className="hover:text-accent transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-card-border/50 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Droply Inc. All rights reserved.
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <span>San Francisco, CA</span>
          <span className="w-1 h-1 rounded-full bg-card-border self-center" />
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success"></div> All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
