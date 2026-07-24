export default {
  plugins: {
    // Tailwind v4's PostCSS plugin moved to its own package, and now
    // handles vendor prefixing itself (via Lightning CSS) — autoprefixer
    // is no longer needed on top of it.
    '@tailwindcss/postcss': {},
  },
}
