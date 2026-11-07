import { Compass, Store, type LucideIcon } from "lucide-react";

type Path = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  steps: string[];
};

const PATHS: Path[] = [
  {
    icon: Compass,
    label: "For buyers",
    title: "Discover with ease",
    description:
      "Browse a public marketplace built around finding the right product without friction.",
    steps: [
      "Explore every published product on the marketplace.",
      "Search by keyword, category or tag to narrow things down.",
      "Open any listing to see its details and the creator behind it.",
    ],
  },
  {
    icon: Store,
    label: "For creators",
    title: "Share what you make",
    description:
      "Turn a finished digital product into a listing with a simple, focused flow.",
    steps: [
      "Create a listing with a title, description and price.",
      "Add a thumbnail and tags so buyers can discover it.",
      "Publish when ready and manage your listings from your dashboard.",
    ],
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-card-border/40 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-accent">
            How Droply works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            One marketplace. Two simple paths.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Whether you are here to find something new or share something of
            your own, Droply is built to keep both journeys simple.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PATHS.map((path) => (
            <div
              key={path.label}
              className="rounded-2xl border border-card-border bg-card-bg p-7 transition-colors hover:border-accent/20"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <path.icon size={21} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {path.label}
                  </p>
                  <h3 className="text-lg font-bold text-foreground">
                    {path.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {path.description}
              </p>

              <ol className="mt-6 space-y-3">
                {path.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-[10px] font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
