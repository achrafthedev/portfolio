// Self-hosted Inter weights for every drei/troika <Text> in the scene.
//
// troika-three-text (used by drei's <Text>) fetches its default font +
// unicode glyph-coverage data from cdn.jsdelivr.net at runtime when no
// `font` prop is given. That request is commonly blocked by ad blockers,
// privacy-focused browsers (e.g. Brave Shields) or a strict CSP, which
// silently leaves the text geometry empty — the mesh exists but renders
// zero glyphs. Pointing `font` at same-origin files removes that external
// dependency entirely. Must stay plain WOFF (v1) — troika can't parse WOFF2.
const base = import.meta.env.BASE_URL;

export const FONT_REGULAR = `${base}fonts/inter-400.woff`;
export const FONT_SEMIBOLD = `${base}fonts/inter-600.woff`;
export const FONT_BOLD = `${base}fonts/inter-700.woff`;
