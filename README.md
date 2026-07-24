# Immersive 3D React Portfolio Template

A fully immersive, scroll-driven **3D portfolio** built with React Three Fiber. Instead of a flat page with a decorative WebGL background, the content itself — hero copy, career timeline, project cards, skills — lives *inside* the 3D scene. A GSAP `ScrollTrigger`-powered camera rig flies through four cinematic phases as you scroll, with bloom/vignette postprocessing, an instanced particle field, automatic English/French **internationalization**, full **SEO optimization** with JSON-LD structured data, and out-of-the-box **GitHub Actions CI/CD** for GitHub Pages.

Designed and originally built by [Achraf Chardoudi](https://github.com/achrafthedev). Feel free to fork and use this as a base for your own engineering portfolio!

## Features

- **Scroll-Driven 3D Camera:** A GSAP `ScrollTrigger` camera rig (`CameraRig.jsx`) travels through four phases as the page scrolls — hero entrance, career/experience timeline, orbiting project gallery, and a skills tunnel toward a contact "portal" — with mouse parallax and click-to-focus on project nodes.
- **Content Lives in 3D, Not Just the Background:** Hero name/role/description, career stats, diplomas, skill lists and project details are all rendered as real 3D text and meshes inside the canvas (see `src/components/canvas/`), not as HTML sections laid over a decorative scene.
- **Interactive Project Nodes:** Floating 3D cards that tilt toward the cursor on hover, glow on rim-light, and open a glassmorphic detail modal on click — camera smoothly focuses on the clicked node.
- **Postprocessing Pipeline:** Bloom, Vignette and Chromatic Aberration via `@react-three/postprocessing`, automatically disabled on mobile for performance.
- **Instanced Particle Field:** Drifting dust + starfield spanning the full camera path.
- **Accessible & Crawlable by Design:** A slim `sr-only` scroll scaffold (`ScrollScaffold.jsx`) exposes the exact same content as real, semantic HTML for screen readers, SEO crawlers and no-JS fallback — nothing is lost by moving the visuals into WebGL.
- **Auto-Localization (i18n):** Automatically detects the user's browser language. Defaults to French for Francophone countries, and English for the rest of the world. Includes a manual toggle, wired through a shared `zustand` store so 3D components can read the active language directly.
- **Full SEO:** JSON-LD structured data (Person + WebSite schemas), Open Graph tags, Twitter Cards, canonical URL, hreflang tags, robots meta, `<noscript>` fallback content, dynamic `lang` attribute, and semantic HTML (`<main>`, `<article>`, `<nav>`, `aria-label`).
- **Compact Contact Dock:** A small, always-visible floating CTA + social links instead of a full-width footer section.
- **Data-Driven:** All content (projects, skills, stats, diplomas, translations) is centralized in a single `data.js` file — edit it once and it updates both the 3D scene and the accessible scaffold.
- **Mobile Performance Fallback:** Below 768px, the camera path flattens to a linear zoom, particle count drops ~60%, and postprocessing is disabled entirely.
- **Dockerized:** Multi-stage `Dockerfile` and `docker-compose.yml` for instant, consistent local deployment via Nginx.
- **Zero-Config Deployment:** GitHub Actions pipeline that automatically builds and deploys to GitHub Pages on push to `main`.

## Architecture

```
src/
  components/
    canvas/          # Everything rendered inside the <Canvas> — the actual content
      Scene.jsx          # Canvas wrapper, lighting, mouse-follow light
      CameraRig.jsx       # GSAP ScrollTrigger camera path (4 phases)
      Core.jsx             # Glowing hero core (distort material)
      HeroText3D.jsx        # Hero name/role/description as billboarded 3D text
      ExperienceOrbs.jsx     # Career timeline: stats + diplomas as 3D nodes
      ProjectGallery.jsx      # Arranges project cards along the gallery arc
      ProjectNode.jsx           # A single interactive 3D project card
      SkillsTunnel.jsx            # Skill-category rings with orbiting skill text
      ParticleField.jsx            # Drifting dust + stars
      PostFX.jsx                    # Bloom / Vignette / Chromatic Aberration
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
  data.js            # All portfolio content — the single source of truth
```

## Quick Start (Local Development)

### Prerequisites
You can run this project using either **Docker** (recommended) or locally with **Node.js**.

### Option 1: Using Docker (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/achrafthedev/portfolio.git
   cd portfolio
   ```
2. Build and start the container:
   ```bash
   docker compose up -d --build
   ```
3. Open your browser and navigate to `http://localhost:8080`.

### Option 2: Using Node.js
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the URL provided in your terminal (usually `http://localhost:5173`).

## Customization Guide (Use it as your own!)

This portfolio is built to be a reusable template. Everything you need to change lives in one of three places: `data.js` (content), `index.html` (SEO), or the `canvas`/`ui` components (visuals/layout).

### 1. Edit Your Content

Open `src/data.js` and customize these exports — this single file drives both the 3D scene and the accessible `sr-only` scaffold:

- **`translations`** — Hero name is set directly in `HeroText3D.jsx`; role/subtitle/description, footer/contact CTA text, and all UI labels live here for both English and French.
- **`stats`** — Key metrics shown as 3D nodes on the career timeline (projects count, technologies, experience years, leadership level).
- **`skillCategories`** — Skill-category rings in the tunnel phase. Each has a `title_en`, `title_fr`, `color`, and `skills` array.
- **`projects`** — Each project object requires:
  - `title`, `category`, `role_en`, `role_fr`, `desc_en`, `desc_fr`
  - `tags` (Array of strings like `['React', 'Node.js']`)
  - `category` (One of: `fullstack`, `cloud`, `ai`, `data`, `systems`, `frontend`, `backend`, `mobile`)
  - `link` (Optional: live URL, requires `isPublic: true`)
  - `repo` (Optional: GitHub repository URL)
  - `isPublic` (Boolean: if false and no repo, shows a "Private Source" badge)
- **`categoryMeta`** — Colors and labels for each project category (also used for each 3D card's rim-light and texture accent color).
- **`diplomas`** — Education entries with status, RNCP and LinkedIn verification links.

### 2. Update Profile Information

- Open `src/components/canvas/HeroText3D.jsx` to change the name rendered in 3D, and `src/components/ui/ContactDock.jsx` / `Navbar.jsx` for contact links (Email, LinkedIn URL, GitHub URL).

### 3. Add Real Project Screenshots

By default, project cards use a canvas-generated texture (title, role, description, tags) since no screenshot assets are bundled. To use real screenshots, drop an image in `public/projects/<id>.jpg` and swap `useCardTexture` for `useTexture(...)` in `src/components/canvas/ProjectNode.jsx` — see the comment at the top of `src/hooks/useCardTexture.js` for the exact swap point.

### 4. Update SEO

- Open `index.html` and update:
  - `<title>` and meta `description` / `keywords`
  - Open Graph and Twitter Card tags (title, description, image URL)
  - JSON-LD structured data (name, jobTitle, email, sameAs links, knowsAbout)
  - Canonical URL and hreflang URLs
  - Google site verification tag
- Update `public/sitemap.xml` with your domain URL.
- Update `public/robots.txt` with your sitemap URL.

### 5. Update Package Metadata

- Open `package.json` and change the `name` field.
- Open `vite.config.js` and ensure the `base` property matches your GitHub repository name if deploying to GitHub Pages (e.g., `base: '/your-repo-name/'`). If deploying to a custom domain root, change it to `base: '/'`.

## Deployment to GitHub Pages

Deployment is completely automated. To publish your portfolio online for free:

1. Push your code to a public GitHub repository.
2. Go to your repository settings on GitHub -> **Pages**.
3. Under **Build and deployment**, ensure the source is set to **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` file will automatically trigger a build and publish your site every time you commit to `main`.

## Tech Stack

| Layer | Technologies |
| ----- | ------------ |
| Framework | React 18, Vite 5 |
| 3D | Three.js, React Three Fiber, Drei |
| Camera & Scroll | GSAP + ScrollTrigger |
| Postprocessing | `@react-three/postprocessing` (Bloom, Vignette, Chromatic Aberration) |
| State | Zustand (cross-layer UI state), plain refs for per-frame scroll progress |
| 2D Overlay | Tailwind CSS, Framer Motion |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| Deployment | Docker (Nginx), GitHub Actions, GitHub Pages |

## License

This project is open-source and available under the [MIT License](LICENSE).
You are welcome to fork it, modify it, and use it as your personal portfolio.
