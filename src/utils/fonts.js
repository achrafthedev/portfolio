// Self-hosted type for every drei/troika <Text> in the scene: Space Grotesk
// for display/headings, DM Sans for body copy — the pairing the UI/UX Pro
// Max design-intelligence skill's `--design-system` search recommended for
// a tech/developer portfolio (query: "developer portfolio SaaS dashboard
// tech futuristic dark cyberpunk" → Dark Mode/OLED style, Space Grotesk /
// DM Sans typography). Same rendered CSS font-family in index.css.
//
// troika-three-text (used by drei's <Text>) fetches its default font +
// unicode glyph-coverage data from cdn.jsdelivr.net at runtime when no
// `font` prop is given. That request is commonly blocked by ad blockers,
// privacy-focused browsers (e.g. Brave Shields) or a strict CSP, which
// silently leaves the text geometry empty — the mesh exists but renders
// zero glyphs. Pointing `font` at same-origin files removes that external
// dependency entirely. Must stay plain WOFF (v1) — troika can't parse WOFF2.
const base = import.meta.env.BASE_URL;

export const FONT_DISPLAY_BOLD = `${base}fonts/space-grotesk-700.woff`;
export const FONT_DISPLAY_SEMIBOLD = `${base}fonts/space-grotesk-600.woff`;
export const FONT_BODY_REGULAR = `${base}fonts/dm-sans-400.woff`;
export const FONT_BODY_MEDIUM = `${base}fonts/dm-sans-500.woff`;

// Back-compat aliases so existing 3D component imports keep working.
export const FONT_BOLD = FONT_DISPLAY_BOLD;
export const FONT_SEMIBOLD = FONT_DISPLAY_SEMIBOLD;
export const FONT_REGULAR = FONT_BODY_REGULAR;
