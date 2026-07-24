<div align="center">

# Immersive 3D React Portfolio

A scroll-driven WebGL portfolio built with React Three Fiber — the content (hero copy, career timeline, project cards, skills) is rendered as real objects inside the 3D scene, not HTML laid over a decorative background.

[![License: MIT](https://img.shields.io/badge/License-MIT-22d3ee.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://github.com/achrafthedev/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/achrafthedev/portfolio/actions/workflows/deploy.yml)

[**Live Demo**](https://achrafthedev.github.io/portfolio/)

</div>

Built by [Achraf Chardoudi](https://github.com/achrafthedev) as a personal portfolio. The template is data-driven — fork it and edit `src/data.js` to make it yours.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contact](#contact)
- [License](#license)

## Features

- **Scroll-driven camera** — a GSAP `ScrollTrigger` rig (`CameraRig.jsx`) moves through four phases: hero entrance, career/experience timeline, orbiting project gallery, skills tunnel into a contact portal.
- **Content lives in WebGL** — hero copy, career stats, diplomas, skills and project details are real 3D meshes and billboarded text (`src/components/canvas/`), not HTML overlays.
- **Interactive project nodes** — cards tilt toward the cursor, glow on hover, and open a detail modal on click, with the camera focusing on the clicked node.
- **Postprocessing** — Bloom, Vignette and Chromatic Aberration via `@react-three/postprocessing`, plus an instanced particle field.
- **Accessible by design** — every 3D content block has an `sr-only` HTML twin (`ScrollScaffold.jsx`) for screen readers, crawlers and no-JS visitors.
- **EN/FR localization** — auto-detected from the browser, with a manual toggle backed by a shared `zustand` store.
- **SEO** — JSON-LD structured data, Open Graph/Twitter tags, canonical/`hreflang` URLs, `<noscript>` fallback.
- **Mobile fallback** — linear camera path, reduced particle count, and postprocessing disabled below 768px.
- **Single source of truth** — all content lives in `src/data.js`.

## Architecture

```
src/
  components/
    canvas/          # Rendered inside <Canvas> — the actual content
      Scene.jsx           # Canvas wrapper, lighting
      CameraRig.jsx        # GSAP ScrollTrigger camera path (4 phases)
      Core.jsx               # Hero core (distort material)
      HeroText3D.jsx          # Hero name/role/description as 3D text
      ExperienceOrbs.jsx       # Career timeline: stats + diplomas
      ProjectGallery.jsx        # Project card layout
      ProjectNode.jsx             # A single interactive project card
      SkillsTunnel.jsx              # Skill-category rings
      ParticleField.jsx              # Drifting dust + stars
      PostFX.jsx                      # Bloom / Vignette / Chromatic Aberration
    ui/              # Minimal 2D chrome over the canvas
      Navbar.jsx
      ScrollScaffold.jsx  # sr-only content + scroll-height spacers
      ProjectModal.jsx    # Project detail modal
      ContactDock.jsx      # Contact CTA + socials
  hooks/
    useScrollProgress.js  # GSAP ScrollTrigger registration
    useResponsive.js       # Mobile breakpoint tracking
    useCardTexture.js       # Project card canvas texture generator
  store/
    scrollState.js   # Per-frame scroll progress (plain ref)
    uiStore.js         # zustand: lang, isMobile, open project modal
  utils/
    projectLayout.js  # Shared project-node position math
    fonts.js            # Self-hosted font paths for 3D <Text>
  data.js            # All portfolio content
```

## Tech Stack

| Layer | Technologies |
| ----- | ------------ |
| Framework | React 18, Vite 8 |
| 3D | Three.js, React Three Fiber, Drei |
| Camera & Scroll | GSAP + ScrollTrigger |
| Postprocessing | `@react-three/postprocessing` |
| State | Zustand |
| Styling | Tailwind CSS 4, Framer Motion |
| Deployment | Docker (Nginx), GitHub Actions, GitHub Pages |

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm, or [Docker](https://www.docker.com/).

**Docker:**

```bash
git clone https://github.com/achrafthedev/portfolio.git
cd portfolio
docker compose up -d --build
```

Open `http://localhost:8080`.

**Node.js:**

```bash
git clone https://github.com/achrafthedev/portfolio.git
cd portfolio
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Available Scripts

| Script | Description |
| ------ | ------------ |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Customization

1. **Content** — edit `src/data.js`: `translations` (EN/FR copy), `stats`, `skillCategories`, `projects`, `categoryMeta`, `diplomas`.
2. **Name & contact links** — `src/components/canvas/HeroText3D.jsx` (3D name), `src/components/ui/ContactDock.jsx` and `Navbar.jsx` (email/LinkedIn/GitHub).
3. **Project screenshots** — cards default to a canvas-generated texture. To use a real image, drop it in `public/projects/<id>.jpg` and swap `useCardTexture` for `useTexture(...)` in `ProjectNode.jsx`.
4. **SEO** — `index.html` (title, meta, Open Graph, JSON-LD, canonical/`hreflang`), `public/sitemap.xml`, `public/robots.txt`.
5. **Package metadata** — `package.json` name, `vite.config.js`'s `base` (`/repo-name/` for GitHub Pages, `/` for a custom domain).

## Troubleshooting

- **3D text renders nothing at all.** `drei`'s `<Text>` fetches its default font from `cdn.jsdelivr.net` when no `font` prop is given — commonly blocked by ad blockers or privacy browsers, which leaves the text mesh with zero glyphs and no error. Always pass an explicit `font` (see `src/utils/fonts.js`), and use `.woff` (v1) — troika can't parse `.woff2`.
- **Textured meshes look like flat, oversaturated color blobs.** A flat `emissive={color}` on `meshStandardMaterial` tints the whole surface, which Bloom then washes out. Use `emissiveMap={texture}` with `emissive="#ffffff"` so the glow follows the texture's own bright pixels instead.

## Deployment

Automated via `.github/workflows/deploy.yml`: push to `main`, with **Settings → Pages → Source** set to **GitHub Actions**.

Manual: `npm run build` outputs to `dist/`, deployable to any static host.

## Contact

**Achraf Chardoudi** — CTO & Full-Stack Software Architect

[![Email](https://img.shields.io/badge/Email-chardoudiachraf%40gmail.com-22d3ee?logo=gmail&logoColor=white)](mailto:chardoudiachraf@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-achrafchardoudi-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/achrafchardoudi)
[![GitHub](https://img.shields.io/badge/GitHub-achrafthedev-181717?logo=github&logoColor=white)](https://github.com/achrafthedev)

## License

[MIT](LICENSE)
