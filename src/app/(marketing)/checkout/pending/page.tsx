import Link from "next/link";
import { ArrowRight, Clock, Info } from "lucide-react";

export default function CheckoutPendingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-4">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning">
              <Clock size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Payment pending
          </h1>
          <p className="text-base text-muted-foreground">
            This is the pending payment state for a checkout flow.
          </p>
        </div>

        <div className="surface-card flex flex-col items-center gap-4 p-6 text-center">
          <Info className="text-accent" size={24} />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Payment confirmation is not connected
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Once payment processing is implemented, this page will reflect the
              provider&apos;s status and link the order to your library. Until
              then, no real payment can be pending.
            </p>
          </div>
        </div>

        <div className="border-t border-card-border pt-6">
          <Link
            href="/discover"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Back to marketplace <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
