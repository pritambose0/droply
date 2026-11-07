import React from "react";

interface StatusBadgeProps {
  status: string;
}

const STATUS_STYLES: Record<
  string,
  { badge: string; dot: string; label?: string }
> = {
  paid: {
    badge: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
  },
  completed: {
    badge: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
  },
  published: {
    badge: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
  },
  pending: {
    badge: "bg-warning/10 text-warning border-warning/20",
    dot: "bg-warning",
  },
  processing: {
    badge: "bg-accent/10 text-accent border-accent/20",
    dot: "bg-accent",
  },
  draft: {
    badge: "bg-warning/10 text-warning border-warning/20",
    dot: "bg-warning",
  },
  failed: {
    badge: "bg-danger/10 text-danger border-danger/20",
    dot: "bg-danger",
  },
  cancelled: {
    badge: "bg-surface text-muted-foreground border-card-border",
    dot: "bg-muted-foreground",
  },
  refunded: {
    badge: "bg-danger/10 text-danger border-danger/20",
    dot: "bg-danger",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status?.toLowerCase();
  const style = STATUS_STYLES[key] ?? {
    badge: "bg-surface text-muted-foreground border-card-border",
    dot: "bg-muted-foreground",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
