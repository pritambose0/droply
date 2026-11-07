import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-card-border bg-card-bg/40 text-center",
        compact ? "p-8" : "p-12 md:p-16",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-card-border bg-surface text-muted-foreground">
        <Icon size={22} />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-6 flex items-center gap-3">{action}</div>}
    </div>
  );
}
