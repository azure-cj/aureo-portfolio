# Aureo Portfolio

A dark, minimal developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **GSAP + Lenis** for smooth scrolling.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing Your Content

All site content lives in `src/data/`:

- `metadata.ts` — name, email, socials, SEO
- `content.ts` — hero, about, contact copy
- `projects.ts` — your projects
- `experience.ts` — work history & roles
- `stack.ts` — tech skills by category
- `certifications.ts` — certificates
- `organizations.ts` — memberships

Add images to `public/` (project screenshots → `public/projects/<id>/`, the hero background → `public/bg.jpg`, certificates → `public/certificates/`).

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # run production build
npm run lint       # eslint
npm run type-check # tsc --noEmit
npm run format     # prettier
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP + ScrollTrigger
- **Smooth scroll:** Lenis
- **Icons:** lucide-react
- **Utilities:** clsx + tailwind-merge

## Structure

```
app/           # Routes & pages (layout, home, 404, OG image)
components/
  sections/    # Page sections (Hero, About, Projects, ...)
  ui/          # Reusable primitives (Button, Badge, Card, ...)
  providers/   # SmoothScrollProvider (Lenis + GSAP)
src/
  data/        # All site content
  types/       # TypeScript types
  lib/         # Utilities (cn, animations)
styles/        # Global CSS + design tokens
public/        # Static assets (images, fonts, icons)
```

## Deploy

Recommended: [Vercel](https://vercel.com) (zero-config Next.js deployment). Set the env vars from `.env.example` in the dashboard.
