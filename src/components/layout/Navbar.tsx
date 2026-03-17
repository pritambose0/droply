"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DroplyLogo } from "../ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/20 py-3" : "py-5 bg-transparent border border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <DroplyLogo />
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            Droply
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link href="/features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/discover" className="hover:text-foreground transition-colors">
            Discover
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <Link
              href={session.user.role === "creator" ? "/dashboard" : "/library"}
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
      </div>
    </nav>
  );
}
