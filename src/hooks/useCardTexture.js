import { useMemo } from 'react';
import * as THREE from 'three';

// Generates a dynamic CanvasTexture for a project node when no real
// screenshot asset is available. Drop a real image in /public/projects/<id>.jpg
// and swap this for useTexture(`${import.meta.env.BASE_URL}projects/${project.id}.jpg`)
// once screenshots exist — ProjectNode.jsx already falls back to that texture
// automatically when `project.image` is set (see data.js).
export function useCardTexture(project, color) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 512, 320);
    gradient.addColorStop(0, '#0c1030');
    gradient.addColorStop(1, '#020408');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 320);

    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 508, 316);

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(420, 60, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '700 40px Inter, sans-serif';
    ctx.fillText(project.title, 32, 150);

    ctx.fillStyle = color;
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillText((project.tags || []).slice(0, 3).join('  ·  '), 32, 190);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [project, color]);
}
