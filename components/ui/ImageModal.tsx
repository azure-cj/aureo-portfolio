"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import {
  modalBackdropVariants,
  modalImageVariants,
  modalImageReducedMotionVariants,
} from "@/src/lib/animations";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  projectTitle: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectTitle,
}: ImageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { lenis } = useLenis();
  const shouldReduceMotion = useReducedMotion();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Sync index when opened or initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsImageLoading(true);
      triggerElementRef.current = (document.activeElement as HTMLElement) || null;
    }
  }, [isOpen, initialIndex]);

  // Client-side portal mounting check
  useEffect(() => {
    setMounted(true);
  }, []);

  const hasMultiple = images.length > 1;

  const handlePrevious = useCallback(() => {
    if (!hasMultiple) return;
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [hasMultiple, images.length]);

  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [hasMultiple, images.length]);

  // Preload neighbor images
  useEffect(() => {
    if (!isOpen || images.length <= 1 || typeof window === "undefined") return;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    const nextIdx = (currentIndex + 1) % images.length;
    [images[prevIdx], images[nextIdx]].forEach((src) => {
      if (src) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [isOpen, currentIndex, images]);

  // Scroll lock and Lenis stop/start
  useEffect(() => {
    if (!isOpen) return;

    // Stop Lenis smooth scrolling
    lenis?.stop();
    const globalLenis =
      typeof window !== "undefined" ? (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis : null;
    globalLenis?.stop();

    // Prevent body scroll and compensate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      lenis?.start();
      globalLenis?.start();
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, lenis]);

  // Accessibility: Focus trap, Esc, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to thumbnail trigger
      triggerElementRef.current?.focus();
    };
  }, [isOpen, onClose, handlePrevious, handleNext]);

  if (!mounted) return null;

  const currentSrc = images[currentIndex];
  const imageVariants = shouldReduceMotion
    ? modalImageReducedMotionVariants
    : modalImageVariants;

  return createPortal(
    <AnimatePresence>
      {isOpen && currentSrc && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} screenshot preview`}
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-ink/80 p-4 sm:p-6 backdrop-blur-md select-none touch-none"
        >
          {/* Top Bar */}
          <div
            className="flex w-full max-w-6xl items-center justify-between z-10 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-semibold tracking-wide text-cream">
                {projectTitle}
              </span>
              {hasMultiple && (
                <span className="rounded-full bg-surface border border-white/10 px-2.5 py-0.5 font-mono text-xs text-text-muted">
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-surface/80 border border-white/10 text-cream transition-colors hover:bg-surface hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close screenshot preview"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Content Area */}
          <div
            className="relative flex flex-1 w-full max-w-[90vw] items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Indicator */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            )}

            {/* Expanded Image Container */}
            <motion.div
              key={currentSrc}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] max-h-[85vh] max-w-5xl"
            >
              <Image
                src={currentSrc}
                alt={`${projectTitle} - screenshot ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 90vw, 85vw"
                className="object-contain"
                priority
                onLoad={() => setIsImageLoading(false)}
                draggable={false}
              />
            </motion.div>

            {/* Prev Button */}
            {hasMultiple && (
              <button
                type="button"
                onClick={handlePrevious}
                className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-surface/85 border border-white/10 text-cream backdrop-blur-sm transition-all hover:bg-surface hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next Button */}
            {hasMultiple && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-surface/85 border border-white/10 text-cream backdrop-blur-sm transition-all hover:bg-surface hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Next screenshot"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails / Instructions */}
          <div
            className="flex items-center justify-center w-full z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {hasMultiple ? (
              <div className="flex items-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => {
                      setIsImageLoading(true);
                      setCurrentIndex(idx);
                    }}
                    className="flex min-h-[44px] min-w-[32px] items-center justify-center focus:outline-none"
                    aria-label={`Jump to screenshot ${idx + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-200 ${
                        idx === currentIndex
                          ? "h-2 w-6 bg-accent"
                          : "h-2 w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-xs font-mono text-text-dim">
                Press Esc or click outside to close
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
