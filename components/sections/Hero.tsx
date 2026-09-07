"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { siteConfig } from "@/src/data/metadata";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const aureoRef = useRef<HTMLSpanElement>(null);

  // TEMP DIAGNOSTIC (Step 3 proof, remove later): scrub AUREO background to red.
  useEffect(() => {
    const el = aureoRef.current;
    if (!el) return;
    console.log("ScrollTrigger created for AUREO", el);
    const st = gsap.to(el, {
      backgroundColor: "#a11d1d",
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: 300,
        scrub: true,
        onUpdate: (self) =>
          console.log("AUREO scrub", +self.progress.toFixed(2)),
      },
    });
    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      {/* Background line-art image */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      >
        <Image
          src="/bg.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-25 mix-blend-screen"
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-28 sm:px-8 lg:px-16">
        <p className="font-display text-xs font-medium uppercase tracking-[0.4em] text-cream sm:text-sm">
          PORTFOLIO
        </p>

        <h1 className="mt-5 flex flex-col leading-none">
          <span
            ref={aureoRef}
            className="font-display text-[clamp(4rem,18vw,13rem)] font-bold leading-none tracking-tight text-cream"
          >
            AUREO
          </span>
          <span className="-mt-5 font-script text-[clamp(2.25rem,8vw,5rem)] font-bold leading-none text-accent sm:-mt-8">
            Christopher Joseph V.
          </span>
        </h1>

        <p className="mt-8 max-w-xl font-mono text-base leading-relaxed text-text-muted sm:text-lg">
          Aspiring Full-Stack Developer &amp; IT Student building modern web
          applications, Android apps, and IoT systems that solve real-world
          problems.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Work
          </Button>
        </div>
      </div>

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
