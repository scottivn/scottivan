import { cn } from "@/lib/cn";

interface ProductImageProps {
  hue: [number, number];
  alt?: string;
  ratio?: "square" | "portrait" | "landscape";
  className?: string;
  /** Optional initial / wordmark overlay to give the placeholder character */
  caption?: string;
}

/**
 * Deterministic gradient placeholder while real product photography isn't loaded.
 * Phase 7 polish replaces these with actual photos via the admin form.
 * For now: every product still feels unique because the hue pair is data-driven.
 */
export function ProductImage({
  hue,
  alt = "",
  ratio = "portrait",
  className,
  caption,
}: ProductImageProps) {
  const ratioClass =
    ratio === "square"
      ? "aspect-square"
      : ratio === "landscape"
        ? "aspect-[16/10]"
        : "aspect-[4/5]";

  const [h1, h2] = hue;
  const style = {
    backgroundImage: `radial-gradient(120% 80% at 20% 20%, hsl(${h1} 38% 78% / 0.95) 0%, hsl(${h1} 28% 64% / 0.0) 55%), radial-gradient(95% 70% at 80% 85%, hsl(${h2} 30% 52% / 0.85) 0%, hsl(${h2} 28% 38% / 0.0) 60%), linear-gradient(160deg, hsl(${h1} 25% 80%) 0%, hsl(${h2} 30% 55%) 100%)`,
  } as const;

  return (
    <div
      role={alt ? undefined : "presentation"}
      aria-label={alt || undefined}
      className={cn(
        "relative overflow-hidden rounded-md border border-rule-2",
        ratioClass,
        className,
      )}
      style={style}
    >
      {/* Subtle grain — pure CSS, no asset */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.25) 0.5px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      {caption ? (
        <div className="absolute bottom-3 left-3 right-3 flex items-end">
          <span className="font-mono text-mono-tag text-white/90 mix-blend-screen tracking-tight">
            {caption}
          </span>
        </div>
      ) : null}
    </div>
  );
}
