import Link from "next/link";
import { ArrowLeft, Info, Search, XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-4">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger">
              <XCircle size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Checkout cancelled
          </h1>
          <p className="text-base text-muted-foreground">
            You left checkout before completing an order.
          </p>
        </div>

        <div className="surface-card flex items-start gap-4 p-6 text-left">
          <Info className="mt-0.5 shrink-0 text-accent" size={20} />
          <div>
            <p className="text-sm font-semibold text-foreground">
              About this page
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Checkout is not connected yet, so Droply cannot process or charge
              payments. If you have an existing order and believe something is
              wrong, contact support.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 border-t border-card-border pt-6 sm:flex-row">
          <Link
            href="/discover"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-card-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            <Search size={18} /> Browse marketplace
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={18} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
