"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

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
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Keep ScrollTrigger in sync with Lenis' scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Expose Lenis globally for programmatic scrollTo
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // Drive Lenis from GSAP's ticker so everything shares one frame loop.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}


