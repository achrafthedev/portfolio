# Premium React Portfolio Template

A modern, highly-customizable, Dockerized React portfolio featuring a premium dark-mode **glassmorphism UI**, immersive **Three.js 3D background**, micro-animations, automatic English/French **internationalization**, full **SEO optimization** with JSON-LD structured data, and out-of-the-box **GitHub Actions CI/CD** for GitHub Pages.

Designed and originally built by [Achraf Chardoudi](https://github.com/achrafthedev). Feel free to fork and use this as a base for your own engineering portfolio!

## Features

- **Premium Dark UI:** Glassmorphism cards, gradient accents (cyan/purple/emerald), smooth hover effects, and staggered scroll-reveal animations via Framer Motion.
- **3D Background:** Animated Three.js scene with floating code symbols, server containers, database stacks, and a star particle field.
- **Stats Bar:** Key metrics section (projects delivered, technologies, experience, leadership level) with gradient counters.
- **Skills Section:** Categorized technical expertise cards (Frontend, Backend, Cloud & DevOps, Data & AI, Architecture) with color-coded borders and interactive tags.
- **Project Cards:** Category-labeled cards with color-coded top borders, tech badges, and action links (live site, source code, or private indicator).
- **Education & Certifications:** Diploma cards with status badges (Obtained/In Progress) and RNCP verification links.
- **Auto-Localization (i18n):** Automatically detects the user's browser language. Defaults to French for Francophone countries, and English for the rest of the world. Includes a manual toggle.
- **Full SEO:** JSON-LD structured data (Person + WebSite schemas), Open Graph tags, Twitter Cards, canonical URL, hreflang tags, robots meta, `<noscript>` fallback content, dynamic `lang` attribute, and semantic HTML (`<main>`, `<article>`, `<nav>`, `aria-label`).
- **Fixed Navigation:** Glassmorphic nav bar with backdrop blur, smooth scroll links, and underline hover animations.
- **Footer CTA:** Call-to-action section with email button and social links.
- **Data-Driven:** All content (projects, skills, stats, diplomas, translations) is centralized in a single `data.js` file for easy editing.
- **Dockerized:** Multi-stage `Dockerfile` and `docker-compose.yml` for instant, consistent local deployment via Nginx.
- **Zero-Config Deployment:** GitHub Actions pipeline that automatically builds and deploys to GitHub Pages on push to `main`.

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

This portfolio is built to be a reusable template. Here is exactly what you need to change to make it yours:

### 1. Update Profile Information
- Open `src/App.jsx`.
- Update the name `Achraf Chardoudi` in the Hero section.
- Update the **contact links** (Email, LinkedIn URL, GitHub URL, Phone number).

### 2. Replace the Profile Picture

- Replace the `public/profile.png` file with your own high-resolution image. Make sure the file name matches or update the `<img>` tag in `src/App.jsx`.

### 3. Edit Your Content
Open `src/data.js` and customize these exports:

- **`translations`** — Modify hero title (`hero_role`, `hero_subtitle`), introduction (`hero_desc`), and footer CTA text in both English and French.
- **`stats`** — Update the key metrics (projects count, technologies, experience years, leadership level).
- **`skillCategories`** — Edit the 5 skill category cards. Each has a `title_en`, `title_fr`, `color`, and `skills` array.
- **`projects`** — Each project object requires:
  - `title`, `category`, `role_en`, `role_fr`, `desc_en`, `desc_fr`
  - `tags` (Array of strings like `['React', 'Node.js']`)
  - `category` (One of: `fullstack`, `cloud`, `ai`, `data`, `systems`, `frontend`, `backend`, `mobile`)
  - `link` (Optional: live URL, requires `isPublic: true`)
  - `repo` (Optional: GitHub repository URL)
  - `isPublic` (Boolean: if false and no repo, shows a "Private Source" badge)
- **`categoryMeta`** — Colors and labels for each project category.
- **`diplomas`** — Education entries with status, RNCP and LinkedIn verification links.

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
| Animation | Framer Motion |
| Icons | Lucide React |
| Styling | CSS3 (Custom Properties, Glassmorphism, Grid) |
| Font | Inter (Google Fonts) |
| Deployment | Docker (Nginx), GitHub Actions, GitHub Pages |

## License

This project is open-source and available under the [MIT License](LICENSE).
You are welcome to fork it, modify it, and use it as your personal portfolio.
