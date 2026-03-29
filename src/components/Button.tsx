import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'none';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, isLoading, loadingText, variant = "primary", ...props }, ref) => {
        const variants = {
            primary: "bg-linear-to-r from-accent to-purple-400 text-white shadow-lg shadow-accent/20 hover:opacity-90",
            secondary: "bg-surface hover:bg-surface-hover text-foreground border border-card-border",
            ghost: "bg-transparent hover:bg-surface/10 text-muted-foreground hover:text-foreground",
            outline: "bg-transparent border border-accent/30 text-accent hover:bg-accent/10",
            danger: "bg-danger text-white shadow-lg shadow-danger/20 hover:opacity-90",
            none: ""
        };

        return (
            <button
                ref={ref}
                className={twMerge(
                    "w-full py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer",
                    variant !== "none" && (variants[variant as keyof typeof variants] || variants.primary),
                    className
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
    }
);

Button.displayName = "Button";

export default Button;