"use client";

import React, { useEffect, useRef } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import Button from "@/components/Button";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  productName: string;
  error?: string | null;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  productName,
  error,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Move focus into the dialog on open and restore it on close
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    cancelButtonRef.current?.focus();

    return () => {
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  // Handle escape key and trap Tab focus inside the dialog
  useEffect(() => {
    if (!isOpen) return;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => !isDeleting && onClose()}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-product-title"
        aria-describedby="delete-product-description"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-card-border bg-[#111114] shadow-2xl animate-fade-in-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-card-border p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/10 text-danger">
              <AlertTriangle size={20} />
            </div>
            <h2
              id="delete-product-title"
              className="text-lg font-semibold text-foreground"
            >
              Delete product
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            id="delete-product-description"
            className="text-muted-foreground leading-relaxed"
          >
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              &quot;{productName}&quot;
            </span>
            ? This action cannot be undone and will permanently remove the
            product from your catalogue.
          </p>

          {error && (
            <p className="mt-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              ref={cancelButtonRef}
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isDeleting}
              className="px-5 py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-5 py-2.5"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete product"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
