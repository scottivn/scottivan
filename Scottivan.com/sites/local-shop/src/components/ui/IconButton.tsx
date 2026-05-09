import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "ghost" | "outline";
}

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
};

const variantClasses = {
  ghost: "bg-transparent text-ink hover:bg-accent-soft hover:text-accent",
  outline:
    "bg-transparent text-ink border border-rule hover:border-rule-strong hover:bg-surface-2",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      children,
      size = "md",
      variant = "ghost",
      className,
      type = "button",
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors duration-fast",
          "focus-visible:outline-none focus-visible:shadow-focus",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
