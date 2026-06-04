# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"资中木偶戏" (Zizhong Puppetry) promotional brand page — a single-page website showcasing a national intangible cultural heritage from Sichuan, China. Built with Vite + React + Tailwind CSS v4 + Framer Motion.

## Commands

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Type-check + production build to dist/
npm run preview  # Preview production build locally
```

## Architecture

- `src/pages/ZizhongPuppetry.tsx` — Single React component (~370 lines) containing the full page: hero parallax, stats counter, timeline, craft features, repertoire grid, and footer
- `src/App.tsx` — Root component, renders ZizhongPuppetry directly
- `src/index.css` — Tailwind v4 `@import` + `@theme` with CSS custom properties (background, foreground, card, border, muted-foreground, accent-* colors, Bagel Fat One font)
- `src/assets/*.jpg` — 3 static images (hero, craft, stage)
- `vite.config.ts` — Vite + React + Tailwind v4 plugin, `@` alias to `./src`
- `index.html` — Loads Bagel Fat One from Google Fonts

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Animation | Framer Motion 11 (parallax, scroll-triggered, spring) |
| Styling | Tailwind CSS v4 (`@theme` directive, no config file) |
| Build | Vite 6 |

## Key Patterns

- **Bilingual content**: All strings stored as `{ zh: string, en: string }` objects, rendered via `t(b)` helper based on `lang` state
- **Scroll-driven animations**: `useScroll`/`useTransform` for parallax hero, `whileInView` for staggered entrance animations
- **Silky spring easing**: `[0.22, 1, 0.36, 1]` cubic-bezier used throughout
- **Language switch**: Fixed floating toggle (top-right) with animated slider, switches between `zh`/`en`

## No Tests or Linter

No test runner or linter is configured. The only validation is `tsc` type-checking in the build step.
