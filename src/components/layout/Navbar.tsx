"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { DroplyLogo } from "../ui/Logo";

const NAV_LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Body scroll lock while menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  /* ── Close on Escape key ── */
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen
          ? "glass shadow-lg shadow-black/20 py-3"
          : "py-5 bg-transparent border border-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo" onClick={closeMenu}>
            <DroplyLogo />
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
              Droply
            </span>
          </Link>

          {/* ── Desktop links (unchanged) ── */}
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/discover" className="hover:text-foreground transition-colors">Discover</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>

          {/* ── Desktop CTAs (unchanged) ── */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <Link
                href={session.user.role === "creator" ? "/seller/dashboard" : "/buyer/library"}
                className="text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-purple-400 text-white hover:opacity-90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  id="nav-sign-in"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  id="nav-sign-up"
                  className="text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-purple-400 text-white hover:opacity-90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile hamburger button ── */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-foreground hover:bg-surface-hover transition-colors"
          >
            {menuOpen
              ? <X size={22} className="transition-transform duration-200 rotate-0" />
              : <Menu size={22} className="transition-transform duration-200" />
            }
          </button>
        </div>

        {/* ── Mobile slide-down menu ── */}
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
        >
          <div className="max-w-6xl mx-auto px-4 pb-6 pt-3">
            <div className="rounded-2xl border border-card-border bg-card-bg backdrop-blur-2xl p-4 space-y-1 shadow-2xl shadow-black/30">

              {/* Nav links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all group"
                >
                  {link.label}
                  <ArrowRight
                    size={14}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent"
                  />
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px bg-card-border my-2" />

              {/* CTA buttons */}
              {session ? (
                <Link
                  href={session.user.role === "creator" ? "/seller/dashboard" : "/buyer/library"}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20 mt-2"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="flex items-center justify-center w-full py-3 rounded-xl glass border border-card-border text-sm font-medium text-foreground hover:bg-surface-hover transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                  >
                    Get Started — It&apos;s Free
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Backdrop overlay (mobile) ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

