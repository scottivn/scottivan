import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogotypeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

/**
 * Field & Larder wordmark. Fraunces, medium weight, snug tracking.
 * Lockup includes the ampersand on its own optical line so it visually settles.
 */
export function Logotype({ className, size = "md" }: LogotypeProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline gap-2 font-display font-medium tracking-tight text-ink",
        "hover:text-accent transition-colors duration-fast",
        sizeClasses[size],
        className,
      )}
      aria-label="Field & Larder — home"
    >
      <span>Field</span>
      <span className="text-accent">&amp;</span>
      <span>Larder</span>
    </Link>
  );
}
