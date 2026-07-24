<div align="center">

# 🌌 Immersive 3D React Portfolio

**A scroll-driven WebGL portfolio where the content *is* the scene — not a background behind it.**

[![License: MIT](https://img.shields.io/badge/License-MIT-22d3ee.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React Three Fiber](https://img.shields.io/badge/react--three--fiber-R3F-a78bfa)](https://docs.pmnd.rs/react-three-fiber)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://github.com/achrafthedev/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/achrafthedev/portfolio/actions/workflows/deploy.yml)

[**Live Demo →**](https://achrafthedev.github.io/portfolio/)

</div>

---

Most "3D portfolios" render a nice WebGL scene behind a perfectly ordinary HTML page — the background moves, the content doesn't. This one flips that: a GSAP `ScrollTrigger`-driven camera physically travels through four cinematic phases as you scroll, and the hero copy, career timeline, project cards and skill list are *real objects inside the scene*, not `<div>`s floating on top of it. A minimal, mostly-invisible HTML layer handles navigation, the contact CTA and project detail modals — plus an `sr-only` twin of every piece of 3D content so screen readers, crawlers and no-JS visitors lose nothing.

Originally built by [Achraf Chardoudi](https://github.com/achrafthedev) as a personal engineering portfolio. Fork it, gut `src/data.js`, and it's yours.

## Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Customization Guide](#-customization-guide)
- [Troubleshooting](#-troubleshooting--lessons-learned)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)
- [License](#-license)

## ✨ Features

- 🎥 **Scroll-driven cinematic camera** — a GSAP `ScrollTrigger` rig (`CameraRig.jsx`) interpolates through hand-placed waypoints across four phases: hero entrance → career/experience timeline → orbiting project gallery → skills tunnel into a contact portal.
- 🪐 **Content lives in WebGL, not HTML** — hero name/role/description, career stats, diplomas, skill lists and project details are all real 3D meshes and billboarded text (see `src/components/canvas/`), so the camera is actually flying past *your information*, not decoration.
- 🖱️ **Interactive project nodes** — floating cards tilt toward the cursor, glow on hover via an emissive map (not a flat color wash — see [Troubleshooting](#-troubleshooting--lessons-learned)), and open a glassmorphic detail modal on click, with the camera smoothly focusing on the clicked node.
- 🌠 **Postprocessing & particles** — Bloom, Vignette and Chromatic Aberration via `@react-three/postprocessing`, an instanced drifting-dust field, and a starfield spanning the whole camera path.
- ♿ **Accessible & crawlable by design** — every piece of 3D content has an `sr-only` HTML twin (`ScrollScaffold.jsx`) exposing identical content to screen readers, SEO crawlers and no-JS visitors, without visually competing with the scene.
- 🌍 **Auto-localization (EN/FR)** — detects the visitor's browser language, with a manual toggle backed by a shared `zustand` store so 3D components read the active language directly.
- 🔍 **Full SEO** — JSON-LD `Person`/`WebSite` schema, Open Graph + Twitter Card tags, canonical URL, `hreflang` alternates, `robots` meta, and a `<noscript>` fallback.
- 📱 **Mobile performance fallback** — below 768px the camera path flattens to a linear zoom, particle count drops ~60%, and postprocessing is disabled outright.
- 🗃️ **Single source of truth** — every string, project, skill, stat and diploma lives in one `src/data.js`; edit it once and both the 3D scene and the accessible scaffold update.
- 🐳 **Dockerized** + 🚀 **zero-config GitHub Pages CI/CD** out of the box.

## 🏗 Architecture

```
src/
  components/
    canvas/          # Everything rendered inside the <Canvas> — the actual content
      Scene.jsx           # Canvas wrapper, lighting, mouse-follow light
      CameraRig.jsx        # GSAP ScrollTrigger camera path (4 phases)
      Core.jsx               # Glowing hero core (distort material)
      HeroText3D.jsx          # Hero name/role/description as billboarded 3D text
      ExperienceOrbs.jsx       # Career timeline: stats + diplomas as 3D nodes
      ProjectGallery.jsx        # Arranges project cards along the gallery arc
      ProjectNode.jsx             # A single interactive 3D project card
      SkillsTunnel.jsx              # Skill-category rings with orbiting skill text
      ParticleField.jsx              # Drifting dust + stars
      PostFX.jsx                      # Bloom / Vignette / Chromatic Aberration
    ui/              # Minimal 2D chrome layered over the canvas
      Navbar.jsx
      ScrollScaffold.jsx  # sr-only content + scroll-height spacer sections
      ProjectModal.jsx    # Glassmorphic project detail modal
      ContactDock.jsx      # Floating contact CTA + socials
  hooks/
    useScrollProgress.js  # Registers the GSAP ScrollTrigger driving scrollState
    useResponsive.js       # Tracks mobile breakpoint into uiStore
    useCardTexture.js       # Generates each project card's canvas texture
  store/
    scrollState.js   # High-frequency scroll progress (plain ref, not React state)
    uiStore.js         # zustand store: lang, isMobile, open project modal
  utils/
    projectLayout.js  # Shared position math for project nodes (gallery + camera focus)
    fonts.js            # Self-hosted font paths for every 3D <Text>
  data.js            # All portfolio content — the single source of truth
```

## 🧰 Tech Stack

| Layer | Technologies |
| ----- | ------------ |
| Framework | React 18, Vite 5 |
| 3D | Three.js, React Three Fiber, Drei |
| Camera & Scroll | GSAP + ScrollTrigger |
| Postprocessing | `@react-three/postprocessing` (Bloom, Vignette, Chromatic Aberration) |
| State | Zustand (cross-layer UI state) + plain refs for per-frame scroll progress |
| 2D Overlay | Tailwind CSS, Framer Motion |
| Icons / Font | Lucide React, Inter (self-hosted) |
| Deployment | Docker (Nginx), GitHub Actions, GitHub Pages |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm — **or**
- [Docker](https://www.docker.com/) (recommended: zero local setup)

### Option 1 — Docker

```bash
git clone https://github.com/achrafthedev/portfolio.git
cd portfolio
docker compose up -d --build
```

Open `http://localhost:8080`.

### Option 2 — Node.js

```bash
git clone https://github.com/achrafthedev/portfolio.git
cd portfolio
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 📜 Available Scripts

| Script | Description |
| ------ | ------------ |
| `npm run dev` | Start the Vite dev server with hot module reload |
| `npm run build` | Type-check-free production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the codebase |

## 🎨 Customization Guide

Everything you need to change lives in one of three places: `src/data.js` (content), `index.html` (SEO), or the `canvas`/`ui` components (visuals/layout).

**1. Edit your content** — open `src/data.js` and customize:

- **`translations`** — all EN/FR UI copy (hero role/subtitle/description, section labels, CTAs).
- **`stats`** — key metrics shown as 3D nodes on the career timeline.
- **`skillCategories`** — skill-category rings in the tunnel phase (`title_en`, `title_fr`, `color`, `skills[]`).
- **`projects`** — each needs `title`, `category`, `role_en/fr`, `desc_en/fr`, `tags[]`, optional `link`/`repo`, and `isPublic`.
- **`categoryMeta`** — colors/labels per project category (also drives each card's rim-light and texture accent).
- **`diplomas`** — education entries with status and verification links.

**2. Update your name & contact links** — `src/components/canvas/HeroText3D.jsx` for the 3D-rendered name, `src/components/ui/ContactDock.jsx` and `Navbar.jsx` for email/LinkedIn/GitHub.

**3. Add real project screenshots** — by default, cards use a canvas-generated texture (title, role, description, tags) since no screenshot assets ship with the template. Drop an image at `public/projects/<id>.jpg` and swap `useCardTexture` for `useTexture(...)` in `ProjectNode.jsx` — see the comment at the top of `src/hooks/useCardTexture.js` for the exact swap point.

**4. Update SEO** — in `index.html`: `<title>`, meta description/keywords, Open Graph/Twitter tags, JSON-LD (`name`, `jobTitle`, `email`, `sameAs`, `knowsAbout`), canonical/`hreflang` URLs, Google site verification. Then update `public/sitemap.xml` and `public/robots.txt`.

**5. Update package metadata** — `package.json`'s `name` field, and `vite.config.js`'s `base` (`/your-repo-name/` for GitHub Pages, `/` for a custom domain root).

## 🩹 Troubleshooting / Lessons Learned

Two non-obvious bugs bit us hard enough during development that they're worth documenting here instead of only in a commit message:

> **3D text renders nothing at all (not even a placeholder box)**
> `drei`'s `<Text>` is built on `troika-three-text`, which fetches its default font *and* unicode glyph-coverage data from `cdn.jsdelivr.net` at runtime if no `font` prop is given. That request is routinely blocked by ad blockers, privacy-hardened browsers (e.g. Brave Shields) and strict CSPs — and when it's blocked, the text mesh silently renders zero glyphs instead of erroring. **Fix:** always pass an explicit `font` prop pointing at a same-origin file (see `src/utils/fonts.js` + `public/fonts/`). One catch: troika can parse WOFF (v1) but **not WOFF2** — grab the `.woff` variant, not `.woff2`.

> **Textured meshes look like flat, oversaturated color blobs with no visible texture**
> Setting `emissive={someColor}` on a `meshStandardMaterial` tints the *entire* surface uniformly, on top of whatever `map` texture is applied. Combined with a low Bloom `luminanceThreshold`, this can wash a detailed texture (like the canvas-drawn project cards in `ProjectNode.jsx`) into a solid glowing color. **Fix:** use `emissiveMap={texture}` with `emissive="#ffffff"` instead — the glow then follows the texture's own bright pixels rather than flooding the whole face — and keep Bloom's threshold high enough that text-bearing surfaces stay under it.

If you fork this and something renders as an empty/solid shape with no visible detail, check these two first before assuming it's your data.

## 📦 Deployment

Deployment to GitHub Pages is fully automated via `.github/workflows/deploy.yml`:

1. Push to a public GitHub repository.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Every push to `main` builds and publishes automatically.

**Manual alternatives:**

```bash
npm run build        # outputs to dist/
# then deploy dist/ to Vercel, Netlify, S3, or any static host
```

## 🤝 Contributing

Issues and PRs are welcome — this started as a personal portfolio, but the template is meant to be forked and adapted. If you spot a bug (especially a rendering one — see [Troubleshooting](#-troubleshooting--lessons-learned) first) or have an improvement, open an issue or PR.

## 🙏 Acknowledgements

Built on the shoulders of [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei), [GSAP](https://gsap.com/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), and [Lucide](https://lucide.dev/). Type set in [Inter](https://rsms.me/inter/) (SIL Open Font License), self-hosted in `public/fonts/`.

## 📬 Contact

**Achraf Chardoudi** — CTO & Full-Stack Software Architect

[![Email](https://img.shields.io/badge/Email-chardoudiachraf%40gmail.com-22d3ee?logo=gmail&logoColor=white)](mailto:chardoudiachraf@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-achrafchardoudi-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/achrafchardoudi)
[![GitHub](https://img.shields.io/badge/GitHub-achrafthedev-181717?logo=github&logoColor=white)](https://github.com/achrafthedev)

## 📄 License

Open-source under the [MIT License](LICENSE) — fork it, modify it, ship it as your own portfolio.
