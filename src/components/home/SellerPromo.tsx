import { ArrowRight, Check, Store } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";

const SELLER_STEPS = [
  "Create your listing",
  "Add pricing, tags and a thumbnail",
  "Publish to the marketplace",
];

export function SellerPromo({ sellHref }: { sellHref: string }) {
  return (
    <section id="sell" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-card-border glass p-8 md:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                <Store size={12} />
                For sellers
              </span>

              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Have something worth selling?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Give your unused products a second life. Create a listing and
                connect with people looking for exactly what you have.
              </p>

              <ButtonLink
                href={sellHref}
                className="group mt-7 inline-flex rounded-full px-7 py-3.5 font-semibold shadow-lg shadow-accent/20"
              >
                Start Selling
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </ButtonLink>
            </div>

            <div className="space-y-3">
              {SELLER_STEPS.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-card-border bg-surface/80 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {step}
                  </span>
                  <Check
                    size={16}
                    className="ml-auto shrink-0 text-muted-foreground/40"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
