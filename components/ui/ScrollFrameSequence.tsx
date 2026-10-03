"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/src/lib/utils";

export interface ScrollFrameSequenceProps {
  frameCount: number;
  framePath: (index: number) => string;
  fit?: "cover" | "contain";
  className?: string;
  scrollHeightMultiplier?: number;
}

export default function ScrollFrameSequence({
  frameCount,
  framePath,
  fit = "cover",
  className,
  scrollHeightMultiplier = 3,
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const currentFrameRef = useRef<number | null>(null);
  const currentProgressRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef<boolean>(false);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      const img = imagesRef.current[frameIndex - 1];
      const width = canvas.width / dprRef.current;
      const height = canvas.height / dprRef.current;

      ctx.clearRect(0, 0, width, height);

      if (!img || !img.complete) return;

      const isPortrait = height > width;
      const progress = currentProgressRef.current;

      if (fit === "cover" || isPortrait) {
        // Cover: fill container, crop or pan
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;
        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (imgRatio > canvasRatio) {
          // Image is wider than canvas
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetY = 0;

          if (isPortrait) {
            // Mobile portrait: shift draw offset horizontally from left to right as progress goes from 0 to 1
            const maxShift = width - drawWidth; // negative value
            offsetX = maxShift * progress;
          } else {
            offsetX = (width - drawWidth) / 2;
          }
        } else {
          // Image is taller than canvas - crop vertically
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Contain: fit entirely inside
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;
        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (imgRatio < canvasRatio) {
          // Image is taller
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        } else {
          // Image is wider
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    },
    [fit]
  );

  const scheduleDraw = useCallback(
    (frameIndex: number) => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
        animationFrameRef.current = null;
      });
    },
    [drawFrame]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    // Load first frame immediately
    const firstFrame = new Image();
    firstFrame.loading = "eager";
    firstFrame.src = framePath(0);
    firstFrame.onload = () => {
      setIsFirstFrameLoaded(true);
      currentFrameRef.current = 1;
      drawFrame(1);
    };
    images[0] = firstFrame;

    // Progressive loading for remaining frames
    const loadRemaining = () => {
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.loading = "lazy";
        img.src = framePath(i - 1);
        img.onload = () => {
          // Redraw if this becomes the current frame
          if (currentFrameRef.current === i) {
            drawFrame(i);
          }
        };
        images[i - 1] = img;
      }
    };

    // Load remaining frames after first is ready with a small delay
    if (!prefersReducedMotionRef.current) {
      setTimeout(loadRemaining, 100);
    } else {
      loadRemaining();
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (currentFrameRef.current !== null) {
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Setup GSAP ScrollTrigger if not reduced motion
    if (!prefersReducedMotionRef.current && wrapperRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          currentProgressRef.current = progress;
          let frameIndex = Math.round(progress * (frameCount - 1)) + 1;
          if (frameIndex < 1) frameIndex = 1;
          if (frameIndex > frameCount) frameIndex = frameCount;
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            scheduleDraw(frameIndex);
          } else if (canvas.height > canvas.width) {
            // In mobile portrait, redraw for continuous horizontal panning
            scheduleDraw(frameIndex);
          }
        },
      });
      scrollTriggerRef.current = trigger;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [frameCount, framePath, scrollHeightMultiplier, drawFrame, scheduleDraw]);

  const height = scrollHeightMultiplier * 100;

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", className)}
      style={{ height: `${height}vh` }}
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          aria-hidden="true"
        />
        {!isFirstFrameLoaded && (
          <div className="absolute inset-0 bg-surface" />
        )}
      </div>
    </div>
  );
}
