import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/src/lib/utils";

type BadgeVariant = "default" | "accent" | "outline";

interface BadgeProps extends PropsWithChildren<HTMLAttributes<HTMLSpanElement>> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "border border-border bg-surface text-text-muted",
  accent: "rounded-none border border-accent bg-accent text-cream",
  outline: "border border-border/80 bg-surface/60 text-text-muted",
};

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
