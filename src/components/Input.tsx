import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerClassName?: string;
    labelClassName?: string;
    required?: boolean;
    variant?: "default" | "dashboard";
    as?: "input" | "textarea";
    rows?: number;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    (
        {
            label,
            error,
            icon,
            rightIcon,
            className,
            containerClassName,
            labelClassName,
            id,
            required,
            variant = "default",
            as = "input",
            rows,
            ...props
        },
        ref
    ) => {
        const labelStyles = {
            default: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
            dashboard: "text-sm font-medium text-foreground"
        };

        const inputStyles = {
            default: "py-3 bg-input-bg border-input-border focus:ring-2 focus:ring-input-focus",
            dashboard: "py-2.5 bg-surface border-input-border focus:ring-1 focus:ring-accent"
        };

        const commonClasses = twMerge(
            "w-full px-4 rounded-xl border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none transition-all",
            inputStyles[variant],
            icon && "pl-11",
            rightIcon && "pr-11",
            error && "border-red-500",
            className
        );

        return (
            <div className={twMerge("space-y-2", containerClassName)}>
                {/* Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className={twMerge(labelStyles[variant], labelClassName)}
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                {/* Input Wrapper */}
                <div className="relative">
                    {/* Left Icon */}
                    {icon && (
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {icon}
                        </span>
                    )}

                    {/* Input or Textarea */}
                    {as === "textarea" ? (
                        <textarea
                            ref={ref as React.RefObject<HTMLTextAreaElement>}
                            id={id}
                            rows={rows}
                            className={twMerge(commonClasses, "resize-y min-h-[120px] py-3")}
                            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        />
                    ) : (
                        <input
                            ref={ref as React.RefObject<HTMLInputElement>}
                            id={id}
                            className={commonClasses}
                            {...(props as InputHTMLAttributes<HTMLInputElement>)}
                        />
                    )}

                    {/* Right Icon */}
                    {rightIcon && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {rightIcon}
                        </span>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;