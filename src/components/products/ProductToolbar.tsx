"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Grid, List, LucideIcon, Search } from "lucide-react";

interface ProductToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: "all" | "published" | "draft";
  setStatusFilter: (value: "all" | "published" | "draft") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
}

const sortOptions = [
  { value: "createdAt", label: "Newest first" },
  { value: "price", label: "Price: high to low" },
  { value: "sales", label: "Most popular" },
];

const viewModes: {
  type: "grid" | "list";
  icon: LucideIcon;
  title: string;
}[] = [
  { type: "grid", icon: Grid, title: "Grid view" },
  { type: "list", icon: List, title: "List view" },
];

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
      <div className="relative w-full flex-1 md:max-w-sm">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </span>
        <input
          id="products-search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-input-border bg-input-bg py-2.5 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-input-focus"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl border border-card-border bg-surface p-1">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex min-w-[160px] cursor-pointer items-center justify-between gap-3 rounded-xl border border-card-border bg-surface py-2.5 pl-3.5 pr-3 text-xs font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            <span className="truncate">
              {sortOptions.find((o) => o.value === sortBy)?.label}
            </span>
            <ChevronDown
              size={14}
              className={`text-muted-foreground transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <ul className="absolute left-0 top-full z-20 mt-2 w-full min-w-[200px] overflow-hidden rounded-xl border border-card-border bg-[#131316] py-1 shadow-xl shadow-black/40">
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-colors ${
                        sortBy === option.value
                          ? "text-accent"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {option.label}
                      {sortBy === option.value && <Check size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex overflow-hidden rounded-xl border border-card-border">
          {viewModes.map(({ type, icon: Icon, title }) => {
            const isActive = viewMode === type;

            return (
              <button
                key={type}
                onClick={() => setViewMode(type)}
                title={title}
                className={`cursor-pointer p-2.5 transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
