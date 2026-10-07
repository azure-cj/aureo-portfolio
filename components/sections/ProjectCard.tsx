"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Link from "@/components/ui/Link";
import ImageModal from "@/components/ui/ImageModal";
import type { Project } from "@/src/types";

type Direction = -1 | 1;

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const autoAdvanceRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const images = project.images || [];
  const hasMultipleImages = images.length > 1;

  // Auto-rotation (only when not interacting and multiple valid images exist)
  useEffect(() => {
    if (!isInteracting && hasMultipleImages) {
      autoAdvanceRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [isInteracting, hasMultipleImages, images.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // Minimum px for swipe trigger

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  const currentImageHasError = failedImages[currentIndex];

  return (
    <Card hover className="flex h-full flex-col">
      {/* Image Carousel Section */}
      <div
        className="group relative mb-4 aspect-video w-full overflow-hidden rounded-t-xl bg-surface border border-white/10 touch-pan-y"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 0 && !currentImageHasError ? (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${project.title} - slide ${currentIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover select-none"
                  onError={() => handleImageError(currentIndex)}
                  priority={currentIndex === 0}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover hint for zoom */}
            <div className="pointer-events-none absolute bottom-2.5 right-2.5 z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-mono text-cream/90 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              <ZoomIn size={13} className="text-accent" />
              <span>Click to enlarge</span>
            </div>

            {/* Image Count Badge */}
            {hasMultipleImages && (
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-full pointer-events-none z-10">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Arrow Buttons with 44px tap targets */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-white transition-opacity duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/90 active:scale-95 transition-all">
                    <ChevronLeft size={18} />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-white transition-opacity duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/90 active:scale-95 transition-all">
                    <ChevronRight size={18} />
                  </span>
                </button>
              </>
            )}

            {/* Dot Indicators with enlarged 44x44px touch targets */}
            {hasMultipleImages && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className="flex items-center justify-center min-w-[32px] min-h-[32px]"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "bg-accent w-4 h-1.5"
                          : "bg-white/40 hover:bg-white/70 w-1.5 h-1.5"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface/60 border border-white/5 p-4 text-center">
            <span className="text-xs text-cream font-mono">No preview available</span>
          </div>
        )}
      </div>

      {/* Project Info Section */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {project.icon ? (
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 md:h-10 md:w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                <Image
                  src={project.icon}
                  alt={project.iconFit === 'contain' ? 'NU logo' : `${project.title} app icon`}
                  width={40}
                  height={40}
                  className={`h-full w-full ${project.iconFit === 'contain' ? 'object-contain p-1' : 'object-cover'}`}
                />
              </div>
              <h3 className="heading-sm min-w-0 break-words">{project.title}</h3>
            </div>
          ) : (
            <h3 className="heading-sm">{project.title}</h3>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {project.status === "in-progress" && (
              <Badge
                variant="accent"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-cream opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cream" />
                </span>
                In Progress
              </Badge>
            )}
            {project.projectType && (
              <Badge variant="outline" className="text-[11px]">
                {project.projectType}
              </Badge>
            )}
            {project.featured ? (
              <span className="inline-block rounded-none border border-accent bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream">
                Featured
              </span>
            ) : null}
          </div>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-text-dim whitespace-nowrap">
          {project.tags.length} tech
        </span>
      </div>

      <p className="body-sm flex-1 text-cream">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="accent">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {project.live ? (
          <Link
            href={project.live}
            external
            className="rounded-none border border-accent bg-accent px-4 py-2 text-sm font-medium text-cream hover:opacity-90 min-h-[44px] flex items-center"
          >
            Live site ↗
          </Link>
        ) : null}

        {project.github ? (
          <Link
            href={project.github}
            external
            className="text-sm text-cream min-h-[44px] flex items-center"
          >
            GitHub ↗
          </Link>
        ) : null}

        {project.secondaryLink ? (
          <Link
            href={project.secondaryLink.url}
            external
            className="text-sm text-cream min-h-[44px] flex items-center"
          >
            {project.secondaryLink.label} ↗
          </Link>
        ) : null}
      </div>

      {images.length > 0 && !currentImageHasError && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={images}
          initialIndex={currentIndex}
          projectTitle={project.title}
        />
      )}
    </Card>
  );
}
