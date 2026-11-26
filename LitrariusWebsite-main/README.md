# Litrarius — Australian University Admissions Consultancy

## Project Overview

This is a marketing website for **Literarius**, an Australian university admissions consultancy, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 3.4**, and **react-router-dom 7**.

The site helps students navigate the process of studying in Australia, from course selection and scholarship guidance to visa support and application assistance.

## Folder Structure

```
src/
├── assets/           # Static images (hero.png, icons)
├── components/
│   ├── layout/       # Header, Footer, layout components
│   ├── shared/       # Reusable UI (AnimatedNumber, RevealItem, Ticker, etc.)
│   └── home/         # Homepage-specific sections (Hero, Proof, Articles, etc.)
├── data/             # Static data (site.ts, articles.ts)
├── pages/            # Page components (Home, About, Australia, Contact, Blog, Privacy, Terms)
├── index.css         # Global CSS with custom utilities
├── App.tsx           # Root app component with routing
└── main.tsx          # Entry point
```

## Available Scripts

| Script      | Description                          |
| ----------- | ------------------------------------ |
| `npm run dev`   | Starts the Vite development server   |
| `npm run build` | Typescripts + Vite production build  |
| `npm run lint`  | Runs Oxlint to check for issues      |
| `npm run preview` | Preview the production build locally |

## Design Tokens

### Color Palette

| Token         | Hex Value    | Usage                                  |
| ------------- | ------------ | -------------------------------------- |
| `green-logo`    | `#064e3b`    | Primary navigation, links, headers     |
| `green-em`      | `#10B981`    | Secondary accents, buttons             |
| `coral-aa`      | `#C2410C`    | CTA buttons, highlights                |
| `coral-aa-dk`   | `#9A3412`    | CTA hover states                       |
| `muted-aa`      | `#4B5563`    | Body text, secondary text              |
| `muted`         | `#6b7280`    | Muted/placeholder text                 |
| `bdr`           | `#E5E7EB`    | Borders, dividers                      |
| `charcoal`      | `#374151`    | Default text color                     |
| `ink`           | `#111827`    | Dark text/background                   |
| `cream`         | `#f5f0eb`    | Light background sections              |
| `cream-soft`    | `#FAF9F6`    | Page backgrounds                       |
| `dark-section`  | `#064e3b`    | Section backgrounds (dark areas)       |
| `overlay`       | `rgba(6,30,20,0.72)` | Overlay gradients for hero sections |

### Typography

- **Font families**: `Poppins` (sans-serif), `Inter` (sans-serif), `Playfair Display` (serif)
- **H2 Section** (`h2-section`): `font-playfair text-[32px] md:text-[44px] text-green-logo tracking-tight`
- **H2 Hero Section** (`h2-hero-section`): `font-playfair md:text-[56px]`
- **Eyebrow Tag** (`eyebrow-tag`): `font-poppins font-bold text-xs tracking-widest uppercase text-emerald-text`
- **Eyebrow Italic** (`eyebrow-italic`): `font-playfair italic text-emerald-text text-lg block mb-2`

### Custom CSS Utilities

Added in `src/index.css`:

- `.h2-section` — Standard H2 size for editorial sections
- `.h2-hero-section` — Larger H2 for hero/headline use
- `.eyebrow-italic` — Playfair italic variant for section subtitles
- `.eyebrow-tag` — Uppercase tag label with emerald accent
- `.skip-link` — Focus-visible skip-to-content link
- `.btn-coral`, `.btn-outline-dark`, `.btn-outline-white` — Button styles

### Focus Styles

- `focus-visible:ring-2 focus-visible:ring-green-em/20` — Focus ring on form inputs
- `outline: 2px solid #047857; outline-offset: 2px` — `:focus-visible` outline
- Skip link reveals on focus

### Reduced Motion

- `prefers-reduced-motion: reduce` — Animations disabled, elements shown immediately
- Applied globally via `@media (prefers-reduced-motion: reduce)` in `index.css`

### RevealItem Usage

The shared `RevealItem` component uses `IntersectionObserver` for fade-up/fade-in/slide-left/slide-right animations. Respects `prefers-reduced-motion` and reduces motion by showing elements immediately.

## Accessibility Conventions

- **Focus-visible outlines**: `2px solid #047857` with `2px` offset, `4px` border-radius
- **Skip link**: Fixed position link to jump to `#main-content`, revealed on focus
- **Reduced motion**: Media query disables all transitions/animations for users who prefer it
- **Semantic HTML**: `<article>` used for Privacy/Terms pages, `<main>` for primary content
- ** aria-labels**: Social links have descriptive labels (e.g., `"Literarius on Facebook (opens in new tab)"`)
- **Anchor targets**: `tel:` and `mailto:` links use `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"` (not react-router `<Link>`)
- **Form inputs**: Proper `label` elements with `htmlFor` matching input `id`; aria-describedby for error messages
- **Link distinguishing**: External links (tel:, mailto:) use `<a>` tags; router links use `<Link>` from react-router-dom

## Contact Details (single source of truth)

Contact details live in `src/data/site.ts`:

```ts
import { site } from '@/data/site';

site.phone;   // '+61 459 038 427'
site.email;   // 'info@literarius.com.au'
site.address; // 'U 1 16, Campbell St., Parramatta, NSW 2150'
```

Used across:
- `Footer.tsx` — Contact column and legal links
- `Contact.tsx` — Contact form and consent line
- `Header.tsx` — CTA button

## Image Credits

All campus imagery sourced from **Wikimedia Commons** under free culture licences (CC0 or CC BY-SA).

Detailed attributions are available at the new **/credits** route, which lists:

- Institution campus images (7 universities with author, source, and licence)
- Topic & educational imagery (8 image categories with licensing info)

See `IMAGE_CREDITS.md` and `IMAGE_AUDIT.md` in the repo root for the original source data.

## Pages

| Route         | Component        |
| ------------- | ---------------- |
| `/`           | `Home`           |
| `/australia`  | `Australia`      |
| `/about`      | `About`          |
| `/blog`       | `Blog`           |
| `/blog/:slug` | `BlogPost`       |
| `/contact`    | `Contact`        |
| `/privacy`    | `Privacy`        |
| `/terms`      | `Terms`          |
| `/credits`    | `Credits`        |

## TODO: Legal Pages

- `/privacy` and `/terms` pages contain placeholder text: `"[Replace with legal copy reviewed by the business]"`
- Legal copy must be provided by the business — not authored by developers
- Links to these pages are in the footer and contact form consent line