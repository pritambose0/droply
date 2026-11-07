import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type LinkProps = ComponentPropsWithoutRef<typeof Link>;

interface ButtonLinkProps extends LinkProps {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "none";
}

const variants = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-accent-hover active:scale-[0.99]",
  secondary:
    "bg-surface hover:bg-surface-hover text-foreground border border-card-border",
  ghost: "bg-transparent hover:bg-surface text-muted-foreground hover:text-foreground",
  outline:
    "bg-transparent border border-accent/30 text-accent hover:bg-accent/10",
  danger: "bg-danger text-white shadow-sm hover:bg-danger/90 active:scale-[0.99]",
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
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover",
        variant !== "none" && variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
