"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Link from "@/components/ui/Link";
import { contactContent } from "@/src/data/content";
import { siteConfig } from "@/src/data/metadata";
import { fadeInVariants, staggerVariants } from "@/src/lib/animations";

export default function Contact() {
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [copiedSchool, setCopiedSchool] = useState(false);

  const handleCopyEmail = (email: string, setcopied: (value: boolean) => void) => {
    navigator.clipboard.writeText(email).then(() => {
      setcopied(true);
      setTimeout(() => setcopied(false), 2000);
    });
  };

  return (
    <motion.div
      className="space-y-8"
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "-20px" }}
    >
      <motion.h2
        className="heading-lg"
        variants={fadeInVariants}
      >
        {contactContent.heading}
      </motion.h2>

      <motion.div variants={fadeInVariants}>
        <Card className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <p className="body-md text-text-muted">{contactContent.description}</p>
            <p className="text-sm uppercase tracking-[0.22em] text-text-dim">
              {contactContent.availability}
            </p>

            <Link
              href={`mailto:${siteConfig.email}`}
              external
              className="mt-4 inline-flex items-center justify-center min-h-[44px] border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-background transition-smooth hover:opacity-90 active:scale-95"
            >
              {contactContent.ctaLabel}
            </Link>
          </div>

          <div className="space-y-5">
            {/* Personal Email */}
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-text-dim mb-1">
                Personal
              </p>
              <button
                type="button"
                onClick={() => handleCopyEmail(siteConfig.email, setCopiedPersonal)}
                className="mt-2 inline-flex items-center justify-between gap-2 max-w-full min-h-[44px] px-3.5 py-2 rounded bg-surface border border-white/10 text-xs sm:text-sm text-text-muted hover:text-primary hover:border-accent/40 active:scale-98 transition-all duration-200 font-mono break-all text-left"
              >
                <span>{siteConfig.email}</span>
                <span className="text-xs flex-shrink-0 ml-2">
                  {copiedPersonal ? "✓ Copied" : "📋 Copy"}
                </span>
              </button>
            </div>

            {/* School Email */}
            {siteConfig.schoolEmail && (
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-text-dim mb-1">
                  School
                </p>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(siteConfig.schoolEmail!, setCopiedSchool)}
                  className="mt-2 inline-flex items-center justify-between gap-2 max-w-full min-h-[44px] px-3.5 py-2 rounded bg-surface border border-white/10 text-xs sm:text-sm text-text-muted hover:text-primary hover:border-accent/40 active:scale-98 transition-all duration-200 font-mono break-all text-left"
                >
                  <span>{siteConfig.schoolEmail}</span>
                  <span className="text-xs flex-shrink-0 ml-2">
                    {copiedSchool ? "✓ Copied" : "📋 Copy"}
                  </span>
                </button>
              </div>
            )}

            {/* Facebook Link */}
            <div className="flex sm:justify-start pt-2">
              <a
                href="https://www.facebook.com/christopher.aureo.1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-surface border border-white/10 text-muted hover:text-primary hover:border-accent/40 transition-all duration-200 text-sm font-mono"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook ↗
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
