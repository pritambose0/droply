"use client";

import { X, Tag, ShoppingCart, Info, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    description: string;
    price: number | string;
    tags: string | string[];
    thumbnailUrl?: string;
  };
}

export default function PreviewModal({
  isOpen,
  onClose,
  data,
}: PreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const tagsArray = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#121214] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/10 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left: Media Preview */}
        <div className="w-full md:w-3/5 bg-surface/50 relative aspect-video md:aspect-auto">
          {data.thumbnailUrl ? (
            <Image
              src={data.thumbnailUrl}
              alt={data.title || "Product Preview"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center">
                <Info size={32} className="opacity-20" />
              </div>
              <p className="text-sm font-medium">No thumbnail uploaded</p>
            </div>
          )}

          <div className="absolute top-4 left-4">
            <div className="px-3 py-1.5 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              Preview Mode
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[60vh] md:max-h-none">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {data.title || "Untitled Product"}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">
                ${data.price || "0.00"}
              </span>
              <span className="text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded-lg border border-card-border">
                Instant Delivery
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Info size={16} className="text-accent" />
              Description
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {data.description || "No description provided yet."}
            </p>
          </div>

          {tagsArray.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Tag size={16} className="text-accent" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {tagsArray.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-surface border border-card-border text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 space-y-3">
            <Button className="w-full py-4 rounded-2xl shadow-xl shadow-accent/20">
              <ShoppingCart size={18} />
              Buy Now
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              This is a preview of how your product will look to buyers.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
