import { useMemo } from 'react';
import * as THREE from 'three';

// Generates a dynamic CanvasTexture carrying just the project's category
// glyph and accent color — deliberately minimal. Earlier this baked the
// full title/description/tags onto the card face, but text on a tilted
// 3D surface viewed at an angle (during hover, or from off-center in the
// gallery orbit) becomes unreadable fast. The project title now lives in
// a separate always-camera-facing Billboard (see ProjectNode.jsx) so it
// stays legible regardless of the card's own tilt; full details (role,
// description, tags, links) are one click away in the project modal.
// Drop a real image in /public/projects/<id>.jpg and swap this for
// useTexture(`${import.meta.env.BASE_URL}projects/${project.id}.jpg`)
// once screenshots exist.
export function useCardTexture(project, color) {
  return useMemo(() => {
    const W = 512;
    const H = 320;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#0c1030');
    gradient.addColorStop(1, '#020408');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, W - 6, H - 6);

    // Soft accent glow + a large initial as a simple visual anchor —
    // decorative only, no text a viewer needs to actually read here.
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85;
    ctx.font = '800 140px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((project.title || '?').charAt(0).toUpperCase(), W / 2, H / 2 + 8);
    ctx.globalAlpha = 1;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [project, color]);
}
