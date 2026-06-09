# Premium React Portfolio Template

A modern, highly-customizable, Dockerized React portfolio featuring a premium dark-mode **glassmorphism UI**, micro-animations, automatic English/French **internationalization**, and out-of-the-box **GitHub Actions CI/CD** for GitHub Pages.

Designed and originally built by [Achraf Chardoudi](https://github.com/achrafthedev). Feel free to fork and use this as a base for your own engineering or design portfolio!

## ✨ Features

- **Modern UI/UX:** Premium dark mode with frosted glass (glassmorphism) cards, smooth hover effects, and fade-in scroll animations.
- **Auto-Localization (i18n):** Automatically detects the user's browser language. Defaults to French for Francophone countries, and English for the rest of the world. Includes a manual toggle button.
- **Data-Driven:** All projects, roles, descriptions, and tags are centralized in a single `data.js` file for extremely easy editing.
- **Dockerized:** Fully equipped with a multi-stage `Dockerfile` and `docker-compose.yml` for instant, consistent local deployment via Nginx.
- **Zero-Config Deployment:** Includes a `.github/workflows/deploy.yml` pipeline that automatically builds and deploys your site to GitHub Pages whenever you push to the `main` branch.

## 🚀 Quick Start (Local Development)

### Prerequisites
You can run this project using either **Docker** (recommended) or locally with **Node.js**.

### Option 1: Using Docker (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
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

## 🛠️ Customization Guide (Use it as your own!)

This portfolio is built to be a reusable template. Here is exactly what you need to change to make it yours:

### 1. Update Profile Information
- Open `src/App.jsx`.
- Update the name `Achraf Chardoudi` in the Hero section.
- Update the **contact links** (Email, LinkedIn URL, GitHub URL, Phone number).

### 2. Replace the Profile Picture
- Replace the `public/profile.png` file with your own high-resolution image. Make sure the file name matches or update the `<img src="/profile.png" />` tag in `src/App.jsx`.

### 3. Edit Your Projects and Translations
- Open `src/data.js`.
- Modify the `translations` object to adjust your Hero title (`hero_role`) and introduction (`hero_desc`) in both English and French.
- Modify the `projects` array. Each object requires:
  - `title`, `role_en`, `role_fr`, `desc_en`, `desc_fr`
  - `tags` (Array of strings like `['React', 'Node']`)
  - `link` (Optional: The live URL of the project. Requires `isPublic: true`)
  - `repo` (Optional: The GitHub repository URL)
  - `isPublic` (Boolean: If false and no repo is provided, it will show a locked "Private Source" badge).

### 4. Update Package Metadata
- Open `package.json` and change the `name` and `author` fields to your own.
- Open `vite.config.js` and ensure the `base` property matches your GitHub repository name if deploying to GitHub Pages (e.g., `base: '/your-repo-name/'`). If deploying to a custom domain root, change it to `base: '/'`.

## 📦 Deployment to GitHub Pages

Deployment is completely automated. To publish your portfolio online for free:

1. Push your code to a public GitHub repository.
2. Go to your repository settings on GitHub -> **Pages**.
3. Under **Build and deployment**, ensure the source is set to **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` file will automatically trigger a build and publish your site to `https://yourusername.github.io/your-repo-name/` every time you commit to `main`.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). 
You are welcome to fork it, modify it, and use it as your personal portfolio.
