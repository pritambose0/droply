import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            icon,
            className,
            containerClassName,
            id,
            ...props
        },
        ref
    ) => {
        return (
            <div className={`space-y-2 ${containerClassName}`}>

                {/* Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                        {label}
                    </label>
                )}

                {/* Input Wrapper */}
                <div className="relative">
                    {icon && (
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                            {icon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={id}
                        className={`
                        w-full pr-4 py-3 rounded-xl bg-input-bg border text-foreground placeholder-muted text-sm
                        focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all
                        ${icon ? "pl-11" : "pl-4"}
                        ${error ? "border-red-500" : "border-input-border"}
                        ${className}
                        placeholder:text-white/20
                        `}
                        {...props}
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;