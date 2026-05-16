"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Grid, List, LucideIcon } from "lucide-react";

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
  { value: "createdAt", label: "Newest First" },
  { value: "price", label: "Price: High to Low" },
  { value: "sales", label: "Most Popular" },
];

const viewModes: {
  type: "grid" | "list";
  icon: LucideIcon;
  title: string;
}[] = [
  { type: "grid", icon: Grid, title: "Grid View" },
  { type: "list", icon: List, title: "List View" },
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
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
      {/* Search */}
      <div className="relative flex-1 w-full md:max-w-sm">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50">
          <Search size={18} />
        </span>
        <input
          id="products-search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-medium shadow-sm"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Status Filter */}
        <div className="flex p-1 rounded-2xl bg-card-bg/50 border border-card-border backdrop-blur-md">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer ${
                statusFilter === s
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Custom Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-2xl bg-card-bg/50 border border-card-border text-[11px] font-bold uppercase tracking-wider text-foreground hover:bg-card-bg/80 transition-all backdrop-blur-md cursor-pointer min-w-[160px] justify-between"
          >
            <span className="truncate">
              {sortOptions.find((o) => o.value === sortBy)?.label}
            </span>
            <ChevronDown
              size={14}
              className={`text-accent transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isSortOpen && (
            <>
              {/* Backdrop to close on click outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <ul className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-card-bg border border-card-border rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        sortBy === option.value
                          ? "bg-accent text-white"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {option.label}
                      {sortBy === option.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex overflow-hidden rounded-xl border border-card-border">
          {viewModes.map(({ type, icon: Icon, title }) => {
            const isActive = viewMode === type;

            return (
              <button
                key={type}
                onClick={() => setViewMode(type)}
                title={title}
                className={`cursor-pointer p-2.5 transition-all ${
                  isActive
                    ? "bg-accent text-white shadow-lg"
                    : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
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
