import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "none";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      loadingText,
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-accent text-white shadow-sm hover:bg-accent-hover active:scale-[0.99]",
      secondary:
        "bg-surface hover:bg-surface-hover text-foreground border border-card-border",
      ghost:
        "bg-transparent hover:bg-surface text-muted-foreground hover:text-foreground",
      outline:
        "bg-transparent border border-accent/30 text-accent hover:bg-accent/10",
      danger:
        "bg-danger text-white shadow-sm hover:bg-danger/90 active:scale-[0.99]",
      none: "",
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
          variant !== "none" &&
            (variants[variant as keyof typeof variants] || variants.primary),
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            {loadingText || "Loading..."}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
