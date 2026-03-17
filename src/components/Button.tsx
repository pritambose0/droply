import { LoadingSpinner } from "@/app/(auth)/forgot-password/page";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, isLoading, loadingText, ...props }, ref) => {

        return (
            <button
                ref={ref}
                className={`${className} w-full py-3 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer`}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner />
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