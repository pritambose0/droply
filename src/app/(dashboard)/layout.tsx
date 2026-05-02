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
  Droplet,
  Star,
  Wallet
} from "lucide-react";

function DroplyLogo() {
  return (
    <div className="relative flex items-center justify-center">
      <Droplet size={28} className="text-accent fill-accent/20" />
      <div className="absolute inset-0 blur-sm bg-accent/20 rounded-full scale-150" />
    </div>
  );
}

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
    items: [
      { href: "/buyer/library", label: "Purchases", Icon: Library },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/seller/settings", label: "Settings", Icon: Settings },
    ],
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
    items: [
      { href: "/buyer/settings", label: "Settings", Icon: Settings },
    ],
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

  const role: "BUYER" | "CREATOR" = session?.user?.role === "creator" ? "CREATOR" : "BUYER";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }

    // Role-based protection: Redirect buyers away from seller routes
    if (status === "authenticated" && role === "BUYER") {
      if (pathname.startsWith("/seller")) {
        router.push("/buyer/library");
      }
    }
  }, [status, role, pathname, router]);

  const navGroups = role === "CREATOR" ? sellerNavGroups : buyerNavGroups;

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background noise grid-pattern flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const userInitial = session?.user?.name?.[0]?.toUpperCase() || "U";
  const userName = session?.user?.name || "Droply User";
  const userEmail = session?.user?.email || "user@droply.com";

  return (
    <div className="min-h-screen bg-background noise grid-pattern flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass border-r border-card-border z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-card-border">
          <Link href="/" className="flex items-center gap-2.5 group" id="dashboard-logo">
            <DroplyLogo />
            <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
              Droply
            </span>
          </Link>
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent"
                        }`}
                    >
                      <item.Icon size={20} className={isActive ? "text-accent" : "text-muted-foreground"} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-card-border pt-4 mt-auto">

          {/* User avatar placeholder */}
          <div className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-surface-hover rounded-xl cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-accent to-purple-400 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            id="nav-logout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-danger hover:bg-danger/5 transition-all w-full"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 glass border-b border-card-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground"
            id="mobile-menu-toggle"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <DroplyLogo />
            <span className="font-bold text-foreground">Droply</span>
          </Link>
          <div className="w-6" />
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
