"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import Button from "@/components/Button";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  productName: string;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  productName,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
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
      <div className="relative w-full max-w-md glass border border-card-border/60 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-card-border/50 bg-surface/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-danger/10 text-danger flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Delete Product
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
          <p className="text-muted-foreground leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-foreground">
              &quot;{productName}&quot;{" "}
            </span>
            ? This action cannot be undone and will permanently remove the
            product from your store.
          </p>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isDeleting}
              className="px-6 py-2.5 bg-surface hover:bg-surface-hover"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="none"
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-6 py-2.5 bg-danger text-white hover:bg-danger/90 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
