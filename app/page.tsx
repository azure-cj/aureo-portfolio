"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import RevealSection from "@/components/ui/RevealSection";
import Separator from "@/components/ui/Separator";
import Container from "@/components/ui/Container";

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main className="overflow-x-hidden">
        <RevealSection id="hero">
          <Hero />
        </RevealSection>

        <Separator />

        <RevealSection id="about" className="flex items-center">
          <Container>
            <About />
          </Container>
        </RevealSection>

        <Separator />

        <RevealSection id="stack" className="flex items-center">
          <Container>
            <TechStack />
          </Container>
        </RevealSection>

        <Separator />

        <RevealSection id="projects" className="flex items-center">
          <Container>
            <Projects />
          </Container>
        </RevealSection>

        <Separator />

        <RevealSection id="experience" className="flex items-center">
          <Container>
            <Experience />
          </Container>
        </RevealSection>

        <Separator />

        <RevealSection id="contact" className="flex items-center">
          <Container>
            <Contact />
          </Container>
        </RevealSection>
      </main>

      <footer className="border-t border-border bg-background/50 backdrop-blur-sm mt-24 sm:mt-32">
        <Container>
          <div className="py-8 text-center sm:py-12">
            <p className="text-sm text-text-muted">
              Built with <span className="text-accent">Next.js 14</span>, Tailwind CSS, and Framer Motion. Deployed on Vercel.
            </p>
            <p className="mt-4 text-xs text-text-dim">
              © {new Date().getFullYear()} YOUR_NAME. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
