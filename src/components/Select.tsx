import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      id,
      className,
      containerClassName,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={twMerge("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              "text-sm font-medium text-foreground",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={twMerge(
              "w-full cursor-pointer appearance-none rounded-xl border border-input-border bg-surface px-4 py-2.5 pr-10 text-sm font-medium text-foreground transition-all hover:border-input-border focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-input-focus disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-surface"
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
