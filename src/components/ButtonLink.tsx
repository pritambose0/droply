import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type LinkProps = ComponentPropsWithoutRef<typeof Link>;

interface ButtonLinkProps extends LinkProps {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "none";
}

const variants = {
  primary:
    "bg-linear-to-r from-accent to-purple-400 text-white shadow-lg shadow-accent/20 hover:opacity-90",
  secondary:
    "bg-surface hover:bg-surface-hover text-foreground border border-card-border",
  ghost: "bg-transparent hover:bg-surface/10 text-muted-foreground hover:text-foreground",
  outline:
    "bg-transparent border border-accent/30 text-accent hover:bg-accent/10",
  danger: "bg-danger text-white shadow-lg shadow-danger/20 hover:opacity-90",
  none: "",
};

export default function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={twMerge(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium text-sm transition-all cursor-pointer py-3 px-6",
        variant !== "none" && variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
