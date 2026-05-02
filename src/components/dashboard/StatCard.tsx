import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  color,
}: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-6 hover:border-accent/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={24} />
        </div>
        <div
          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
            trend === "up"
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground mb-1 font-mono tracking-tight">{value}</div>
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}
