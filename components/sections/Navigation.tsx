"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/src/data/metadata";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const navLinkClass =
  "flex items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.12em] text-cream transition-smooth hover:text-accent";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (y > 100) {
      setIsScrolled(true);
      if (diff > 0 && y > 200) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }
    } else {
      setIsScrolled(false);
      setHidden(false);
    }
    lastYRef.current = y;
  });

  useEffect(() => {
    const sections = links.map((link) => link.href.substring(1));
    sections.unshift("hero");

    const triggers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      return ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  const handleScrollTo = (href: string) => {
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const y = element.getBoundingClientRect().top + window.scrollY - navHeight;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(y, { offset: 0 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-ink/90 backdrop-blur" : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between py-5">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#hero");
            }}
            className="font-display text-sm font-bold tracking-[0.24em] text-cream uppercase"
          >
            {siteConfig.initials}
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className={cn(navLinkClass, isActive && "text-accent")}
                >
                  <span className="text-accent">●</span>
                  {link.label}
                </a>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden min-h-[44px] min-w-[44px] px-3 font-display text-xs uppercase tracking-widest text-cream"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {isOpen ? "Close" : "Menu"}
          </Button>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            "grid gap-1 overflow-hidden md:hidden transition-all duration-300",
            isOpen
              ? "max-h-96 opacity-100 pb-5 pt-2"
              : "max-h-0 pb-0 pt-0 opacity-0"
          )}
        >
          {links.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(navLinkClass, "min-h-[44px] px-2", isActive && "text-accent")}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
              >
                <span className="text-accent">●</span>
                {link.label}
              </a>
            );
          })}
        </div>
      </Container>

      {/* Thin horizontal rule beneath the nav bar */}
      <div className="h-px w-full bg-border" />
    </motion.header>
  );
}
