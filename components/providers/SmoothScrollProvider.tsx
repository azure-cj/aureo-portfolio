"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth-scrolling provider.
 *
 * Initializes Lenis on mount, syncs it with GSAP's ticker, and registers
 * ScrollTrigger so it reads Lenis' scroll position (via lenis.on("scroll")).
 * This is what makes scroll-driven animations fire correctly while Lenis is
 * intercepting native scroll. Cleans up both on unmount.
 *
 * Respects `prefers-reduced-motion` via Lenis' `respectReducedMotion` option:
 * when enabled, Lenis falls back to native scrolling (no animation added).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so everything shares one frame loop.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

