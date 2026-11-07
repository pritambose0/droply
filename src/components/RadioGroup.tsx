import { twMerge } from "tailwind-merge";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  variant?: "plain" | "card";
  className?: string;
}

export default function RadioGroup({
  name,
  value,
  options,
  onChange,
  variant = "plain",
  className,
}: RadioGroupProps) {
  return (
    <div
      className={twMerge("space-y-2", className)}
      role="radiogroup"
      aria-label={name}
    >
      {options.map((option) => {
        const isChecked = value === option.value;

        return (
          <label
            key={option.value}
            className={twMerge(
              "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
              variant === "card" &&
                "rounded-lg bg-surface border border-card-border hover:border-accent/30",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={twMerge(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                isChecked
                  ? "border-accent"
                  : "border-card-border group-hover:border-accent/50",
              )}
            >
              {isChecked && (
                <span className="h-2 w-2 rounded-full bg-accent" />
              )}
            </span>
            <span
              className={twMerge(
                "text-sm font-medium transition-colors",
                isChecked
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
