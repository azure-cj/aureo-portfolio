"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/src/data/metadata";
import { cn } from "@/src/lib/utils";

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

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-5">
          <a
            href="#hero"
            className="font-display text-sm font-bold tracking-[0.24em] text-cream uppercase"
          >
            {siteConfig.initials}
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                <span className="text-accent">•</span>
                {link.label}
              </a>
            ))}
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
            {isOpen ? "Close ✕" : "Menu ☰"}
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
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                navLinkClass,
                "min-h-[44px] px-2"
              )}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-accent">•</span>
              {link.label}
            </a>
          ))}
        </div>
      </Container>

      {/* Thin horizontal rule beneath the nav bar */}
      <div className="h-px w-full bg-border" />
    </header>
  );
}
