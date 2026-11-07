"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Library,
  Settings,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { DroplyLogo } from "@/components/ui/Logo";

const sellerNavGroups = [
  {
    title: "Seller",
    items: [
      { href: "/seller/dashboard", label: "Overview", Icon: LayoutDashboard },
      { href: "/seller/products", label: "My Products", Icon: Package },
      { href: "/seller/orders", label: "Sales", Icon: ShoppingCart },
    ],
  },
  {
    title: "Buyer",
    items: [{ href: "/buyer/library", label: "Purchases", Icon: Library }],
  },
  {
    title: "Account",
    items: [{ href: "/seller/settings", label: "Settings", Icon: Settings }],
  },
];

const buyerNavGroups = [
  {
    title: "Buyer",
    items: [
      { href: "/buyer/library", label: "My Library", Icon: Library },
      { href: "/buyer/orders", label: "Order History", Icon: ShoppingCart },
    ],
  },
  {
    title: "Account",
    items: [{ href: "/buyer/settings", label: "Settings", Icon: Settings }],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  const role: "BUYER" | "CREATOR" =
    session?.user?.role === "creator" ? "CREATOR" : "BUYER";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }

    // Role-based protection: redirect buyers away from seller routes
    if (status === "authenticated" && role === "BUYER") {
      if (pathname.startsWith("/seller")) {
        router.push("/buyer/library");
      }
    }
  }, [status, role, pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const navGroups = role === "CREATOR" ? sellerNavGroups : buyerNavGroups;

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const userInitial = session?.user?.name?.[0]?.toUpperCase() || "U";
  const userName = session?.user?.name || "Droply user";
  const userEmail = session?.user?.email || "";
  const roleLabel = role === "CREATOR" ? "Creator account" : "Buyer account";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-card-border bg-[#0c0c0f] transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-card-border px-5 py-5">
          <Link href="/" className="group flex items-center gap-2.5">
            <DroplyLogo />
            <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
              Droply
            </span>
          </Link>
          <button
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <item.Icon
                        size={18}
                        className={active ? "text-accent" : "text-muted-foreground"}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Marketplace
            </div>
            <Link
              href="/discover"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <Compass size={18} className="text-muted-foreground" />
              Explore products
            </Link>
          </div>
        </nav>

        <div className="border-t border-card-border p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold uppercase text-accent">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {userName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {roleLabel}
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-danger/5 hover:text-danger"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-foreground hover:bg-surface"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <DroplyLogo />
            <span className="font-bold text-foreground">Droply</span>
          </Link>
          <div className="h-9 w-9" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
