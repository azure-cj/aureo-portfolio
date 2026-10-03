"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import ScrollFrameSequence from "@/components/ui/ScrollFrameSequence";
import { siteConfig } from "@/src/data/metadata";
import { heroContent, heroSequenceConfig } from "@/src/data/content";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Fade text and CTA out as the user scrolls through the sequence
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -30]);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-ink">
      {/* Background Frame Sequence Canvas */}
      <div className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        <ScrollFrameSequence
          frameCount={heroSequenceConfig.frameCount}
          framePath={heroSequenceConfig.framePath}
          fit={heroSequenceConfig.fit}
          className="h-full w-full"
          scrollHeightMultiplier={1}
        />
        {/* Contrast overlay ensuring hero text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/40 pointer-events-none" />
      </div>

      {/* Content layer with fade on scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-28 sm:px-8 lg:px-16"
      >
        <p className="font-display text-xs font-medium uppercase tracking-[0.4em] text-cream sm:text-sm">
          PORTFOLIO
        </p>

        <h1 className="mt-5 flex flex-col leading-none">
          <span className="font-display text-[clamp(4rem,18vw,13rem)] font-bold leading-none tracking-tight text-cream">
            AUREO
          </span>
          <span className="-mt-5 font-script text-[clamp(2.25rem,8vw,5rem)] font-bold leading-none text-accent sm:-mt-8">
            Christopher Joseph V.
          </span>
        </h1>

        <p className="mt-8 max-w-xl font-mono text-base leading-relaxed text-text-muted sm:text-lg">
          {heroContent.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {heroContent.ctaSecondary.text}
          </Button>
        </div>
      </motion.div>

      {/* Email — solid red box anchored to the bottom-right */}
      <div className="absolute bottom-6 right-6 z-10 sm:bottom-8 sm:right-8">
        <Link
          href={`mailto:${siteConfig.email}`}
          external
          className="rounded-none border border-accent bg-accent px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wider text-cream transition-smooth hover:opacity-90 active:scale-95"
        >
          {siteConfig.email}
        </Link>
      </div>
    </section>
  );
}
