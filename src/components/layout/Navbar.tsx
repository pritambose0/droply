"use client";

import Link from "next/link";
import { FormEvent, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X, ArrowRight, Search } from "lucide-react";
import { DroplyLogo } from "../ui/Logo";

const BASE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Explore" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const { data: session, status } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ── Scroll destination ── */
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
    return () => {
      document.body.style.overflow = "";
    };
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

  const handleMobileSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = mobileSearch.trim();
    closeMenu();
    setMobileSearch("");
    router.push(query ? `/discover?q=${encodeURIComponent(query)}` : "/discover");
  };

  const role = session?.user.role;
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  const sellerLinks =
    role === "creator"
      ? [
          { href: "/seller/products", label: "My Listings" },
          { href: "/seller/products/new", label: "Sell" },
        ]
      : status === "unauthenticated"
        ? [{ href: "/sign-up?role=creator", label: "Sell" }]
        : [];

  const navLinks = [
    ...BASE_LINKS,
    ...sellerLinks,
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "glass shadow-lg shadow-black/20 py-3"
            : "py-5 bg-transparent border border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            id="nav-logo"
            onClick={closeMenu}
          >
            <DroplyLogo />
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
              Droply
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={`whitespace-nowrap transition-colors ${
                  isActive(link.href)
                    ? "font-medium text-foreground"
                    : "hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/discover"
              aria-label="Search products"
              title="Search products"
              className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all"
            >
              <Search size={18} />
            </Link>

            {session ? (
              <Link
                href={
                  session.user.role === "creator"
                    ? "/seller/dashboard"
                    : "/buyer/library"
                }
                id="nav-dashboard"
                className="text-sm font-medium px-5 py-2.5 rounded-full bg-accent text-white transition-all shadow-sm hover:bg-accent-hover"
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
                  className="text-sm font-medium px-5 py-2.5 rounded-full bg-accent text-white transition-all shadow-sm hover:bg-accent-hover"
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
            {menuOpen ? (
              <X size={22} className="transition-transform duration-200 rotate-0" />
            ) : (
              <Menu size={22} className="transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* ── Mobile slide-down menu ── */}
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 pb-6 pt-3">
            <div className="rounded-2xl border border-card-border bg-card-bg backdrop-blur-2xl p-4 space-y-1 shadow-2xl shadow-black/30">
              {/* Mobile search */}
              <form onSubmit={handleMobileSearch} role="search" className="relative mb-2">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="mobile-search"
                  type="search"
                  value={mobileSearch}
                  onChange={(event) => setMobileSearch(event.target.value)}
                  placeholder="Search products"
                  autoComplete="off"
                  className="w-full rounded-xl border border-input-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-accent/40 focus:ring-1 focus:ring-accent"
                />
              </form>

              {/* Nav links */}
              {navLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
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
                  href={
                    session.user.role === "creator"
                      ? "/seller/dashboard"
                      : "/buyer/library"
                  }
                  onClick={closeMenu}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover"
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover"
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
