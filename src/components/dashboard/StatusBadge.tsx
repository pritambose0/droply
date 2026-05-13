import React from "react";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors: Record<string, string> = {
    paid: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    failed: "bg-danger/10 text-danger border-danger/20",
    completed: "bg-success/10 text-success border-success/20",
    processing: "bg-accent/10 text-accent border-accent/20",
    cancelled: "bg-muted/10 text-muted-foreground border-card-border",
    published: "bg-success/10 text-success border-success/20",
    draft: "bg-warning/10 text-warning border-warning/20",
  };

  const statusType = status?.toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border capitalize backdrop-blur-sm transition-all hover:scale-105 ${
        colors[statusType] ||
        "bg-surface text-muted-foreground border-card-border"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          ["paid", "completed", "published"].includes(statusType)
            ? "bg-success animate-pulse"
            : ["pending", "processing"].includes(statusType)
              ? statusType === "pending"
                ? "bg-warning"
                : "bg-accent"
              : "bg-danger"
        }`}
      />
      {status}
    </span>
  );
}
