"use client";

import { cn } from "@/src/lib/utils";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Full-height "pinned page" panel.
 *
 * NOTE: Currently rendered as a plain, always-visible section. Scroll-linked
 * enter/exit animation will be added here as a final, isolated step once the
 * static layout is confirmed rendering correctly.
 */
export default function RevealSection({
  children,
  className,
  id,
}: RevealSectionProps) {
  return (
    <section id={id} className={cn("min-h-screen", className)}>
      {children}
    </section>
  );
}
